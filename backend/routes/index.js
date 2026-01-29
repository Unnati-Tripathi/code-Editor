
var express = require("express");//importing
var router = express.Router();//creating router object
var bcrypt = require("bcryptjs");
var userModel = require("../models/userModels");
var jwt = require("jsonwebtoken");
var projectModel = require("../models/projectModels");
// app.use(express.json()); // ye optional h abhi ke liye..
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



const secret="secret"; //secret key bnayi h for jwt

router.post("/signUp",async(req,res)=>{
  let {username , name,  email , password}=req.body;
  let emailCon= await userModel.findOne({email:email});
  if (emailCon){
    res.json({success: false, message:"This Email already exists "});
  }
  else{

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB
        let user = userModel.create({
          username:username,
          name:name,
          email:email,
          password:hash //date time apne aap set ho jayegi..
        });
        return res.json({success: true,message:"User created Successfully"});
      //else case ka ander he  h ye..
      });
    
    });
  }
});

router.post("/login" , async(req,res)=>{
  let {email , password}=req.body;
  let user = await userModel.findOne({email:email});
  if(user){   //check  if user exist or not..
    bcrypt.compare(password, user.password, (err, isMatch) => { //err stands for error.. //if exist then check for password
      if(isMatch === true){
        let token =jwt.sign({email: user.email , userId: user._id},secret);
        return res.json({success: true,message:"Logged in Successfully" , token:token , userId:user._id});
      } 
      else{
        return res.json({success:false , message: "Invalid Id or Password"});
      }
      
    });
  }
  else{
    return res.json({success:false , message: "User Not Found..!"});
  }
  
});


router.post("/getUserDetails" , async(req,res)=>{
  let {userId}=req.body;
  let user=await userModel.findOne({_id: userId});
  if(user){
    return res.json({success:true , message: "user details fetched successfully" , user:user});

  }
  else{
    return res.json({success:false , message: "User not found"});
  }
});


router.post("/createProject" , async(req,res)=>{
  let {userId , title  }=req.body;
  let user = await userModel .findOne({_id:userId});
  if(user){
    let project=await projectModel.create({
      title: title,
      createdBy:userId
    });
    return  res.json({ success: true , message: "New project is createsd successfully.!" , projectId: project._id });
  }
  else{
    return res.json({success:false , message: "User not found"});
  }
})


router.post("/getProjects",async(req , res) =>{ //ye post ni get request honi  chiye..
  let {userId}=req.body;
  let user= await userModel.findOne({_id:userId});
  if(user){
    let projects = await projectModel.find({createdBy:userId});
    return res.json({success: true , message: "Projects fetched" , projects:projects});
  }
  else{return res.json({success:false , message:"User Not Found"});

  }
});

router.post("/deleteProject" , async (req , res)=>{
  let {userId , progId}  = req.body;
  let user = await userModel.findOne({ _id:userId});
  if(user){
    let project = await projectModel.findByIdAndDelete({_id: progId});
    return res.json({success:true , message: "Project Deleted Successfully..!"});
  }
  else{
    return res.json({success:false , message:"User not found..! "});
  }

});

router.post( "/getProject" , async (req , res)=>{
  let {userId , projId} =req.body;
  let user = await userModel.findOne({  _id: userId });
  if(user){
    let project = await projectModel.findOne({_id: projId});
    return res.json({success: true ,message:"Project fetched successfully" , project:project});
  }
  else{
    return res.json({success:false , message:"User not found..! "});
  }
});

router.post("/updateproject", async (req, res) => {
  let { userId, projId, htmlCode, cssCode, jsCode } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndUpdate(
      { _id: projId },
      { htmlCode, cssCode, jsCode },
      { new: true }
    );
    if (project) {
      return res.json({ success: true, message: "Project updated successfully" });
    } else {
      return res.json({ success: false, message: "Project not found" });
    }
  } else {
    return res.json({ success: false, message: "User not found" });
  }
});

module.exports = router;




