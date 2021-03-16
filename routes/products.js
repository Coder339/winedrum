// const express = require('express')




// const router = express.Router()


// //private routes
// router.get('/',verify,(req,res)=>{
//     // res.send('my first post')
//     res.send(req.user)
// })

// module.exports = router;


const express = require('express')
// const app = express()
const verify = require('./verifytoken')
var multer = require('multer');
var fs = require('fs');
const router = express.Router()
const Product = require('../models/product');

// app.use(express.json())
// app.use(multer({ dest: '../uploads/',
//     rename: function (fieldname, filename) {
//       return filename;
//     },
//    }));


   // Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });


// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// You can create multiple middleware each with a different storage engine config so save different files in different locations on server
const upload = multer({ storage: fileStorageEngine });



//  GET ALL PRODUCTS
router.get('/',verify,async (req,res)=>{
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }catch(err){
        res.status(400).json({message: err});
    }
});


// SUBMIT A PRODUCT
router.post('/',verify,upload.single('image'),async (req,res)=>{
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        isFav: req.body.isFav
    });
    product.img.data = fs.readFileSync(req.file.path)
    product.img.contentType = 'jpeg/png'
    console.log(product)
    try{
        const savedProduct = await product.save()
        res.status(200).json(savedProduct)
    }catch(err){
        res.status(400).json({message: err});
    }

})


// SPECIFIC PRODUCT
router.get('/:productId',verify,async (req,res)=>{
    try{
        const product = await Product.findById(req.params.productId)
        res.status(200).json(product)
    }catch(err){
        res.status(400).json({message: err});
    }

})


// DELETE A POST
router.delete('/:productId',verify,async (req,res)=>{
    try{
        const removedProduct = await Product.deleteOne({_id: req.params.productId})
        res.status(200).json(removedProduct)
    }catch(err){
        res.status(400).json({message: err});
    }

})


router.patch('/:productId',verify,async (req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            {_id: req.params.productId},
            {$set: {title: req.body.title,description: req.body.description}}
            )
        res.status(200).json(updatedProduct)
    }catch(err){
        res.status(400).json({message: err});
    }

})


module.exports = router