const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')

var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

var CronJob = require('cron').CronJob;

const CalenderModel = mongoose.model('Calender');


let  count = 0;
let stopSnozz;

let createMeetingDate = (req, res) => {
    
if(req.user.firstName.search("admin") == -1){
console.log("request user is not admin :----"+req.user.firstName);
logger.error(err.message, 'calender Controller: createMeetingDate', 10)
            let apiResponse = response.generate(true, 'user do not have previlages to create meeting',404, null);
            res.send(apiResponse)
}
else{
    console.log("user is  admin");


    CalenderModel.findOne({ 'userId': req.body.userId })
    .exec((err,result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'calender Controller: createMeetingDate', 10)
            let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'calender Controller:createMeetingDate')
             
            let newUser = new CalenderModel({

                userId:req.body.userId,
                firstName: req.body.firstName,
                lastName: req.body.lastName || '',
                email: req.body.email.toLowerCase(),
                newData : [{
                    id:req.body.id,
                    title : req.body.title,
                purpose : req.body.purpose,
                start : time.convertToLocalTime(req.body.start),
                end : time.convertToLocalTime(req.body.end),
                startTime :req.body.startTime,
                endTime :req.body.endTime,
                adminName :req.body.adminName
                }]
                
            })
            
    

            newUser.save((err,result) => {

                if(err){
                    console.log(err)
                    logger.error(err.message, 'calenderController: createMeetingDate', 10)
                    let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                    res.send(apiResponse)
                }
                else{
                    let newUserObj = result.toObject();
                    //res.send(newUserObj)
                   // console.log("-------saving admin name when empty----"+result.newData[0].adminName);
                    delete newUserObj._id
                    delete newUserObj.__v
                    logger.info("create the meeting in calender", 'calenderController: createMeetingDate', 10)
                    let apiResponse = response.generate(false, 'Successfully created the meeting for the user', 200, result)
                    res.send(apiResponse)
                    //-----------mail sending-------------
                    var smtpTransport = nodemailer.createTransport({
                        service: 'Gmail', 
                        auth: {
                          user: 'meetingplanner11@gmail.com',
                          pass: "Google@98"
                        }
                      });
              
                      var mailOptions = {
                          to:  req.body.email.toLowerCase(),
                          from: 'meetingplanner11@gmail.com',
                          subject: 'Meeting is scheduled',
                          text: 'Meeting is schedule on' +time.convertToLocalTime(req.body.start)+
                            'Please login with below link to see schedule, :\n\n' +
                            'http://localhost:4200/login/'  + '\n\n'+
                            'Thanks and Regards \n'+req.body.adminName
                            
                            
                        };
                        smtpTransport.sendMail(mailOptions, function(err) {
                          console.log('mail sent');
                          //req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                         // let apiResponse = response.generate(false, 'Email is send', 200, null);
                          //res.send(apiResponse)
                          //done(err, 'done');
                        });


                    //------------end of mail sending-----------------
                }
            })
        }
        else if(!check.isEmpty(result)){
console.log("result is present"+req.body.title)


 let datafield = [
    
] ;

for(let i=0;i<result.newData.length;i++){
  //console.log("n thepop :---"+req.body.id+" new data id is:-"+result.newData[i].id);
   /* if(req.body.id===result.newData[i].id){
        datafield.pop({
            id:result.newData[i].id,
            title : result.newData[i].title,
        purpose : result.newData[i].purpose,
        start : result.newData[i].start,
        end : result.newData[i].end,
        startTime : result.newData[i].startTime,
        endTime : result.newData[i].endTime
        });
    }
    else{*/
    datafield.push( 
        {
            id:result.newData[i].id,
            title : result.newData[i].title,
        purpose : result.newData[i].purpose,
        start : result.newData[i].start,
        end : result.newData[i].end,
        startTime : result.newData[i].startTime,
        endTime : result.newData[i].endTime,
        adminName :result.newData[i].adminName
    },
     )
     
     if(req.body.id===result.newData[i].id){
        datafield.pop({
            id:result.newData[i].id,
            title : result.newData[i].title,
        purpose : result.newData[i].purpose,
        start : result.newData[i].start,
        end : result.newData[i].end,
        startTime : result.newData[i].startTime,
        endTime : result.newData[i].endTime,
        adminName :result.newData[i].adminName
        });
    }
    
}



datafield.push( 

   {
    id:req.body.id,   
    title:req.body.title,
   purpose : req.body.purpose,
   start : time.convertToLocalTime(req.body.start),
   end : time.convertToLocalTime(req.body.end),
   startTime : req.body.startTime,
   endTime : req.body.endTime,
   adminName :req.body.adminName},
)
result.newData = datafield;
           /* this.datafield.push({
                title:req.body.title
            })*/
       

           result.save((err,result1) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'calender Controller: createMeetingDate', 10)
                    let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result1)) {
                    logger.info('No User Found', 'calender Controller: createMeetingDate')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let newUserObj = result1.toObject();
                    //res.send(newUserObj)
                   // delete newUserObj._id
                    //delete newUserObj.__v
                    
                    logger.info("create the meeting in calender", 'calenderController: createMeetingDate', 10)
                    let apiResponse = response.generate(false, 'Successfully created the meeting for the user', 200, result1)
                    res.send(apiResponse);
                    //-----------mail sending-------------
                    var smtpTransport = nodemailer.createTransport({
                        service: 'Gmail', 
                        auth: {
                          user: 'meetingplanner11@gmail.com',
                          pass: "Google@98"
                        }
                      });
                      console.log("email id is:-"+ result1.email);
                      var mailOptions = {
                          
                          to:  result1.email.toLowerCase(),
                          from: 'meetingplanner11@gmail.com',
                          subject: 'Meeting is schedule',
                          text: 'Meeting is schedule on ' +time.convertToLocalTime(req.body.start)+
                            'Please login with below link to see details of meeting,\n\n' +
                            'http://localhost:4200/login/'  + '\n\n'+
                            'Thanks and Regards \n'+req.body.adminName
                            
                            
                        };
                        smtpTransport.sendMail(mailOptions, function(err) {
                          console.log('mail sent');
                          //req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                         // let apiResponse = response.generate(false, 'Email is send', 200, null);
                          //res.send(apiResponse)
                          //done(err, 'done');
                        });


                    //------------end of mail sending-----------------
                }
            })
           
        }
    })
       
}
       


}// end get single user



