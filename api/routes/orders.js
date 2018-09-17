const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
message: 'Handling GET request of /Orders by nodemon'
    });

});

router.post('/',(req, res, next) => {
    const order ={
        productId:req.body.productId,
        quantity:req.body.quantity
    };
res.status(200).json({
    message: 'Handling POSt request of  /Orders',
    createdOrder:order
});
});

router.get('/:orderId',(req, res, next) =>{
    const id = req.params.orderId;
    if(id === 'special'){
        res.status(200).json({
            message:'Handling GET By passing Special ID  /orders',
            id:id
        });

    }else{
        res.status(200).json({
            message:'Handling GET By Passing ID /orders',
            id: id
        });
       
    }
});


module.exports = router;