const router=require('express').Router();
const data=require('../models/data');
const qs=require("querystring");
const multer=require("multer")
const { query, application } = require('express');
const userModel = require('../models/data');
const path = require('path');
const imgMime=['image/jpeg', 'image/pjpeg', 'image/gif',
'image/png',];
const docSize=["application/docs","application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/documents')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.split(".")[0]+"."+file.mimetype.split("/")[1])
    },

    
    onerror:(err)=>{
        console.log(err);
        next(err)

    }
    ,
    
  })
  
  const upload = multer({ storage: storage ,limits:{fileSize:4*1024*1024},    fileFilter: function (req, file, cb) {
    if(req.files.length==1){
        if (!imgMime.includes(file.mimetype)) {
            console.log("jbhjkgjk")
           
            return  cb(new Error("Image file mimetype is invalid "));
        }
       
    }
  else{
if(!docSize.includes(file.mimetype)){
    return  cb(new Error("Image file mimetype is "));
}
  }
    cb(null, true)
  }})

router.get('/',function(req,res){
    res.render('index',{error:""});
}); 

router.post('/',function(req,res,next){
   
    var first=req.body.first;
    function hasWhiteSpace(s) {
        return /\s/g.test(s);
      }
    //   if(hasWhiteSpace(req.body.first)){
    //     res.redirect("/")
    //   }
    
    var last=req.body.last;
    var email=req.body.email;
    var gen=req.body.gen;
    var nat=req.body.nationality;
    var number=req.body.number;
let error=false;
    Object.values(req.body).map(item=>{
        if(hasWhiteSpace(item)){
            console.log(item)
            // res.render("index",{'error':"Fileds should not have white spaces"})
           error=true
        
        } 
      
        
    })
    if(error){
        
        res.render("index",{error:"Fileds should not have white spaces"})
    }
    function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }

    return (false)
}
    // var newdata=new data({
    //     first:first,
    //     last:last,
    //     email:email,
    if(!ValidateEmail(req.body.email)){
        res.render("index",{error:"Email doesnt exsist"})
    }
    if(!/^[0-9]{10}$/.test(req.body.phnnumber)){
        console.log("matched");
        res.render("index",{error:"Invalid phn number"})
    }
    //     nat:nat,
    //     number:number
    // });

    // newdata.save((err,doc)=>{
    //     if(err) throw err;
    //     res.redirect('/next');
    // })
   else res.redirect("/next");
});

router.get('/next',function(req,res,next){
    res.render('next');
})
router.post("/next",(req,res)=>{
    const q={...req.query,...req.body}

    var query=qs.stringify(q);
  
    res.redirect("/next2?"+query)
    
})
router.get("/next2",(req,res)=>{

    res.render("next2",{error:""});
})
router.post("/next2",async(req,res)=>{
    // alert(req.files)
   await upload.array("upload-doc")(req,res,async(err)=>{
        if(err){
            console.log(err)
            res.render("next2",{error:err})
 }
    else{    const imgpath=req.files[0].path.split(`\\`)[1]+"/"+req.files[0].path.split(`\\`)[2]
const doc1=req.files[1].path.split(`\\`)[1]+"/"+req.files[1].path.split(`\\`)[2]
const doc2=req.files[2].path.split(`\\`)[1]+"/"+req.files[2].path.split(`\\`)[2]

console.log(imgpath)
    const user=new userModel({...req.query,image:imgpath,doc1:doc1,doc2:doc2});
    await user.save().then((user)=>{
        console.log("user saved")  
        res.json(req.files)       
    })
    }
    console.log()
    })


})

module.exports=router;