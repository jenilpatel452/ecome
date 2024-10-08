var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
    name:{
        type:'string'
    },
    email:{
        type:'string'
    },
    password:{
        type:'string'
    }
})
module.exports=mongoose.model('user',userSchema);