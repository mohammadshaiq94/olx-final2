const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);


// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//         .register('./service-worker.js')
//         .then(function () { console.log('Service Worker Registered'); });
// }


let adToView = localStorage.getItem('adToView');
let catsToView = localStorage.getItem("catsToView");
console.log(adToView, catsToView)

let data;


firestore.collection(catsToView).doc(adToView).get()
    .then(function (snapshot) {
        console.log(snapshot.data());
        data = snapshot.data();
        localStorage.setItem("adAdderId",data.adAdderId)

       var image = document.getElementById("images");
       image.setAttribute("src", data.imgs[0]);
        
        // image.innerHTML = data.imgs;

        let Title = document.getElementById("Title");
        Title.innerHTML = data.Title;

        let city = document.getElementById("city");
        city.innerHTML = data.Phone;

        let price = document.getElementById("price");
        price.innerHTML = `Rs.${data.price}`

        let description = document.getElementById("dis");
        description.innerHTML = data.Description;


        var cardheader = document.getElementById('cardheader')
        var fav = document.createElement('button');

            var i = document.createElement('i');
            i.setAttribute('id', 'red')
            i.setAttribute('class', 'fas fa-heart')

            fav.appendChild(i)

            fav.setAttribute('class', 'btn')
            fav.setAttribute('fav', 'no');
            fav.setAttribute('id', 'favourite');

            cardheader.appendChild(fav)

          })


                function addToFavorite(ref, id) {



                    if (localStorage.getItem("favourite") == null) {
                      localStorage.setItem("favourite", "[]");
                    }
                  
                    var userId = localStorage.getItem('user_id')
                    var Catid = localStorage.getItem('adToView')
                  
                  
                  
                    var heart = document.getElementById('red')
                  
                    if (document.getElementById('red').classList.contains('favourite')) {
                      
                      ref.setAttribute("fav", "no");
                      heart.classList.remove("favourite")
                  
                  
                  
                  
                      db.collection('Favorite').where('adAdderId', '==', id).get()
                        .then(function (querySnapshot) {
                          // Once we get the results, begin a batch
                          var batch = db.batch();
                  
                          querySnapshot.forEach(function (doc) {
                            // For each doc, add a delete operation to the batch
                            batch.delete(doc.ref);
                          });
                  
                          // Commit the batch
                          return batch.commit();
                        }).then(function () {
                  
                  
                          var Favorite = JSON.parse(localStorage.getItem("favourite"));
                  
                  
                          for (var i = 0; i < Favorite.length; i++) {
                  
                            // var Favorite = JSON.parse(Favorite[i]);
                  
                            if (Favorite[i].adAdderId == id) {
                  
                            
                  
                  
                              Favorite.splice(i);
                  
                              break;
                  
                            }
                  
                  
                  
                          }
                         
                  
                  
                          
                          localStorage.setItem("favourite", JSON.stringify(Favorite));
                          
                  
                  
                        });
                  
                  
                  
                  
                  
                  
                    }
                    else {
                                    
                     
                      ref.removeAttribute("fav")
                  
                      heart.classList.add('favourite')
                  
                  
                      console.log("Added To Favorite" + id)
                  
                      alert('Added To Favorite!')
                  
                  
                  
                      db.collection(Catid).doc(id).get().then(function (doc) {
                  
                        var userId = localStorage.getItem('user_id')
                  
                        console.log("Document data");
                  
                  
                        /* Adding Data To Favorite */
                        db.collection("Favorite").add({
                          Name: doc.data().Name,
                          AdTitle: doc.data().Title,
                          Category: doc.data().Catagory,
                          City: doc.data().City,
                          Phone: doc.data().Phone,
                          Url: doc.data().imgs,
                          FavPersonID: user_id,
                          price: doc.data().price,
                          adAdderId: id
                        })
                  
                  
                  
                        firestore.collection('Favorite')
                          .where('adAdderId', '==', id)
                          .where('FavPersonID', "==", user_id).get()
                          .then((res) => {
                            res.forEach((doc) => {
                             
                              var Favorite = JSON.parse(localStorage.getItem("favourite"));
                  
                             
                  
                              Favorite.push(doc.data())
                  
                              localStorage.setItem("favourite", JSON.stringify(Favorite));
                  
                              var req = new Request(doc.data().Url, { mode: "no-cors" });
                              fetch(req).then(res => {
                                caches.open("adsCache").then(cache => {
                                  console.log("Stored");
                        
                                  return cache.put(req, res).then(() => {
                  
                                  })
                                })
                              })
                  
                             
                  
                            })
                          })
                  
                          .then(function (docRef) {
                            
                  
                  
                  
                  
                          })
                          .catch(function (error) {
                            console.error("Error adding document: ", error);
                          });
                       
                  
                      }).catch(function (error) {
                        console.log("Error getting document:", error);
                      });
                    
                  
                    }
                  
                    
                  
                  }
                  
                
                  




function chat() {
    window.location = "chatt.html";
}



