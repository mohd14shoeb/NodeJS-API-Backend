const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'Handling GET Request to /Products'
    });

});

router.post('/',(req, res, next) =>{
const product ={
    name:req.body.name,
    price:req.body.price
};
res.status(200).json({
    message: 'Handling POST request to Products',
    createdProduct:product  
});

});

router.get('/:productId',(req, res, next) =>{
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'You passed an ID',
            id:id
        });
    }
});

router.patch('/:productId',(req, res, next) =>{
res.status(200).json({
    message:'products detail got Update /products'
});
});

router.delete('/:productId',(req, res, next) =>{
res.status(200).json({
message:'product detials got delete /products'
});
});


module.exports = router;