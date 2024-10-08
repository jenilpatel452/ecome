var user = require('../model/adminmodel');
var storage = require('node-persist');
storage.init( /* options ... */);
exports.insert = async (req, res) => {
    var data = await user.create(req.body);
    res.status(200).json({
        status: 'insert success',
        data
    })
}
exports.Login = async (req, res) => {
    var data = await user.find({ username: req.body.username });
    var Login_id = await storage.getItem('Login_id');
    console.log(Login_id);
    if (Login_id == undefined) {
        if (data.length == 1) {

            if (data[0].password === req.body.password) {
                await storage.setItem('Login_id', data[0].id);
                res.status(200).json({
                    status: "Login success"
                })
            }
            else {
                res.status(200).json({
                    status: "check your mail and password"
                })
            }
        }
        else {
            res.status(200).json({
                status: "check your email and password"
            })
        }
    }
    else {
        res.status(200).json({
            status: "already login another admin"
        })
    }
}
exports.Logout = async (req, res) => {
    await storage.clear();

    res.status(200).json({
        status: "user logout"
    })
}


