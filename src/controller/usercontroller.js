const usermodel = require('../model/usermodel')
const jwt = require('jsonwebtoken');
const { isValid, isValidPassword ,isvalidObjectId} = require('../validator/validator');

const createuser = async function (req, res) {

    try {
      const data = req.body;
      const { firstname,lastname, username, password } = data;
  
      if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, msg: "body is empty" });
      }

      if(!firstname) return res.status(400).send({status:false,msg:"first name is required"})
      if(!isValid(firstname)) return res.status(400).send({status:false,msg:"first name is alphabet contain only"})


      if(!lastname) return res.status(400).send({status:false,msg:"lasname is required"})
      if(!isValid(lastname)) return res.status(400).send({status:false,msg:"lasname is required"})
  
      
      if (!username)return res.status(400).send({ status: false, msg: "username is required" });

      let duplicateuser = await usermodel.findOne({ username: username });
      if (duplicateuser) {
         return res.status(409).send({ staus: "username is all ready present" });
      } 
      
      if (!isValidPassword(password)) return res.status(400).send({  status: false, msg: "Password length should be between 8-15",});
  
      const create = await usermodel.create(data);
      return res.status(201).send({ status: true, data: create, msg: "successfully created" });

    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  const userlogin = async function (req, res) {
    try {
      const data = req.body;
      let {username,password } = data;
  
      if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, message: "Body is Empty" });
      }
  
      
  
      if (!username)
        return res
          .status(400)
          .send({ status: false, message: "username is required" });
      if (!isValid(username))
        return res
          .status(400)
          .send({ status: false, message: "username is only contain alphabe" });
  
      const exist = await usermodel.findOne({ username: username });
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
  
      if (!isvalidObjectId(taskId)) {
        return res
          .status(400)
          .send({
            status: false,
            message: "This userId have some missing character!",
          });
      }
  
      let get = await usermodel.findOne({ _id: userId });
      if (!get) {
        return res
          .status(404)
          .send({ status: false, message: `This ${userId} not founded!` });
      }
      return res
        .status(200)
        .send({ status: true, message: "user detail get", data: get });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  module.exports={createuser,userlogin,getbyparam}