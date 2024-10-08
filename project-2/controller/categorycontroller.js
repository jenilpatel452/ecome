var cat = require('../model/categorymodel');
exports.insert = async (req, res) => {
    try {
        req.body.image = req.file.originalname;
        var data = await cat.create(req.body);
        res.status(200).json({
            status: 'cat insert success',
            data
        })
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                status: 'error',
                message: 'Please enter a different record, this is already in the database'
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}
exports.View_data = async (req, res) => {
    var data = await cat.find();
    res.status(200).json({
        status: "cat find",
        data
    })
}

exports.update_category = async (req, res) => {
    // req.body.image = req.file.originalname;
    var id = req.params.id;
    var data = await cat.findByIdAndUpdate(id, req.body);
    res.status(200).json({
        staus: "cat update success",
        
    })
}

exports.delete_category = async (req, res) => {
    var id = req.params.id;
    var data = await cat.findByIdAndDelete(id);
    res.status(200).json({
        staus: " cat delete success"
    })
}
