const express= require('express')
const router = express()
const {signUp,signIn, searchdata} = require('../controllers/userController.js')
const {authentication} = require('../auth/auth.js')
router.post('/signupuser',signUp)
router.post('/signInUser',signIn)
router.get('./search',authentication,searchdata)






module.exports = router