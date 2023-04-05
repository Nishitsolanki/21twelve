const {createuser,userlogin, getbyparam,} = require('../controller/usercontroller')
const {createusers,updateuser,deleteuser ,gettask} = require('../controller/Taskcontroller')

const router = require('express').Router()

//user

router.post('/register' ,createuser)
router.post('/login', userlogin)
router.get('/get/:userId' ,getbyparam)

//task

router.post('/create', createusers)
router.put('/puts/:taskId' , updateuser)
router.delete('/delete/:taskId' ,deleteuser)
router.get('/gets/:taskId', gettask)


module.exports=router