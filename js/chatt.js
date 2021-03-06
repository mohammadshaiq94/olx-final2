const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
const auth = firebase.auth();
const messaging = firebase.messaging();
let currentUser = undefined;
let chatsDiv = document.getElementById("allChats");

console.log("firestore", firestore);
console.log("auth", auth);
console.log("messaging", messaging);


let cUser = localStorage.getItem("user_id");
let chats = new Set();

let previosChatsDiv = document.getElementById("allChats");

firestore.collection("messages").where("recieverId", "==", cUser)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(selectFile => {
            chats.add(selectFile.doc.id);
            firestore.collection('users').doc("" + selectFile.doc.data().senderId + "").get()
                .then(doc => {

                    if (!doc.data()) return
                    previosChatsDiv.innerHTML += `
                        <div class="w-80 m-auto chatDiv d-flex flex-row" id=${selectFile.doc.id} onclick = "startChat(event)" >
                        
                        <div class="ml-3 d-flex flex-column align-self-center cursor-pointer">
                        <!-- <h5>${doc.data().Name}</h5> -->
                        <span class="cursor-pointer">message....</span>
                        <span class="cursor-pointer">At: time</span>
                        </div>
                        </div>
                         `

                })

        })
    })





function startChat(event) {
    let chatBox = document.getElementsByClassName("chatBox")[0];

    if (event.target.nodeName == "SPAN" || event.target.nodeName == "H5" || event.target.nodeName == "IMG") {
        let target = (event.target.parentNode.parentNode).id;
        console.log(target);

        chatBox.id = target;
        firestore.collection("messages").doc(target)
            .get().then(doc => {
                if (doc.data().senderId !== localStorage.getItem("user_id")) {
                    localStorage.setItem("adAdderId", doc.data().senderId)
                } else if (doc.data().recieverId !== localStorage.getItem("user_id")) {
                    localStorage.setItem("adAdderId", doc.data().recieverId)
                }
                initailizeChatListner(target);
            })

    }



}





firestore.collection("messages").where("senderId", "==", cUser)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(selectFile => {
            chats.add(selectFile.doc.id);
            firestore.collection('users').doc("" + selectFile.doc.data().recieverId + "").get()
                .then(doc => {
                    previosChatsDiv.innerHTML += `
                        <div class="w-80 m-auto chatDiv d-flex flex-row" id=${selectFile.doc.id}>
                        <div class="ml-3 d-flex flex-column align-self-center">
                        <!-- <h5 class="cursor-pointer">${doc.data.Name}</h5>-->
                        <span class="cursor-pointer">message....</span>
                        <span class="cursor-pointer">At: time</span>
                        </div>
                        </div>
                         `

                })

        })
    })




var recieverId = localStorage.getItem("adAdderId");
var senderId = localStorage.getItem("user_id");







let roomFound = false;

let currentChat;


if (recieverId && senderId) {
    let chatBox = document.getElementsByClassName("chatBox")[0];
    let messageDiv = document.getElementById("messageDiv");



    console.log("working")
    firestore.collection("messages").where("senderId", "==", senderId)
        .where("recieverId", "==", recieverId)

        .get().then(function (snapshot) {
            snapshot.forEach(function (chatRoom) {
                roomFound = true;
                console.log("chat room Found>>>", chatRoom)
                currentChat = chatRoom.id;
                chatBox.id = chatRoom.id;

                initailizeChatListner(currentChat);



            })

        })







}






function createRoom() {
    return new Promise((resolve, reject) => {
        firestore.collection("messages").add({
            senderId: senderId,
            recieverId: recieverId,
        }).then(chatRoom => {
            chatBox.id = chatRoom.id;
            currentChat = chatRoom.id;
            console.log("Chat room Created With This ID >", chatRoom.id);
            initailizeChatListner(chatRoom.id)
            resolve(chatRoom.id);

        })

    })

}

let chatInitialed = false;

function sendMessage(event) {
    if (event) event.preventDefault();

    let messageToSend = document.getElementById("input").value;
    let chatBox = document.getElementsByClassName("chatBox")[0]

    if (chatBox.id) {
        firestore.collection("messages").doc(chatBox.id)
            .collection("message").doc(((new Date).getTime()).toString()).set({
                message: messageToSend,
                senderId: senderId,
                recieverId: recieverId,
                time: (new Date).toString()
            }).then(docRef => {
                if (chatInitialed == false) {

                    initailizeChatListner(chatBox.id);
                    chatInitialed = true

                }
            })

    } else {

        firestore.collection("messages").add({
            senderId: senderId,
            recieverId: recieverId
        }).then(docRef => {
            chatBox.id = docRef.id;
            sendMessage();


        })



    }
}






let messageDiv = document.getElementById("messageDiv");


function initailizeChatListner(chatId) {

    const chatID = chatId;

    if (chatID) {

        messageDiv.innerHTML = "";

        firestore.collection("messages").doc(chatID)
            .collection("message")
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.doc.data().senderId == senderId) {

                        messageDiv.innerHTML += `
                                    <div class="bg-green m-2 float-right message">
                                     <p class="text-white font-weight-bold p-3">${change.doc.data().message}</p>
                                    </div>
                         `

                    }

                    else {

                        messageDiv.innerHTML += `
                                    <div class="border m-2 message">
                                     <p class="font-weight-bold text-black p-3">${change.doc.data().message}</p>
                                    </div>
                         `

                    }


                })

            })

    }

}


 
// if(senderId){
// firebase.messaging().requestPermission().then(function() {
// 	console.log('Notification permission granted.');
// 	return messaging.getToken()
// }).then(function(Token) {
// 	firebase.firestore().collection('users').doc(user_id).update({
//         token: token
//     })
// }).catch(function(err) {
// 	console.log('Unable to get permission to notify.', err);
// });
// }
// else{
//     console.log('login please')
// }


// //Way to push notification using fetch!


// //Server Key (Firebase -> Project -> Settings -> Cloud Messaging -> Server Key
// var key = 'AIzaSyBTmpnrK6O4edYW2zdTPEvd2MVfB1HvSuY';
// //token
// var to = 'eIPZ0eXePFE:APA91bGMPx3AJfNnWaIs0Ui5uN72aNpxYelOBYhwXqHlQ26SLWrc9Kh3aYGLCM5Ypq3RfE1cHpV8nFcMTVvfcMuW8vCRVgCTCaYrqz5lajH7r3owQkYng50Ftgvrvojrhkd2Ndz0q_Xu';
// var notification = {
// 	'title': 'New Message',
// 	'body': message
// };

// fetch('https://fcm.googleapis.com/fcm/send', {
// 	'method': 'POST',
// 	'headers': {
// 		'Authorization': 'key=' + key,
// 		'Content-Type': 'application/json'
// 	},
// 	'body': JSON.stringify({
// 		'notification': notification,
// 		'to': to
// 	})
// }).then(function(response) {
// 	console.log(response);
// }).catch(function(error) {
// 	console.error(error);
// });



function signOut() {

    let btn = document.getElementById("logOUt");
    btn.innerHTML = `
        <img src="">
    `
    firebase.auth().signOut().then(function (res) {
        console.log("LOG OUT SuccessFull!!!");
        window.location = "index.html"
    })
}






messaging.onMessage(function (payload) {
    console.log('onMessage', payload);
});
