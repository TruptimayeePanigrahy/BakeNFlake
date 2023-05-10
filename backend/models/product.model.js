const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    category:String,
    description:{
        Flavor : String,
        Number_of_item: Number,
        Type_of_pastry: String,
        Type_of_Cream: String
        }
})

const ProductModel=mongoose.model("product",productSchema);

module.exports=ProductModel