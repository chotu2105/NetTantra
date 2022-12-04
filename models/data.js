const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/satyam',{useNewUrlParser:true });
var con=mongoose.Collection;
var userSchema=new mongoose.Schema({
 firstname:{
    type:String,
 },
 lastname:{
    type:String,
 },
 dob:{
   type:Date,
 },
 email:{
    type:String,
 },
 fathersfirstname:{
   type:String,
 },
 fatherslastname:{
type:String,
 },
 
 nationality:{
    type:String,
 },
 phnnumber:{
    type:String,
 },
 mobnumber:{
   type:String,
 },
 HSC_Instuition_name:{
   type:String,
   // required:true,

 },
 HSC_Board:{
   type:String,
   // required:true,


 },
 HSC_Percentage:{
   type:Number,
   // required:true,

 },
 SSC_Instuition_name:{
   type:String,
   // required:true,
},
SSC_Board:{
   type:String,
   // required:true,
},
SSC_Percentage:{
   type:Number,
   // required:true,
},
Current_Instuition_name:{
   type:String,
   // required:true,
},

Current_branch:{
   type:String,
   // required:true,
},
Cureent_course:{
   type:String,
   // required:true,
},
overall_Percentage:{
   type:Number,
   // required:true,
}
,
Current_backlogs:{
   type:Number,
   // required:true,
},


image:{
   type:String,
   // required:true,
},
doc1:{
   type:String,
   // required:true,
},
doc2:{
   type:String,
   // required:true,
},



});
var userModel=mongoose.model('first',userSchema);
module.exports=userModel;