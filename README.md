## App documentation.

# Explicación del ejercicio
En este desafío se solicita consultar una base de datos que contiene productos categorizados y, entregar estos datos al cliente permitiéndole navegar entre ellos de manera **amigable e intuitiva.**

Para esto, se determina el desarrollo de una aplicación web montada en un servidor que pueda satisfacer estos requerimientos. Se exige la conexión a una base de datos ya diseñada, montada y poblada. Y por otro lado, se exige el uso de **javascript nativo** para desarrollar la interacción con el usuario.

Para la comunicación entre el cliente y servidor se utiliza **Node.js** y para consultar la base de datos, **MySQL**. Además, para el frontend, se utilizó **bootstrap y jQuery.**
***
https://bsalecarvallo.herokuapp.com/
***

# Apirest. app.js {Node.js}.
## GET categories.
Al realizar una petición HTTP, el servicio retornará un JSON listando **todas las categorías encontradas en la base de datos** junto a su identificador (id).
    
    app.get('/api/categories', (req, res)=>{
        const categories = "SELECT * FROM category";

        connection.query(categories, (error, results) =>{
            if (error) throw error;
            if (results.length > 0){
                res.json(results);
            }else{res.send('No hay resultados');}       
         });

    });
## GET category.
Al realizar una petición HTTP, el servicio retornará un JSON listando **todos los productos que se relacionan con el id de la categoría solicitada**          
 



    app.get('/api/:category', (req, res)=>{
        const {category} = req.params;
        const products = "SELECT * FROM product WHERE product.category='"+category+"'";

        connection.query(products, (error, results) =>{
            if (error) throw error;
            if (results.length > 0){
                res.json(results);
            }else{res.json({result: 'No hay resultados.'}); }   
        });

    });
***

    Parámetros: id de categoría: :category.

## GET Products search.
Al realizar una petición HTTP, el servicio retornará un JSON listando **todos los productos que contienen el parámetro** enviado al servidor.

    app.get('/api/search/:product', (req, res)=>{
        const {product} = req.params;
        const products = "SELECT * FROM product WHERE name LIKE '%"+product+"%'";

        connection.query(products, (error, results) =>{
            if (error) throw error;
            if (results.length > 0){
                res.json(results);
            }else{res.json({result: 'False'});}       
        });

    });
***

    Parámetros: Nombre de producto: :product.
## GET Sorted category.
Al realizar una petición HTTP, el servicio retornará un JSON listando de manera ordenada, los productos categorizados. Se devuelven **según el precio de manera ascendente o descendente**.

    app.get('/api/sort/:sort/:category', (req, res)=>{
        const {category} = req.params;
        const {sort} = req.params;

        const products = "SELECT * FROM product WHERE product.category='"+category+"' ORDER BY price "+sort+"";

        connection.query(products, (error, results) =>{
            if (error) throw error;
            if (results.length > 0){
                res.json(results);
            }else{res.json({result: 'No hay resultados.'});}

        });

    });
***

    Parámetros: id categoría :category.
                tipo de orden {asc o desc} :sort.


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
