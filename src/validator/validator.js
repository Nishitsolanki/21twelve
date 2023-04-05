

const mongoose = require("mongoose");

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
}

const isvalidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };

  const isValidPassword = function (pass) {
    //if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass)) return true;
    if (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass)) return true;
    return false;
  };

module.exports = {isValid,isvalidObjectId,isValidPassword}