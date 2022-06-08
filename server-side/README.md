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
