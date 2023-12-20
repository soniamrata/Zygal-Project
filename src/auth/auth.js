
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken")
const userController = require('../controllers/userController.js')
const {isvalidEmail,isvalidpassword} = require('../validators/validator.js')

let authentication = async function (req, res, next) {
  try {
      let bearerHeader = req.headers["authorization"];
      if (!bearerHeader) {
          return res
              .status(401)
              .send({
                  status: false,
                  message: "Token is missing! Please enter a token.",
              });
      }

      let decodedToken;
      
      // Extract the token from the 'Bearer' header
      const token = bearerHeader.split(' ')[1];

      if (token) {
          decodedToken = jwt.verify(token, "secret-key");
      } else {
          return res.status(401).send({ status: false, message: "Token is missing or invalid" });
      }

      const userDetails = await userModel.findById(decodedToken.userId);
      if (!userDetails) {
          return res.status(400).send({ status: false, message: "No such user exists" });
      }

      req.userDetails = userDetails;
      req.token = decodedToken;
      next();
  } catch (error) {
      return res.status(500).send({ status: false, error: error.message });
  }
};

  module.exports = {authentication}

