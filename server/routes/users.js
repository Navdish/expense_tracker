const router = require('express').Router();
const { userController } = require('../controllers');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: '../images/' });
const secret_key = 'Zenmonk';



function authenticateUser(req, res, next) {
    const token = req.headers['jwt-token'];
    console.log(token);
    if(token == null) return res.status(401).json({message : "Not authenticated"});

    jwt.verify(token, secret_key, (err, user)=> {
        if(err) return res.status(403).json({message : 'No longer valid'});
        res.user = user;
        console.log(user);
        next();
    })
}


router.post('/signup', userController.signup);
router.post('/login', userController.login);


module.exports = router;

// router.get('/fetch_user', authenticateUser, userController.fetch_user );
// router.get('/fetch_products', authenticateUser, userController.fetch_products);
// router.post('/add_product',authenticateUser, upload.single('avatar'), userController.add_product);