//start of deleting user meeting


let deleteMeetingDate = (req, res) => {
    
    let start;
    let adminName;
    CalenderModel.findOne({ 'userId': req.body.userId })
    .exec((err,result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'calender Controller: deleteMeetingDate', 10)
            let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'calender Controller:deleteMeetingDate');
        }
        else if(!check.isEmpty(result)){



 let datafield = [
    
] ;

for(let i=0;i<result.newData.length;i++){
  
   
    datafield.push( 
        {
            id:result.newData[i].id,
            title : result.newData[i].title,
        purpose : result.newData[i].purpose,
        start : result.newData[i].start,
        end : result.newData[i].end,
        startTime : result.newData[i].startTime,
        endTime : result.newData[i].endTime,
        adminName :result.newData[i].adminName
    },
     )
    
     if(req.body.id===result.newData[i].id){
         this.start = result.newData[i].start;
         this.adminName = result.newData[i].adminName;
        datafield.pop({
            id:result.newData[i].id,
            title : result.newData[i].title,
        purpose : result.newData[i].purpose,
        start : result.newData[i].start,
        end : result.newData[i].end,
        startTime : result.newData[i].startTime,
        endTime : result.newData[i].endTime,
        adminName :result.newData[i].adminName
        });
    }
    if(req.body.id < result.newData[i].id){
        datafield.pop({
            id:result.newData[i].id,
            title : result.newData[i].title,
        purpose : result.newData[i].purpose,
        start : result.newData[i].start,
        end : result.newData[i].end,
        startTime : result.newData[i].startTime,
        endTime : result.newData[i].endTime,
        adminName :result.newData[i].adminName
        });
        datafield.push({
            id:result.newData[i].id-1,
            title : result.newData[i].title,
        purpose : result.newData[i].purpose,
        start : result.newData[i].start,
        end : result.newData[i].end,
        startTime : result.newData[i].startTime,
        endTime : result.newData[i].endTime,
        adminName :result.newData[i].adminName
        });
    }
    
}

result.newData = datafield;
           /* this.datafield.push({
                title:req.body.title
            })*/
       

           result.save((err,result1) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'calender Controller: deletingMeeting', 10)
                    let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result1)) {
                    logger.info('No User Found', 'calender Controller: deletingMeeting')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let newUserObj = result1.toObject();
                    //res.send(newUserObj)
                   // delete newUserObj._id
                    //delete newUserObj.__v
                    //console.log("-0---result is alredy present---"+result1.newData.title);
                    logger.info("calender Controller: deletingMeeting", 'calenderController: deletingMeeting', 10)
                    let apiResponse = response.generate(false, 'Successfully deleted the meeting for the user', 200, result1)
                    res.send(apiResponse)
                     //-----------mail sending-------------
                     var smtpTransport = nodemailer.createTransport({
                        service: 'Gmail', 
                        auth: {
                          user: 'meetingplanner11@gmail.com',
                          pass: "Google@98"
                        }
                      });
                      //console.log("email id is:-"+ result1.email);
                      var mailOptions = {
                          
                          to:  result1.email.toLowerCase(),
                          from: 'meetingplanner11@gmail.com',
                          subject: 'Meeting is cancelled',
                          text: 'Meeting is cancelled of date  ' +this.start+
                            'Please login with below link to see details of meeting,\n\n' +
                            'http://localhost:4200/login/'  + '\n\n'+
                            'Thanks and Regards \n'+this.adminName
                            
                            
                        };
                        smtpTransport.sendMail(mailOptions, function(err) {
                          console.log('mail sent');
                          //req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                         // let apiResponse = response.generate(false, 'Email is send', 200, null);
                          //res.send(apiResponse)
                          //done(err, 'done');
                        });


                    //------------end of mail sending-----------------
                }
            })
           
        }
    })
       
          
       


}// end get single user



