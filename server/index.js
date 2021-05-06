const express = require('express');
const massive = require('massive');
const controller =  require('./products_controller')
require('dotenv').config();

const app = express();
app.use(express.json())

const {SERVER_PORT, CONNECTION_STRING} = process.env;

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db=>{
    app.set('db', db);
}).catch(err=>{console.log(err)})

app.get('/api/products', controller.getProducts);
app.get('/api/products/:id', controller.getProduct);
app.put('/api/products/:id', controller.update);
app.delete('/api/products:id', controller.delete);
app.post('/api/products', controller.create);

app.listen(SERVER_PORT, ()=>{
    console.log('listening on port' + SERVER_PORT);
})