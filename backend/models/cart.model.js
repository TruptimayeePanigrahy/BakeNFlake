const mongoose=require('mongoose');

const cartProductSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    userID: {
        type: String
    }
})


module.exports=mongoose.model("cartProduct",cartProductSchema);