var express = require('express');
var router = express.Router();
var admin = require('../controller/admincontroller');
var category = require('../controller/categorycontroller');
var product = require('../controller/productcontroller');
var user = require('../controller/usercontroller')
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
/* GET home page. */
router.post('/', admin.insert);
router.post('/login', admin.Login);
router.get('/logout', admin.Logout);
router.post('/catinsert', upload.single('image'), category.insert);
router.get('/catview', category.View_data);
router.post('/catupdate/:id', category.update_category);
router.get('/catdelete/:id', category.delete_category);
router.post('/p_insert', upload.single('image'), product.insert);
router.get('/p_view', product.select);
router.post('/p_update/:id', product.update_product);
router.get('/p_delete/:id', product.delete_product);
router.post('/uregister', user.register);
router.post('/ulogin', user.login);

// router.get('/login', user.login);

router.get('/ulogout', user.Logout);
router.get('/v_product', user.showproduct);
router.get('/v_cat', user.showcat);
router.get('/v_cat/:cat_id', user.view_cat_wise);
router.get('/product/:id', user.show_product);
router.post('/cinsert/:p_id', user.cart_insert);
router.get('/showcart', user.cart_show);
router.post('/updatecart/:id', user.cart_update);
router.get('/deletecart/:id', user.cart_delete);
router.get('/showuser/:u_id', user.getcurrentuser);
router.get('/showuser', user.showalluser);
router.post('/shipinsert/:u_id', user.shipinsert);
router.get('/showship', user.showship);
router.post('/shipupdate/:id', user.updateship);





module.exports = router;
