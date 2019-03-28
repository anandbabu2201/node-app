const Joi= require('joi');
const helmet=require('helmet');
const morgan=require('morgan');
const config= require('config');
const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const logger=require('./middlewear/logger');
const courses= require('./routes/courses');
const home= require('./routes/home');
const express=require("express");
const app=express();

// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log('app:',app.get('env'));
app.set('view engine','pug');
app.set('views','./views'); //   

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home);

console.log("Application name:" + config.get("name"));

console.log("Mail server name:" + config.get("mail.host"));
console.log("Mail server password:" + config.get("mail.password"))


if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled....')
}

dbDebugger('connection to the database....')

app.use(logger);
app.use(function(req,res,next){
    console.log("Authenticating..")
    next();
})





const port =process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}`))

