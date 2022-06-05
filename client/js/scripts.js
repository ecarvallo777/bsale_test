/*!
* Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


document.addEventListener("DOMContentLoaded", async() =>{
    const categoryList = await(await fetch("api/categories")).json();
    addCategories(categoryList);
}
);

function addCategories(categoryList){
    const cat= document.getElementById("categories");
    for(var i=0; i<categoryList.length; i++){
        cat.insertAdjacentHTML('beforeend', '<li class="nav-item"><a class="nav-link" href="#!">'+categoryList[i].name+'</a></li>');
        console.log(categoryList[i].name);
    }
}