const mongoose = require('mongoose');
const productsSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    id:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    points:{
        type:Number,
        required: true
    }
});
const Products= mongoose.model('products',productsSchema)
module.exports = Products