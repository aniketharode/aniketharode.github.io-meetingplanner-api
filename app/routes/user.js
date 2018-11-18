const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const calenderController = require("./../../app/controllers/calenderController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;


    app.get(`${baseUrl}/view/all`, userController.getAllUser);

 
    /**
     * @api {get} /api/v1/users/view/all api for getting all users.
     * @apiVersion  1.0.0
     * @apiGroup users
     *
     *
     *
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All User Details Found",
            "status": 200,
            "data": [
         {
            "createdOn": "2018-11-03T08:25:48.000Z",
            "mobileNumber": 915757878,
            "email": "aniket.harode@gmail.com",
            "password": "$2a$10$XIaqIorlQFeuvmgAH4qrEuVPrqFp5Ub8n910g6CilHsNVnS74.btO",
            "lastName": "Harode",
            "firstName": "Aniket",
            "userId": "s-oxtXcsf"
        }
    ]

        }
    */




    // params: userId.
   // app.get(`${baseUrl}/:userId/details`, auth.isAuthorized, userController.getSingleUser);

    
    // params: firstName, lastName, email, mobileNumber, password, apiKey.
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @api {post} /api/v1/users/signup api for user signup.
     * @apiGroup users
     * @apiVersion  1.0.0
     * 
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} mobileNumber mobileNumber of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
    "error": false,
    "message": "usser created succcessfully",
    "status": 200,
    "data": {
        "__v": 0,
        "_id": "5bf0febed2fc99068897e189",
        "createdOn": "2018-11-18T05:55:10.000Z",
        "mobileNumber": 3823283,
        "email": "dhoni7@gmail.com",
        "lastName": "Dhoni",
        "firstName": "M.S",
        "userId": "kSXbJEfMP"
    }
}
    */




    app.post(`${baseUrl}/login`, userController.loginFunction);


/**
 *@api {post} /api/v1/users/login api for user login. 
     * @apiGroup users
     * @apiVersion  1.0.0
     * 
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Im55ZnhKdllMbyIsImlhdCI6MTU0MjUyMDY1MDY3MCwiZXhwIjoxNTQyNjA3MDUwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6MzgyMzI4MywiZW1haWwiOiJkaG9uaTdAZ21haWwuY29tIiwibGFzdE5hbWUiOiJEaG9uaSIsImZpcnN0TmFtZSI6Ik0uUyIsInVzZXJJZCI6ImtTWGJKRWZNUCJ9fQ.5ghDJ0K84b09HtpAWVLUWdm8HsJ53p3bw5rmc3o52Mo",
        "userDetails": {
            "mobileNumber": 3823283,
            "email": "dhoni7@gmail.com",
            "lastName": "Dhoni",
            "firstName": "M.S",
            "userId": "kSXbJEfMP"
        }
    }
}
}
    */



    app.put(`${baseUrl}/:userId/edit`, auth.isAuthorized, userController.editUser);



/**
	 * @api {put} /api/v1/users/:userId/edit/:authToken Edit a users
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * 
	 * @apiParam {String} userId The userId should be passed as the URL parameter 
     * 
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
	 *  @apiSuccessExample {json} Success-Response:
	 * {
    "error": false,
    "message": "User details edited",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */







    app.post(`${baseUrl}/:userId/delete`, auth.isAuthorized, userController.deleteUser);


/**
	 * @api {post} /api/v1/users/:userId/delete/:authToken Edit a users
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * 
	 * @apiParam {String} userId The userId should be passed as the URL parameter 
     * 
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
	 *  @apiSuccessExample {json} Success-Response:
	 * {
    "error": false,
    "message": "Deleted the user successfully",
    "status": 200,
    "data": {
        "_id": "5bf0febed2fc99068897e189",
        "__v": 0,
        "createdOn": "2018-11-18T05:55:10.000Z",
        "mobileNumber": 3823283,
        "email": "dhoni7@gmail.com",
        "password": "abcd",
        "lastName": "Dhoni",
        "firstName": "M.S",
        "userId": "kSXbJEfMP"
    }
}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */




    app.post(`${baseUrl}/forget`,userController.forgetPassword);

    //app.get(`${baseUrl}/reset/:token`,userController.resetPass);

    app.post(`${baseUrl}/reset/:token`,userController.resetpassword111);

    app.get(`${baseUrl}/meetingPlanner`,auth.isAuthorized,userController.meetingPlanner);




