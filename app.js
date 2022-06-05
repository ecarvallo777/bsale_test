const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;
const app = express();
app.use(bodyParser.json());

// MySql

const connection = mysql.createPool({
    connectionLimit : 100, //important
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user:'bsale_test',
    password:'bsale_test',
    database:'bsale_test',
    debug    :  false
});




app.listen(PORT, () =>console.log(`Server running on port ${PORT}`));

// Endpoints
app.use("/", express.static("client"));

//Envía lista de categorías al cliente.
app.get('/api/categories', (req, res)=>{
    const categories = "SELECT * FROM category";

    connection.query(categories, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else{res.send('Not results');
    }

        
    });

});
//Envía productos según categoría seleccionada desde el frontend.
app.get('/api/:category', (req, res)=>{
    const {category} = req.params;
    const products = "SELECT * FROM product WHERE product.category='"+category+"'";

    connection.query(products, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else{res.json({result: 'No hay resultados.'});
    }

        
    });

});

//Filtra y envía resultado de búsqueda de productos.
app.get('/api/search/:product', (req, res)=>{
    const {product} = req.params;
    const products = "SELECT * FROM product WHERE name LIKE '%"+product+"%'";

    connection.query(products, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else{res.json({result: 'False'});
    }

        
    });

});