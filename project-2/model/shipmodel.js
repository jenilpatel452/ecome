var mongoose = require('mongoose');
var shipSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    pincode: {
        type: Number
    },
    u_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})
module.exports = mongoose.model('ship', shipSchema);