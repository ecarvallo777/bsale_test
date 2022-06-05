/*!
* Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// Cargar menú desde base de datos.
async function chargeMenu() {
    const categoryList = await(await fetch("api/categories")).json();
    addCategories(categoryList);
}

function addCategories(categoryList){
    const cat= document.getElementById("categories");
    for(var i=0; i<categoryList.length; i++){
        cat.insertAdjacentHTML('beforeend', '<li class="nav-item"><a class="nav-link" href="#!" onclick="chargeCategory('+categoryList[i].id+')">'+categoryList[i].name+'</a></li>');
    }
}
chargeMenu();

//Cargar productos de categoría seleccionada.

async function chargeCategory(category_id){
    const productsList = await(await fetch("api/"+category_id+"")).json();

    addProducts(productsList);

}
//Buscador de productos.
search = document.getElementById("button-addon2");
search.addEventListener("click", function(){
    searchInput = document.getElementById("searchInput");
    searchProduct(searchInput.value);
});

async function searchProduct(product){
    const productsList = await(await fetch("api/search/"+product+"")).json();
    if(productsList.result==='False'){alert("No se han encontrado resultados.");}
    addProducts(productsList);
}

//
function addProducts(productsList){
    const productContainer = document.getElementById("container");
    //Limpiar categorías
    if(document.getElementById("eraseProduct")){eraseProducts(productContainer);}
    //
    let product="";
    for(var i=0; i<productsList.length; i++){
        product = '<div class="col mb-5" id="eraseProduct"><div class="card h-100"><img class="card-img-top" src="'+productsList[i].url_image+'" alt="..." />'
        +'<div class="card-body p-4">'
            +'<div class="text-center">'
                +'<h5 class="fw-bolder">'+productsList[i].name+'</h5>'
                +'$'+productsList[i].price
            +'</div>'
        +'</div>'
        +'<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">'
            +'<div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Agregar</a></div>'
        +'</div>'
    +'</div>'
    +'</div>'
        productContainer.insertAdjacentHTML('beforeend', product);
    }

    pagination();
        

}
function eraseProducts(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }


}
