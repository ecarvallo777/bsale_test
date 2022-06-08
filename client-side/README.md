# Frontend {Javascript}
## FUNCTION chargeMenu()

Al cargar el DOM, se solicita al servidor la **lista de categorías almacenadas en la base de datos**. Luego se envía la respuesta al lado del cliente para que el usuario lo visualice como un **menú de las categorías disponibles.**

    async function chargeMenu() {
        const categoryList = await(await fetch("api/categories")).json();
        const cat= document.getElementById("categories");
        for(var i=0; i<categoryList.length; i++){
            cat.insertAdjacentHTML('beforeend', '<li class="nav-item"><a class="nav-link" href="#!" 
            onclick="chargeCategory('+categoryList[i].id+')">'+categoryList[i].name+'</a></li>');
    }}

## **FUNCTION** addProducts(productList)

Función invocada por _searchProduct, chargeCategory y selectionChange_. Recibe como parámetro un arreglo con los objetos de los productos que se mostrarán en el client-side.

Se obtiene el contenedor de los productos en el archivo .html, **si existen productos**; se eliminan y luego se recorre el arreglo insertando cada producto en el html. 

Finalmente, con los productos ya insertados, se ejecuta la función _pagination_ que analiza la cantidad de productos y considera el límite de productos por página para crear la paginación.

    function addProducts(productList){
        const productContainer = document.getElementById("container");
        //Limpiar categorías
        if(document.getElementById("eraseProduct")){eraseProducts(productContainer);}
        //
        let product="";
        for(var i=0; i<productsList.length; i++){
            product = '<div class="col mb-5" id="eraseProduct"><div class="card h-100"><img class="card-img-top" src="'+productsList[i].url_image+'" 
                       alt="..." />'
                       +'<div class="card-body p-4">'
                       +'<div class="text-center">'
                       +'<h5 class="fw-bolder">'+productsList[i].name+'</h5>'
                       +'<a id="category" style="display:none" name="'+productsList[i].category+'"></a>'
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

## async **FUNCTION** chargeCategory()
El usuario solicita mostrar productos de categoría seleccionada en el client-side. **Se envía el id de la categoría seleccionada al servidor** para procesar la petición. Luego **se envía la respuesta a la función addProducts** para mostrar los productos al usuario.

    async function chargeCategory(category_id){
        const productsList = await(await fetch("api/"+category_id+"")).json();

        addProducts(productsList);
        $("select").show();

    }
***

    Variables: productsList: contiene la respuesta del servidor, se espera un JSON con la lista de productos.

## async **FUNCTION** selectionChange(sort)
el usuario solicita ordenar la categoría de productos en orden según el precio de los productos. La función lee la petición y envía la solicitud al servidor, luego de que el servidor responde con un **JSON ordenado**, **se ejecuta _addProducts_ con la nueva lista de productos.**

    async function selectionChange(sort){
        const category = document.getElementById("category");


        const productsSort = await(await fetch("api/sort/"+sort+"/"+category.name+"")).json();
        addProducts(productsSort);


    }

## async FUNCTION searchProduct()
El usuario solicita buscar un producto ingresado en el buscador y la función **envía el valor ingresado al servidor para buscar productos que contengan el valor ingresado en sus nombres.** El servidor devuelve un JSON y es enviado a la función _addProducts_ para mostrar los resultados al usuario.

    async function searchProduct(product){
        const productsList = await(await fetch("api/search/"+product+"")).json();
        if(productsList.result==='False'){alert("No se han encontrado resultados.");}
        addProducts(productsList);
        $("select").hide();
    }
