const mongoose = require("mongoose");

const isvalidpassword = function (password) {
    const passwordRegex = 	/^(?=.*\d).{8,15}$/; // atleast one numericdigit
    return passwordRegex.test(password);
};

const isvalidEmail = function (email) {
    const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

module.exports={isvalidEmail,isvalidpassword}