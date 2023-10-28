const express= require('express')
const router = express()
const {signUp,signIn, searchdata} = require('../controllers/userController.js')
const { authentication} = require('../auth/auth.js')


//*************route for user registration***********  */
router.post('/signupuser',signUp)

//*************route for user login*****************
router.post('/signInUser',signIn)

//********8route for searching ********************* */
router.get('/search',authentication,searchdata)

// //**********rout for logout user****************** */
// router.put('/logoutUSer',authentication,logout)






module.exports = router