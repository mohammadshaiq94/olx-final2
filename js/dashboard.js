const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

var storageRef = firebase.storage().ref();




let currentUser

firebase.auth().onAuthStateChanged((user) => {
  if (user) { currentuser = user.id }
  else { console.log("not user") }
})



function sumbitAnAdd(event) {

  event.preventDefault();

  var Title = document.getElementById("Title").value
  var Catagory = document.getElementById("Catagory").value
  var price = document.getElementById("price").value
  var Description = document.getElementById("Description").value
  var Name = document.getElementById("Name").value
  var Phone = document.getElementById("Phone").value
  var selectFile = document.getElementById("selectFile").files
  var City = document.getElementById("City").value

  let promises = uploadPics(selectFile);

  let urls = [];




  Promise.all(promises).then(function (res) {

    console.log(res)

    var formvalues = {
      Title: Title,
      Catagory: Catagory,
      Description: Description,
      price: price,
      Name: Name,
      Phone: Phone,
      imgs: res,
      createAt: (new Date()).toString(),
      adAdderId: localStorage.getItem("user_id")

    }
    console.log(formvalues)






    var adAdderId = localStorage.getItem('user_id');
    db.collection(Catagory).add(formvalues)
      .then(() => {
        console.log('Added in db');
      }).catch(function (error) {
        var errorcode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      })


  })



  function uploadPics(selectFile) {



    let promises = [];

    for (let i = 0; i < selectFile.length; i++) {

      promises.push(new Promise(function (resolve, reject) {
        let imgRef = storageRef.child("/images/" + Math.random() + ".jpg");
        imgRef.put(selectFile[i])
          .then(function (snapshot) {
            imgRef.getDownloadURL().then(function (url) {
              console.log(url);
              resolve(url);
            })
          })
      }))
    }
    return promises;
  }
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    cUser = user;
    const messaging = firebase.messaging();
    messaging.requestPermission().then(function () {
      console.log('Notification permission granted.');
      return messaging.getToken();
    }).then(function (token) {
      // Displaying user token
      console.log('token >>>> ', token);
      firebase.firestore().collection("users").doc(user.uid)
        .update({
          token : token
        })
    }).catch(function (err) { // Happen if user deney permission
      console.log('Unable to get permission to notify.', err);
    });
  } else {
    // User is signed out.
    // ...
  }
});