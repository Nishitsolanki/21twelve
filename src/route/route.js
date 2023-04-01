
const express =require("express")
const router=express.Router()
const {createuser,userlogin, getbyparam,updateuser, deleteuser} = require('../controller/formcontroller')


router.post('/createuser', createuser)
router.post('/userlogin',userlogin)
router.get('/getalluser/:userId', getbyparam )
router.put('/updateuser/:userId',updateuser)
router.delete('/deleteuser/:userId', deleteuser)

router.all("/**", function (req, res) {
    res.status(400).send({
      status: false,
      msg: "The api you are requesting is not available",
    });
  });


module.exports=router