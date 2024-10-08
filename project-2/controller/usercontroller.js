var user = require('../model/usermodel');
var categoty = require('../model/categorymodel');
var product = require('../model/productmodel')
var storage = require('node-persist');
var cart = require('../model/cartmodel');
var ship = require('../model/shipmodel')
exports.register = async (req, res) => {
    var data = await user.create(req.body);
    res.status(200).json({
        status: "succes",
        message: 'register success',
        data
    })
}


exports.login = async (req, res) => {
    try {
        const data = await user.findOne({ email: req.body.email });

        if (!data) {
            return res.status(200).json({
                status: "check your email and password",
            });
        }

        if (data.password === req.body.password) {
            await storage.setItem('id', data.id);
            return res.status(200).json({
                status: 'login success',
                data,
            });
        } else {
            return res.status(200).json({
                status: "check your email and password",
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

// exports.login = async (req, res) => {
//     var data = await user.find({ email: req.body.email });
//     var id = await storage.getItem('id');
//     console.log(id)
//     if (id === undefined) {
//         if (data.length == 1) {
//             if (data.password == req.body.password) {
//                 await storage.setItem('id', data.id)
//                 res.status(200).json({
//                     status: 'login success',
//                     data,


//                 })
//             } else {
//                 res.status(200).json({
//                     status: "check your mail and password"
//                 })
//             }
//         } else {
//             res.status(200).json({
//                 status: "check your mail and password"
//             })
//         }
//     } else {
//         res.status(200).json({
//             status: "user already exist"
//         })
//     }
// }
exports.Logout = async (req, res) => {
    await storage.clear();
    res.status(200).json({
        status: "user logout"
    })
}
exports.showproduct = async (req, res) => {
    var data = await product.find();
    res.status(200).json({
        status: "success",
        data
    })
}
exports.showcat = async (req, res) => {
    // const cat = await categoty.find({}, { cat_name: 1, _id: 0 });
    // var id = await storage.getItem('id');
    const data = await categoty.find();
    // if (id === undefined) {
    //     res.status(200).json({
    //         status: 'login first',
    //     })
    // } else {
    res.status(200).json({
        status: 'success',
        data
    })
    // }
}
exports.view_cat_wise = async (req, res) => {
    // var id = await storage.getItem('id');
    const { cat_id } = req.params;
    const data = await product.find({ cat_id: cat_id });
    // if (id === undefined) {
    //     res.status(401).json({
    //         status: 'Unauthorized',
    //         message: 'Please log in first'
    //     });
    // } else {
    res.status(200).json({
        status: 'success',
        data
    });
    // }
}
exports.show_product = async (req, res) => {
    // var id = await storage.getItem('id');
    const id = req.params.id;
    const data = await product.findById(id)
    // if (id === undefined) {
    //     res.status(401).json({
    //         status: 'Unauthorized',
    //         message: 'Please log in first'
    //     });
    // } else {
    res.status(200).json({
        status: 'success',
        data
    });
    // }
}

exports.cart_insert = async (req, res) => {
    try {
        var id = await storage.getItem('id');
        req.body.u_id = id;
        const { p_id } = req.params;
        req.body.p_id = p_id;

        var data = await cart.create(req.body);
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to insert into cart',
            error: error.message
        });
    }
};


exports.cart_show = async (req, res) => {
    // var id = await storage.getItem('id');
    var data = await cart.find()
    // if (id === undefined) {
    //     res.status(401).json({
    //         status: 'Unauthorized',
    //         message: 'Please log in first'
    //     });
    // } else {
    res.status(200).json({
        status: 'success',
        data
    });
    // }
}
exports.cart_update = async (req, res) => {
    var id = req.params.id;
    // var u_id = await storage.getItem('id');
    var data = await cart.findByIdAndUpdate(id, req.body);
    // if (u_id === undefined) {
    //     res.status(401).json({
    //         status: 'Unauthorized',
    //         message: 'Please log in first'
    //     });
    // } else {
    res.status(200).json({
        status: 'update success',

    });
    // }
}
exports.cart_delete = async (req, res) => {
    var id = req.params.id;
    // var u_id = await storage.getItem('id');
    var data = await cart.findByIdAndDelete(id);
    // if (u_id === undefined) {
    //     res.status(401).json({
    //         status: 'Unauthorized',
    //         message: 'Please log in first'
    //     });
    // } else {
    res.status(200).json({
        staus: "product delete success"

    })
    // }
}

exports.getcurrentuser = async (req, res) => {
    const { u_id } = req.params;
    var data = await cart.find({ u_id: u_id });
    res.status(200).json({
        status: 'success',
        data
    })
}
exports.showalluser = async (req, res) => {
    var data = await user.find();
    res.status(200).json({
        status: 'success',
        data
    })

}
exports.shipinsert = async (req, res) => {
    const { u_id } = req.params;
    req.body.u_id = u_id;
    
    try {
        var data = await ship.create(req.body);
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (error) {
        console.error('Error inserting shipping details:', error);
        res.status(500).json({
            status: 'fail',
            message: 'Failed to insert shipping details',
            error: error.message
        });
    }
};
exports.showship = async (req, res) => {
    var data = await ship.find();
    res.status(200).json({
        status: 'success',
        data
    })

}
exports.updateship=async(req,res)=>{
    var id=req.params.id;
    var data=await ship.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status: ' ship update success',
    })
}
