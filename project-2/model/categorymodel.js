var mongoose=require('mongoose');
var catSchema=new mongoose.Schema({
    cat_name: {
        type: String,
        unique: true, 
        required: true, 
        trim: true 
    },
    image:{
        type:String
    }
})
module.exports=mongoose.model('category',catSchema)