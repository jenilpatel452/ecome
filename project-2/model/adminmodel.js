var mongoose = require('mongoose');
var tablestruct = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})
module.exports = mongoose.model('admin', tablestruct)




