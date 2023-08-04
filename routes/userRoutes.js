const express = require('express');
const { register, loginUser, currentUser } = require('../Controllers/userController');
// const validateToken = require('../middleware/validateTokdenHandler');
const app = express();
const router = express.Router();
router.post('/register', register)
router.post('/login', loginUser)
router.get('/current', currentUser)
module.exports = router
