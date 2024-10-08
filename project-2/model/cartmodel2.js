var mongoose=require('mongoose');
var cartSchema=new mongoose.Schema({
    p_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product'

    },
    u_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    p_qty:{
        type:Number
    },
    image:{
        type:String
    },
    p_name:{
        type:String
    },
    p_price:{
        type:Number
    }

})
module.exports=mongoose.model('cart1',cartSchema);