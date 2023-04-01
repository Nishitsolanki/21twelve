const mongoose = require("mongoose");

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
}

const isvalidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };

module.exports = {isValid,isvalidObjectId}