//end of deleting user meeting





let findMeeting = (req,res) => {
    CalenderModel.findOne({ 'userId': req.params.userId })
    .exec((err,result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'calender Controller: findMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
            res.send(apiResponse)
        
    } else if (check.isEmpty(result)) {
        logger.info('No User Found', 'calender Controller: findMeeting')
        let apiResponse = response.generate(true, 'No User Found', 404, null)
        res.send(apiResponse)
    } 
    else {
      //  console.log(result.newData[0].title);
        logger.info("create the meeting in calender", 'calenderController: findMeeting', 10)
        let apiResponse = response.generate(false, 'Successfully get the meeting for the user', 200, result)
        res.send(apiResponse)
    }
    })
}



let stopSnoozing = (req,res) => {
    if(req.params.id){
        console.log("stop snozzing mail");

        stopSnozz = req.params.id;

        logger.info("stop meeting snozzing", 'calenderController: stopSnoozing', 10)
        let apiResponse = response.generate(false, 'Successfully inisiate stop snozzing', 200, null)
        res.send(apiResponse)
    }
    else{
        console.log("not stop snozzing");
        logger.info("stop meeting snozzing", 'calenderController: stopSnoozing', 10)
        let apiResponse = response.generate(true, 'some error', 200, null)
        res.send(apiResponse)
    }
}



