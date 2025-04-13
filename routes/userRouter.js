const express = require('express');
const router = express.Router();;
const signup = require('../controllers/userControllers/signup');
const signin = require('../controllers/userControllers/signin');
const getUserDetails = require('../controllers/userControllers/getUserDetails');
const authMiddleware = require('../middlewares/auth');
const updateUserDetails = require('../controllers/userControllers/updateUserDetails');

router.post('/signup', signup)
router.post('/signin',signin)

router.use(authMiddleware)
router.get('/getUserDetails',getUserDetails)
router.put('/updateUserDetails',updateUserDetails);

module.exports = router;