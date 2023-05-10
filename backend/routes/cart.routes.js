const express=require('express');
const cartRoutes=express.Router()
const CartProductModel=require("../models/cart.model")
const jwt = require("jsonwebtoken")


const {authenticate} = require("../middlewares/authenticate.middleware")
cartRoutes.get("/abc", (req,res)=>{
    res.send("cart routes")
})



// to get products
cartRoutes.get("/",authenticate,async (req,res) => {
    const token=req.headers.authorization.split(' ')[1];
    //console.log("token",token)
    if(token){
        const decoded=jwt.verify(token,'masai');
        // console.log(decoded)
            if(decoded.userID){
                try {
                    const user= await CartProductModel.find({userID:decoded.userID});
                    res.status(200).send(user)
                } catch (error) {
                    res.status(400).send({"msg":error.message})
                } 
            }
        }else{
            res.status(400).send({"msg":"Please login!"})
        }
    
})

// to add products in cart
cartRoutes.post("/add",authenticate, async (req,res) => {
    const {name} = req.body
    let product = await  CartProductModel.find({name})
    if(product.length === 0){
        try {
            const cartProd = await new CartProductModel(req.body)
            cartProd.save()
            res.status(200).send({msg:"Product added to cart"})
        } catch (error) {
            res.status(400).send({msg:error.message})
        }
    } else{
        res.send({msg:"product is already in the cart"})
    }
})


// to delete product from cart
cartRoutes.delete("/delete/:cartProductID", async (req,res) => {
    const {cartProductID} = req.params

    try {
        await CartProductModel.findByIdAndDelete({_id:cartProductID})
        res.status(200).send({msg:"Product deleted from cart"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

// to update product from cart
cartRoutes.patch("/update/:cartProductID", async (req,res) => {
    const {cartProductID} = req.params

    try {
        await CartProductModel.findByIdAndUpdate({_id:cartProductID},req.body)
        res.status(200).send({msg:"Product has been updated"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})



module.exports = {cartRoutes};