const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'user',
      required:true
    },
    formnumber: {
      type: String,
      required: true,
    },
    taskname: {
      type: String,
      required: true,
    },
    taskdescription: {
      type: String,
      required: true,
    },
    formdateTime: {
      type: Date,
      default:Date.now,
    },
    time :{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model( 'task',taskSchema)