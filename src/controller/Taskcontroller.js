const taskmodel = require('../model/taskmodel')
const moment = require('moment')
const {isValid, isvalidObjectId} = require ('../validator/validator')



const createusers = async function (req, res) {

    try {
      const data = req.body;
      const {  user, taskname, taskdescription ,formdateTime } = data;
  
      if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, msg: "body is empty" });
      }
  
      if (!user)
        return res
          .status(400)
          .send({ sttaus: false, msg: "usere is required" });
      if (!isValid(user))
        return res
          .status(400)
          .send({ sttaus: false, msg: "user must be present" });

          if(!isvalidObjectId(user)) return res.status(400).send({ msg: "user is is invalid", status: false })
  
  
      if (!taskname)
        return res
          .status(400)
          .send({ staus: false, msg: "taskname is required" });
      if (!isValid(taskname))
        return res
          .status(400)
          .send({ status: false, msg: "taskname is only contain alphabet" });
  
      if (!taskdescription)
        return res
          .status(400)
          .send({ sttaus: false, msg: "taskdescription is required" });
      if (!isValid(taskdescription))
        return res
          .status(400)
          .send({
            status: false,
            msg: "taskdescription is only contain alphabet",
          });

          
        
        if (!moment(formdateTime, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).send({ status: false, msg: "releasedAt should be in YYYY-MM-DD format" })
        }
        let date = moment().format("YYYY-MM-DD")
        if (!moment(formdateTime).isAfter(date)) {
            return res.status(400).send({ status: false, msg: "pls provide an upcoming date" })
        }


  
      let finduser = await taskmodel.find().count();

      const nar =`${moment().format("DDMMYY")}_${finduser}`
      console.log(nar)
  
      let ob = {};
      
      ob.user = user;
      ob.taskname = taskname;
      ob.taskdescription = taskdescription;
      ob.formnumber = nar; 
      ob.formdateTime = formdateTime



  
      const create = await taskmodel.create(ob);
      return res
        .status(201)
        .send({ status: true, data: create, msg: "successfully created" });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };



  const gettask = async function (req, res) {
    try {
      let taskId = req.params.taskId;
  
      if (!taskId) {
        return res
          .status(400)
          .send({ status: false, message: "userId is required!" });
      }
  
      if (!isValid(taskId)) {
        return res
          .status(400)
          .send({ status: false, message: "userId is invalid!" });
      }
  
      if (!isvalidObjectId(taskId)) {
        return res
          .status(400)
          .send({
            status: false,
            message: "This userId have some missing character!",
          });
      }
  
      let get = await taskmodel.findOne({ _id: taskId });
      if (!get) {
        return res
          .status(404)
          .send({ status: false, message: `This ${taskId} not founded!` });
      }
      let ft =new Date(get.formdateTime)

      let da = new Date()
      let remain = ft - da
     
     
      const obb = {}

      obb.taskId = get._id
      obb.user = get.user
      obb.taskname = get.taskname
      obb.taskdescription = get.taskdescription
      obb.formdateTime = get.formdateTime
      obb.remainingtime = remain
      


       return res
        .status(200)
        .send({ status: true, message: "user detail get", data: obb  });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
  
  
 
  const updateuser = async function (req, res) {
    try {
      let data = req.body;
      let taskId = req.params.taskId;
      let {  user, taskname, taskdescription ,formdateTime} = data;
  
      let updates = {};
   
      if (user) {
        if (!isValid(user)) {
          return res
            .status(400)
            .send({ status: false, message: "username is invalid!" });
        }
  
        updates.user = user;
      }
  
      
      if (taskdescription) {
        if (!isValid(taskdescription)) {
          return res
            .status(400)
            .send({ status: false, message: "taskdescription is invalid!" });
        }
  
        updates.taskdescription = taskdescription
      }
  
      let exist = await taskmodel.findOne({ _id: userId });
      if (!exist) {
        return res
          .status(404)
          .send({ status: false, message: `this ${taskId} does n't exist!` });
      }
  
  
      if (taskname) {
        if (!isValid(taskname)) {
          return res
            .status(400)
            .send({ status: false, message: "taskname is invalid!" });
        }
  
        updates.taskname = taskname;
      }
  
      let updateuser = await taskmodel.findOneAndUpdate(
        { _id: taskId },
        { $set: updates },
        { new: true }
      );
  
      return res
        .status(200)
        .send({
          status: true,
          message: "User Update succesfully!",
          data: updateuser,
        });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
  
  let deleteuser = async function (req, res) {
    try {
      let taskId = req.params.taskId;
  
      if (!taskId) {
        return res
          .status(400)
          .send({ status: false, message: "userId is required" });
      }
  
      let exist = await taskmodel.findOne({ _id: taskId,  });
      if (!exist) {
        return res
          .status(404)
          .send({ status: false, message: `this ${taskId} does n't exist!` });
      }
  
      let deleteu = await taskmodel.deleteOne(
        { _id: taskId }
      
      );
  
      return res
        .status(200)
        .send({
          status: true,
          message: "Successfully deleted user!",
          data: deleteu,
        });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };


  module.exports={createusers,updateuser,deleteuser,gettask}