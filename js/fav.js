var fav = JSON.parse(localStorage.getItem("favourite"));



for (var j = 0; j < fav.length; j++) {



    var row = document.getElementById("card")
    row.setAttribute('id', "card")


    var div1 = document.createElement('div')
    div1.classList.add("product-thumb")

    var div2 = document.createElement('div')
    div2.classList.add("product-thumb-image")

    var img = document.createElement("img")
    var img = new Image();
    img.src = fav[j].Url
    // img.setAttribute('src', fav[j].Url)



    var div3 = document.createElement('div')
    div3.classList.add("quickview-title")
    div3.innerHTML = "Quick View"
    div3.setAttribute("data-toggle", "modal")
    div3.setAttribute("data-target", "#myModal")
    div3.setAttribute("onclick", "showModal('" + fav[j].adAdderId + "','" + fav[j].Catagory + "')");

    var div4 = document.createElement('div')
    div4.classList.add("product-thumb-title")

    var tlt = document.createElement('h3')
    tlt.innerHTML = fav[j].Title

    var price = document.createElement('h3')
    price.innerHTML = "Price : "


    var span = document.createElement("span")
    span.innerHTML = fav[j].price




    div1.appendChild(div2)
    div2.appendChild(img)

    div2.appendChild(div3)

    div4.appendChild(tlt)
    div4.appendChild(price)
    price.appendChild(span)

    div1.appendChild(div4)
    row.appendChild(div1)


}





function showModal(id, cat) {

    var offlineAd = JSON.parse(localStorage.getItem("favourite"));

    var modal_title = document.getElementById("modal-title")
    var body = document.getElementById("modal-body")
  
  

    for (var k = 0; k < offlineAd.length; k++) {

        // if(offlineAd[k].AdID == id){
    
        if(fav[k].AdId == id){


    modal_title.innerHTML = offlineAd[k].AdTitle
    body.innerHTML = "";
    var img = document.createElement("img")
    // var img = new Image();

    img.style.height = "240px";
    img.style.width = "200px";
  
    img.setAttribute('src',  offlineAd[k].Url)

    var row = document.createElement("div")
    row.setAttribute('class', 'row');



    var col1 = document.createElement("div")
    col1.setAttribute("class", "col-sm-3")


    var col2 = document.createElement("div")
    col2.setAttribute("class", "col-sm-9")

    col2.setAttribute('class', 'mt-3')


    var name = document.createElement("h5")
    name.innerHTML = "Name : " + offlineAd[k].Name
    name.style.fontWeight = "bold";
    name.setAttribute('class', 'mt-3')
    name.setAttribute('class', 'ml-3')


    var cat = document.createElement("h5")
    cat.innerHTML = "Category : " + offlineAd[k].Category
    cat.style.fontWeight = "bold";
    cat.setAttribute('class', 'mt-3')
    cat.setAttribute('class', 'ml-3')

    var city = document.createElement("h5")
    city.innerHTML = "City : " + offlineAd[k].City
    city.style.fontWeight = "bold";
    city.setAttribute('class', 'mt-3')
    city.setAttribute('class', 'ml-3')

    var Address = document.createElement("h5")
    Address.innerHTML = "Address : " + offlineAd[k].Area
    Address.style.fontWeight = "bold";
    Address.setAttribute('class', 'mt-3')
    Address.setAttribute('class', 'ml-3')

    var phone_No = document.createElement("h5")
    phone_No.innerHTML = "Phone No : " + offlineAd[k].Phone;
    phone_No.style.fontWeight = "bold "
    phone_No.setAttribute('class', 'mt-3')
    phone_No.setAttribute('class', 'ml-3')

    var des = document.createElement("h5")
    des.innerHTML = "Description : " + offlineAd[k].des
    des.style.fontWeight = "bold";
    des.setAttribute('class', 'mt-3')
    des.setAttribute('class', 'ml-3')


  



    var price = document.createElement("h5")
    price.innerHTML = "Price : " + offlineAd[k].price
    price.style.fontWeight = "bold";
    price.setAttribute('class', 'mt-3')
    price.setAttribute('class', 'ml-3')








    body.appendChild(row)
    row.appendChild(col1)
    row.appendChild(col2)


    col1.appendChild(img)

    col2.appendChild(name)
    col2.appendChild(cat)
    col2.appendChild(city)
    col2.appendChild(Address)
    col2.appendChild(phone_No)
    col2.appendChild(des)
    col2.appendChild(price)

  
    break;

}
  


}

}
// }