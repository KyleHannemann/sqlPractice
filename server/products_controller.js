module.exports = {
    create: (req, res, next)=>{
        const db = req.app.get('db');
        const {name, description, price, image_url} = req.body;
        db.create_product([name, description, price, image_url]).then(()=>{
            res.status(200).send('product added')
        }).catch(err=>{
            console.log(err);
            res.status(500).send('error')
        })
    }, 
    getProduct: (req, res, next)=>{
        const db = req.app.get('db');
        const {product_id} = req.params;
        db.read_product(product_id).then((data, err)=>{
            res.status(200).send(data)
        }).catch(err=>{
            res.status(500).send('error')
        })
    }, 
    getProducts: (req, res, next)=>{
        const db = req.app.get('db');

        db.read_products().then((data,err)=>{
            res.status(200).send(data);
        }).catch(err=>{
            res.status(500).send('err')
            console.log(err);
        })
    }, 
    update: (req, res, next)=>{
        const db = req.app.get('db');
        const {id} = req.params;
        const {description, name, image_url, price} = req.body;

        db.update_product([id, description, name, price, image_url ]).then(()=>{
            res.status(200).send("update complete")
        }).catch(err=>{
            res.status(500).send('err');
            console.log(err);
        })
    }, 
    delete: (req, res, next)=>{
        const db = req.app.get('db');
        const {id} = req.params
        db.delete_product(id).then(()=>{
            res.status(200).send('product deleted');
        }).catch(err=>{
            res.status(500).send('err');
            console.log(err);
        })
    }, 


}