let findAllMeeting = (req,res) => {

    newData = [];

      
    CalenderModel.find()
    .exec((err,result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Calender Controller: findAllMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To findAllMeeting', 500, null)
            res.send(apiResponse)
        
    } else if (check.isEmpty(result)) {
        logger.info('No User Found', 'Calender Controller: findAllMeeting')
        let apiResponse = response.generate(true, 'No User Found', 404, null)
        res.send(apiResponse)
    } 
    else {
      //  console.log(result.newData[0].title);
        logger.info("create the meeting in calender", 'Calender Controller: findAllMeeting', 10)
        let apiResponse = response.generate(false, 'Successfully created the meeting for the user', 200, result);
        for(let i=0;i<apiResponse.data.length;i++){
            for(let j=0;j<apiResponse.data[i].newData.length;j++){

                newData[j] =  apiResponse.data[i].newData[j];
               let firstIndex = newData[j].start.indexOf(',');
               let lastIndex = newData[j].start.lastIndexOf(',');

               if(newData[j].start.slice(firstIndex,lastIndex).search(time.getMonth( new Date().getMonth()))>1){
                 // console.log("month is matched");
                  //let time = newData[j].start.slice(lastIndex+6);
                 // console.log("month is:---"+newData[j].start.slice(lastIndex+6));
                  let demo = newData[j].start.slice(lastIndex+6).indexOf(":");
                 // console.log("month11 is:---"+demo);
                  //console.log("month22 is:---"+newData[j].start.substr((lastIndex+6),demo) );
                  let time =newData[j].start.substr((lastIndex+6),demo);
                  //console.log("time is :---"+time);
                 /* if(time==new Date().getHours()+":"+new Date().getMinutes()){
                     console.log("time matched");
                  }*/

                  let minutes = newData[j].start.substr(newData[j].start.indexOf(":")+1,2);
                  let minusMin = new Date().getMinutes();
                  //console.log("minutes are:---"+(minutes-5));
                 

                

                 if(newData[j].start.slice(firstIndex,lastIndex).search(new Date().getDate())>1){
                    //console.log("days is matched"+stopSnozz+"count is "+count);
                   
                    let hours
                   
                  if(newData[j].start.search("PM")>1){
                      // console.log("pm is the tme");
                      if(new Date().getHours()>12){
                        hours = (new Date().getHours())-12;
                     //  console.log("in 13 format"+hours);
                      
                   }

                   if(minutes==00){
                       minutes=60;
                       time =time -1;
                   }

                    if(new Date().getHours()>12 && time==hours){
                   // console.log("hours is matched"+hours);
                    //console.log("matched days are:---"+newData[j].start);
                      //start of matching mnutes
                      let sixtymin;
                      if(minutes==00){
                        minutes=60;
                        if((minutes-5)<=minusMin){
                            //console.log("minutes are matched:--"+newData[j].start,"count is :-"+count+"snozz:--"+stopSnozz);
                            if(stopSnozz==1){
                                console.log("user has stop snozzing");
                                if(minutes<minusMin)
                                stopSnozz=1;
                                else if(minutes>minusMin){
                                    if(count<4){
                                        stopSnozz=1;
                                        count++;
                                        }
                                        else{
                                            stopSnozz=0;
                                            count=0;
                                        }
                                }
                         }
                           else{
                           // console.log("snozzing is started");
                            if(!(minutes<minusMin)){
                                if(count>=5)
                                count = 0;
                             if(count<5){
                                console.log("time is matched");
                             //mail sending logic
                                //-----------mail sending-------------
    
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'meetingplanner11@gmail.com',
          pass: "Google@98"
        }
      });
      //console.log("email id is:-"+ result1.email);
      var mailOptions = {
          
          to:  apiResponse.data[i].email.toLowerCase(),
          from: 'meetingplanner11@gmail.com',
          subject: 'Gentel Remainder:-Meeting is scheduled',
          text: 'Meeting is scheduled of date  ' +newData[j].start+
            'Please login with below link to see details of meeting,\n\n' +
            'http://localhost:4200/login/'  + '\n\n'+
            'Thanks and Regards \n'+newData[j].adminName
            
            
        };
       // --start;
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          //req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
         // let apiResponse = response.generate(false, 'Email is send', 200, null);
          //res.send(apiResponse)
          //done(err, 'done');
        });

                               //console.log("mail sending *******"+newData[j].start+"email "+apiResponse.data[i].email+"admin "+newData[j].adminName+"count is:-"+count);
                               count++;
                            //end of mail sending logic
                            }
                        }
                        
                        else{
                           // console.log("meeting are matched");
                            
                        }
                    }//if the stop snozz is 0
                         }
                      }  //if the minutes are 00
                      else{
                         if((minutes-5)<=minusMin){
                           // console.log("minutes are matched:--"+newData[j].start,"count is :-"+count+"snozz:--"+stopSnozz);
                            if(stopSnozz==1){
                                console.log("users has stop snozzing");
                                if(minutes<minusMin){
                                stopSnozz=1;
                                //console.log("snozzing s one:-"+stopSnozz);
                                }
                                else if(minutes>minusMin){
                                   // console.log("stop zero snozzing:-"+stopSnozz);
                                    if(count<4){
                                    stopSnozz=1;
                                    count++;
                                    }
                                    else{
                                        stopSnozz=0;
                                        count=0;
                                    }
                                }
                         }
                           else{
                           // console.log("snozzing is started");
                            if(!(minutes<minusMin)){
                                if(count>=5)
                                count=0;
                             if(count<5){
                                console.log("minutes are matched");
                             //mail sending logic
                                //-----------mail sending-------------
    
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'meetingplanner11@gmail.com',
          pass: "Google@98"
        }
      });
      //console.log("email id is:-"+ result1.email);
      var mailOptions = {
          
          to:  apiResponse.data[i].email.toLowerCase(),
          from: 'meetingplanner11@gmail.com',
          subject: 'Gentel Remainder:-Meeting is scheduled',
          text: 'Meeting is scheduled of date  ' +newData[j].start+
            'Please login with below link to see details of meeting,\n\n' +
            'http://localhost:4200/login/'  + '\n\n'+
            'Thanks and Regards \n'+newData[j].adminName
            
            
        };
       // --start;
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          //req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
         // let apiResponse = response.generate(false, 'Email is send', 200, null);
          //res.send(apiResponse)
          //done(err, 'done');
        });

                             //  console.log("mail sending *******"+newData[j].start+"email "+apiResponse.data[i].email+"admin "+newData[j].adminName+"count is:-"+count);
                               count++;
                            //end of mail sending logic
                            }
                        }
                        
                        else{
                            //console.log("meeting are matched");
                           
                        }
                    }//if the stop snozz is 0
                         }
                        }//of the minutes is not 00
                      //end of matching minutes
                }
                   
                  }
                  else{
                      if(minutes==00){
                         minutes = 60;
                         time = time-1;
                      }
                    if(time==new Date().getHours()){
                        //console.log("hours am "+hours);
                        //console.log("matched days are:---"+newData[j].start);
                        //start of matching mnutes
                       
                          if(minutes==00){
                            minutes=60;
                              //mail sending 
                              if((minutes-5)<=minusMin){
                               // console.log("minutes are matched:--"+newData[j].start,"count is :-"+count+"snozz:--"+stopSnozz);
                                //console.log("system time is :--"+new Date(),"count is :-"+count);
                                if(stopSnozz==1){
                                    console.log("users has stop snozzing");
                                    if(minutes<minusMin)
                                    stopSnozz=1;
                                    else if(minutes>minusMin){
                                        if(count<4){
                                            stopSnozz=1;
                                            count++;
                                            }
                                            else{
                                                stopSnozz=0;
                                                count=0;
                                            }
                                    }
                             }
                               else {
                                if(!(minutes<minusMin)){
                                    if(count>=5)
                                      count = 0;
                                if(count<5){
    
                                    console.log("minutes are matched");
                                 //mail sending logic
                                    //-----------mail sending-------------
        
        var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'meetingplanner11@gmail.com',
              pass: "Google@98"
            }
          });
          //console.log("email id is:-"+ result1.email);
          var mailOptions = {
              
              to:  apiResponse.data[i].email.toLowerCase(),
              from: 'meetingplanner11@gmail.com',
              subject: 'Gentel Remainder:-Meeting is scheduled',
              text: 'Meeting is scheduled of date  ' +newData[j].start+
                'Please login with below link to see details of meeting,\n\n' +
                'http://localhost:4200/login/'  + '\n\n'+
                'Thanks and Regards \n'+newData[j].adminName
                
                
            };
           // --start;
            smtpTransport.sendMail(mailOptions, function(err) {
              console.log('mail sent');
              //req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
             // let apiResponse = response.generate(false, 'Email is send', 200, null);
              //res.send(apiResponse)
              //done(err, 'done');
            });
    
                                  // console.log("mail sending *******"+newData[j].start+"email "+apiResponse.data[i].email+"admin "+newData[j].adminName+"count is:-"+count);
                                   count++;
                                //end of mail sending logic
                                }
                            }
                            else{
                               // console.log("minutes already started");
                            }
                        }//when the stop snozz s zero
                             }//end of matching minutes
                          }
                          else{
                             //mail sending 
                             if((minutes-5)<=minusMin){
                               // console.log("minutes are matched:--"+newData[j].start,"count is :-"+count+"snozz:--"+stopSnozz);
                                //console.log("system time is :--"+new Date(),"count is :-"+count);

                                if(stopSnozz==1){
                                   console.log("users has stop snozzing");
                                    if(minutes<minusMin)
                                    stopSnozz=1;
                                    else if(minutes>minusMin){
                                        if(count<4){
                                            stopSnozz=1;
                                            count++;
                                            }
                                            else{
                                                stopSnozz=0;
                                                count=0;
                                            }
                                    }
                             }
                               else {
                                if(!(minutes<minusMin)){
                                    if(count>=5)
                                    count=0;
                                if(count<5){
                                 console.log("minutes are matched");
                                 //mail sending logic
                                    //-----------mail sending-------------
        
        var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'meetingplanner11@gmail.com',
              pass: "Google@98"
            }
          });
          //console.log("email id is:-"+ result1.email);
          var mailOptions = {
              
              to:  apiResponse.data[i].email.toLowerCase(),
              from: 'meetingplanner11@gmail.com',
              subject: 'Gentel Remainder:-Meeting is scheduled',
              text: 'Meeting is scheduled of date  ' +newData[j].start+
                'Please login with below link to see details of meeting,\n\n' +
                'http://localhost:4200/login/'  + '\n\n'+
                'Thanks and Regards \n'+newData[j].adminName
                
                
            };
           // --start;
            smtpTransport.sendMail(mailOptions, function(err) {
              console.log('mail sent');
              //req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
             // let apiResponse = response.generate(false, 'Email is send', 200, null);
              //res.send(apiResponse)
              //done(err, 'done');
            });
    
                                  // console.log("mail sending *******"+newData[j].start+"email "+apiResponse.data[i].email+"admin "+newData[j].adminName+"count is:-"+count);
                                   count++;
                                //end of mail sending logic
                                }
                            }
                            else{
                                //console.log("minutes already started");
                                
                            }
                        }//when the stop snozz s zero
                             }//end of matching minutes

                            }//if the minutes are not 60 minutes




                            //end of mail sending

                         }
                         
                    }//end of matching hours
                  }
                  //end of matching hours

                
                    //console.log("get time and hors:--"+new Date().getHours()+":"+new Date().getMinutes());
                   
                   
                
                }//end of matching days

               //end of matching month

               // console.log("new data is :----"+newData[j].start);
               // console.log("new data email is :----"+new Date().getHours()+":"+new Date().getMinutes());
            }
         
        }
       // res.send(apiResponse)
    }
    })

}





module.exports = {
    createMeetingDate:createMeetingDate,
    findMeeting:findMeeting,
    deleteMeetingDate:deleteMeetingDate,
    findAllMeeting:findAllMeeting,
    stopSnoozing:stopSnoozing
}