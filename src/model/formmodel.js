const  mongoose = require('mongoose')
const moment = require('moment')

const userschema = new mongoose.Schema({

    userRegistration : {
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },

    formnumber:{
        type:Number,
        required:true,
        min:1
    },

    taskname:{
        type:String,
        required:true
    },
    taskdescription:{
        type:String,
        required:true
    },

    formdatetime:{
        type: Date,
        default: moment().toDate()
                                        
    },

    isDeleted:{
        type:Boolean,
        default:false
    }
}, 

{timestamps:true}

)

module.exports = mongoose.model('user',userschema)