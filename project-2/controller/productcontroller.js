var product = require('../model/productmodel');
exports.insert = async (req, res) => {
    req.body.image = req.file.originalname
    // req.body.image = req.file.originalname
    var data = await product.create(req.body);
    res.status(200).json({
        status: 'product insert success',
        data
    })
}
exports.select = async (req, res) => {
    var data = await product.find().populate("cat_id");
    res.status(200).json({
        status: 'find',
        data
    })
}


exports.update_product = async (req, res) => {
    var id = req.params.id;
    var data = await product.findByIdAndUpdate(id, req.body);
    res.status(200).json({
        staus: "product update success"

    })
}

exports.delete_product = async (req, res) => {
    var id = req.params.id;
    var data = await product.findByIdAndDelete(id);
    res.status(200).json({
        staus: "product delete success"
    })
}
