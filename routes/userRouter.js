const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const router = express.Router();

/**@desc Login user
 * @Route /api/user/login
 * @access public
  */
router.post('/login',loginUser);

/**@desc Register user
 * @Route /api/user/register
 * @access public
  */
router.post('/register',registerUser);

/**
 * @desc user details 
 * @route /api/user/current
 * @access private
 * */
router.get('/current',currentUser);

module.exports = router;