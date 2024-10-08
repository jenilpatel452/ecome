const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    p_name: {
        type: String,
        required:true
    },
    p_price: {
        type: Number,
        required:true

    },
    p_desc: {
        type: String,
        required:true

    },
    // de_price: {
    //     type: Number,
    //     required:true

    // },
    // p_manu_date: {
    //     type: String,
    //     required:true

    // },
    // p_exp_date: {
    //     type: String,

    //     required:true

    // },
    p_dis: {
        type: Number,
        required:true

    },
    // p_rate: {
    //     type: Number,
    //     required:true

    // },
    // p_like: {
    //     type: String,
    //     required:true

    // },
    // p_messages: {
    //     type: Number,
    //     required:true

    // },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('product', productSchema);
