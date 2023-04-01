const formmodel = require("../model/formmodel");
const jwt = require("jsonwebtoken");
const { isValid,isvalidObjectId} = require("../validation/validator");

const createuser = async function (req, res) {

  try {
    const data = req.body;
    const { userRegistration, username, taskname, taskdescription } = data;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "body is empty" });
    }

    if (!userRegistration)
      return res
        .status(400)
        .send({ sttaus: false, msg: "userregistration is required" });
    if (!isValid(userRegistration))
      return res
        .status(400)
        .send({ sttaus: false, msg: "only contain aplhabets" });

    if (!username)
      return res
        .status(400)
        .send({ sttaus: false, msg: "username is required" });

    let duplicateuser = await formmodel.findOne({ username: username });
    if (duplicateuser) {
      return res.status(409).send({ staus: "username is all ready present" });
    }

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

    let finduser = await formmodel.find().count();

    let ob = {};
    ob.userRegistration = userRegistration;
    ob.username = username;
    ob.taskname = taskname;
    ob.taskdescription = taskdescription;
    ob.formnumber = finduser;

    const create = await formmodel.create(ob);
    return res
      .status(201)
      .send({ status: true, data: create, msg: "successfully created" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const userlogin = async function (req, res) {
  try {
    const data = req.body;
    let { userRegistration, username } = data;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Body is Empty" });
    }

    if (!userRegistration)
      return res
        .status(400)
        .send({ status: false, msg: "userregistration is required" });
    if (!isValid(userRegistration))
      return res
        .status(400)
        .send({
          status: false,
          msg: "userregistration is only contain alphabet",
        });

    if (!username)
      return res
        .status(400)
        .send({ status: false, message: "username is required" });
    if (!isValid(username))
      return res
        .status(400)
        .send({ status: false, message: "username is only contain alphabe" });

    const exist = await formmodel.findOne({ username: username });
    if (!exist) {
      return res.status(401).send({ status: false, msg: "invalid creditial" });
    }

    let token = jwt.sign({ userId: exist._id }, "Secretkeyof21twelve", {
      expiresIn: "24hr",
    });

    let decode = jwt.decode(token, "Secretkeyof21twelve");

    return res
      .status(200)
      .send({
        status: true,
        message: "Successfully Login",
        data: token,
        userId: decode.userId,
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getbyparam = async function (req, res) {
  try {
    let userId = req.params.userId;

    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "userId is required!" });
    }

    if (!isValid(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "userId is invalid!" });
    }

    if (!isvalidObjectId(userId)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "This userId have some missing character!",
        });
    }

    let get = await formmodel.findOne({ _id: userId });
    if (!get) {
      return res
        .status(404)
        .send({ status: false, message: `This ${userId} not founded!` });
    }
    return res
      .status(200)
      .send({ status: true, message: "Applied for this job", data: get });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateuser = async function (req, res) {
  try {
    let data = req.body;
    let userId = req.params.userId;
    let { userRegistration, username, taskname, taskdescription } = data;

    let updates = {};


 
    if (username) {
      if (!isValid(username)) {
        return res
          .status(400)
          .send({ status: false, message: "username is invalid!" });
      }

      updates.username = username;
    }

    
    if (taskdescription) {
      if (!isValid(taskdescription)) {
        return res
          .status(400)
          .send({ status: false, message: "taskdescription is invalid!" });
      }

      updates.taskdescription = taskdescription
    }

    let exist = await formmodel.findOne({ _id: userId });
    if (!exist) {
      return res
        .status(404)
        .send({ status: false, message: `this ${userId} does n't exist!` });
    }

    if (userRegistration) {
      if (!isValid(userRegistration)) {
        return res
          .status(400)
          .send({
            status: false,
            message: "userregestration is invalid is invalid!",
          });
      }

      if (!isValidName(userRegistration)) {
        return res
          .status(400)
          .send({
            status: false,
            message:
              "userRegestration should n't contain  any extraa charcter!",
          });
      }
      updates.userRegistration = userRegistration;
    }

    if (taskname) {
      if (!isValid(taskname)) {
        return res
          .status(400)
          .send({ status: false, message: "taskname is invalid!" });
      }

      updates.taskname = taskname;
    }

    let updateuser = await formmodel.findOneAndUpdate(
      { _id: userId },
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
    let userId = req.params.userId;

    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "userId is required" });
    }

    let exist = await formmodel.findOne({ _id: userId, isDeleted: false });
    if (!exist) {
      return res
        .status(404)
        .send({ status: false, message: `this ${userId} does n't exist!` });
    }

    let deleteu = await formmodel.deleteOne(
      { _id: userId }
    
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

module.exports = { createuser, userlogin, getbyparam, updateuser, deleteuser };
