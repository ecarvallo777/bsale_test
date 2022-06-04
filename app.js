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

app.get('/products', (req, res)=>{
    const sql = 'SELECT * FROM product';
    connection.query(sql, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else{res.send('Not results');
    }

        
    });

});