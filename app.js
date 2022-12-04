const express=require('express');
const fs=require('fs');
const multer=require("multer")
var path=require('path');
const app=express();
var bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));

const PORT=3000;


const data=fs.readFileSync('name.txt');

// app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));


// app.use(express.bodyParser());
// app.get('/',function(req,res){
//     res.end(data);
// });

app.listen(PORT,()=>{
    console.log(`listening at port${PORT}`);
});