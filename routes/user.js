const router=require('express').Router();


router.get('/',(req,res)=>{
    res.send("Roshan");
})

module.exports=router;