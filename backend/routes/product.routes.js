const express=require('express');
const productRoute=express.Router()
const ProductModel=require("../models/product.model")

productRoute.get("/",async(req,res)=>{
    let {page,q,category}=req.query;
    let filter={};
    let pageNumber=page||1;
    let skipitems=(pageNumber-1)*12;
    if(category){
        filter.category=category;
    }
    if(q){
        filter.$or = 
        [ { name: { $regex: q, $options: 'i' } }]
    }
    let product=await ProductModel.find(filter).skip(skipitems).limit(12);
    let productTotal=await ProductModel.find(filter)
    //res.header({"X-Total-Count":productTotal.length});
    res.send({"Total":productTotal.length,"products":product})
})
productRoute.get("/admin",async (req,res)=>{
    let product=await ProductModel.find()
   // let productTotal=await ProductModel.find(filter)
    //res.header({"X-Total-Count":productTotal.length});
    res.send(product)
})


productRoute.post("/addproduct",async (req,res)=>{
    try {
        await ProductModel.insertMany(req.body)
    res.status(200).send({msg:"product added!"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({msg:"server crash!"})
    }
    

})

productRoute.patch("/update/:productID",async(req,res)=>{
    const {productID}=req.params
    try {
         await ProductModel.findByIdAndUpdate({_id:productID},req.body)
         res.status(200).send({msg:"product updated!"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})
productRoute.delete("/delete/:productID",async(req,res)=>{
    const {productID}=req.params
    try {
         await ProductModel.findByIdAndDelete({_id:productID})
         res.status(200).send({msg:"product deleted!"})
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})










module.exports = {productRoute};