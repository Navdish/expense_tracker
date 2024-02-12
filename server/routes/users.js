const router = require('express').Router();
const { userController } = require('../controllers');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: '../images/' });
const secret_key = 'Zenmonk';



function authenticateUser(req, res, next) {
    const token = req.headers['jwt-token'];
    // console.log(token);
    if(token == null) return res.status(401).json({message : "Not authenticated"});

    jwt.verify(token, secret_key, (err, user)=> {
        if(err) return res.status(403).json({message : 'No longer valid'});
        res.user = user;
        // console.log(user);
        next();
    })
}

router.get('/fetch_category', authenticateUser, userController.fetch_category);
router.get('/fetch_expenses', authenticateUser, userController.fetch_expenses);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/add_expenses',authenticateUser, userController.add_expenses);
router.post('add_category', authenticateUser, userController.add_category);
router.put('/edit_expenses', userController.edit_expenses);
router.delete('/drop_expense', userController.drop_expenses);


module.exports = router;

// router.get('/fetch_user', authenticateUser, userController.fetch_user );
// router.get('/fetch_products', authenticateUser, userController.fetch_products);
// router.post('/add_product',authenticateUser, upload.single('avatar'), userController.add_product);