/**
	 * @api {get} /api/v1/users/meetingPlanner/:authToken to get sigle users
	 * @apiVersion 0.0.1
	 * @apiGroup get
	 *
	 * 
     * 
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
	 * {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "userId": "s-oxtXcsf",
        "firstName": "Aniket",
        "lastName": "Harode",
        "email": "aniket.harode@gmail.com"
    }
}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */






    app.post(`${baseUrl}/createMeeting`,auth.isAuthorized,calenderController.createMeetingDate);



 /**
  * @api {post} /api/v1/users/createMeeting api for creating the meeting for the users use by only admin.These api is not used with postman as can give the wrong date in backend due to bug in angular calender in later version 
  * of these app will be rectfied
  * 
     * @apiGroup users
     * @apiVersion  1.0.0
     * 
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header) and it is of admin only
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} id id of the calender field which is to be updated. (body params) (required)
     * @apiParam {string} userId userId of the user for which meeting is created . (body params) (required)
     * @apiParam {string} title title of the meeting. (body params) (required)
     * @apiParam {string} purpose purpose of the meeting . (body params) (required)
     * @apiParam {string} start start time  of the meeting note give in utc format . (body params) (required)
     * @apiParam {string} end end time of the meeting note give in utc format. (body params) (required)
     * @apiParam {string} adminName adminName of the user who created the meeting. (body params) (required)
     * 
     * 
     * 
     * 
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
       {
    "error": false,
    "message": "Successfully created the meeting for the user",
    "status": 200,
    "data": {
        "_id": "5bef95d3c9638e10f8086e51",
        "__v": 20,
        "newData": [
            {
                "adminName": "aniket-admin",
                "endTime": "enter the time",
                "startTime": "enter the time",
                "end": "Sunday, November 18, 2018 10:59 AM",
                "start": "Sunday, November 18, 2018 10:30 AM",
                "purpose": "18 th day purpose",
                "title": "event is 18",
                "id": "2"
            }
        ],
        "email": "aniket.harode@gmail.com",
        "lastName": "Harode",
        "firstName": "Aniket",
        "userId": "s-oxtXcsf"
    }
}
    */







    app.get(`${baseUrl}/findMeeting/:userId`,calenderController.findMeeting);



/**
 * @api {get} /api/v1/users/createMeeting api for get the meeting for the users.
     * @apiGroup users
     * @apiVersion  1.0.0
     * 
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
       {
    "error": false,
    "message": "Successfully get the meeting for the user",
    "status": 200,
    "data": {
        "_id": "5bef95d3c9638e10f8086e51",
        "__v": 20,
        "newData": [
            {
                "adminName": "aniket-admin",
                "endTime": "enter the time",
                "startTime": "enter the time",
                "end": "Sunday, November 18, 2018 10:59 AM",
                "start": "Sunday, November 18, 2018 10:30 AM",
                "purpose": "18 th day purpose",
                "title": "event is 18",
                "id": "2"
            }
        ],
        "email": "aniket.harode@gmail.com",
        "lastName": "Harode",
        "firstName": "Aniket",
        "userId": "s-oxtXcsf"
    }
}
    */







    app.post(`${baseUrl}/deleteMeeting`,calenderController.deleteMeetingDate);


 /**
  * @api {post} /api/v1/users/deleteMeeting api for deleting of the meeting of the users.
     * @apiGroup users
     * @apiVersion  1.0.0
     * 
     *
     * 
     * 
     * 
    */







    app.get(`${baseUrl}/getUser/:userId`,userController.getSingleUser);

    app.get(`${baseUrl}/stopSnoozing/:id`,calenderController.stopSnoozing);

    app.get(`${baseUrl}/logout/:userId`, userController.logout);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/logout/:userId api for logout of the users.
     *
     * 
     * 
     * @apiSuccessExample {object} Success-Response:
       {
    "error": false,
    "message": "Logged Out Successfully",
    "status": 200,
    "data": null
}

 @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
    */





}
