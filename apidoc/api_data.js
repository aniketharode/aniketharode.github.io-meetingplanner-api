define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/users/:userId/delete/:authToken",
    "title": "Edit a users",
    "version": "0.0.1",
    "group": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Deleted the user successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5bf0febed2fc99068897e189\",\n        \"__v\": 0,\n        \"createdOn\": \"2018-11-18T05:55:10.000Z\",\n        \"mobileNumber\": 3823283,\n        \"email\": \"dhoni7@gmail.com\",\n        \"password\": \"abcd\",\n        \"lastName\": \"Dhoni\",\n        \"firstName\": \"M.S\",\n        \"userId\": \"kSXbJEfMP\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "delete",
    "name": "PostApiV1UsersUseridDeleteAuthtoken"
  },
  {
    "type": "put",
    "url": "/api/v1/users/:userId/edit/:authToken",
    "title": "Edit a users",
    "version": "0.0.1",
    "group": "edit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User details edited\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "edit",
    "name": "PutApiV1UsersUseridEditAuthtoken"
  },
  {
    "type": "get",
    "url": "/api/v1/users/meetingPlanner/:authToken",
    "title": "to get sigle users",
    "version": "0.0.1",
    "group": "get",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p> <p>{ &quot;error&quot;: false, &quot;message&quot;: &quot;Login Successful&quot;, &quot;status&quot;: 200, &quot;data&quot;: { &quot;userId&quot;: &quot;s-oxtXcsf&quot;, &quot;firstName&quot;: &quot;Aniket&quot;, &quot;lastName&quot;: &quot;Harode&quot;, &quot;email&quot;: &quot;aniket.harode@gmail.com&quot; } }</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "get",
    "name": "GetApiV1UsersMeetingplannerAuthtoken"
  },
  {
    "type": "get",
    "url": "/api/v1/users/createMeeting",
    "title": "api for get the meeting for the users.",
    "group": "users",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "       {\n    \"error\": false,\n    \"message\": \"Successfully get the meeting for the user\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5bef95d3c9638e10f8086e51\",\n        \"__v\": 20,\n        \"newData\": [\n            {\n                \"adminName\": \"aniket-admin\",\n                \"endTime\": \"enter the time\",\n                \"startTime\": \"enter the time\",\n                \"end\": \"Sunday, November 18, 2018 10:59 AM\",\n                \"start\": \"Sunday, November 18, 2018 10:30 AM\",\n                \"purpose\": \"18 th day purpose\",\n                \"title\": \"event is 18\",\n                \"id\": \"2\"\n            }\n        ],\n        \"email\": \"aniket.harode@gmail.com\",\n        \"lastName\": \"Harode\",\n        \"firstName\": \"Aniket\",\n        \"userId\": \"s-oxtXcsf\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersCreatemeeting"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/logout/:userId",
    "title": "api for logout of the users.",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "       {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersLogoutUserid"
  },
  {
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "api for getting all users.",
    "version": "1.0.0",
    "group": "users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {\n        \"error\": false,\n        \"message\": \"All User Details Found\",\n        \"status\": 200,\n        \"data\": [\n     {\n        \"createdOn\": \"2018-11-03T08:25:48.000Z\",\n        \"mobileNumber\": 915757878,\n        \"email\": \"aniket.harode@gmail.com\",\n        \"password\": \"$2a$10$XIaqIorlQFeuvmgAH4qrEuVPrqFp5Ub8n910g6CilHsNVnS74.btO\",\n        \"lastName\": \"Harode\",\n        \"firstName\": \"Aniket\",\n        \"userId\": \"s-oxtXcsf\"\n    }\n]\n\n    }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "type": "post",
    "url": "/api/v1/users/createMeeting api for creating the meeting for the users use by only admin.These api is not used with postman as can give the wrong date in backend due to bug in angular calender in later version",
    "title": "of these app will be rectfied",
    "group": "users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header) and it is of admin only</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id of the calender field which is to be updated. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user for which meeting is created . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>purpose of the meeting . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "start",
            "description": "<p>start time  of the meeting note give in utc format . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end",
            "description": "<p>end time of the meeting note give in utc format. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminName",
            "description": "<p>adminName of the user who created the meeting. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "       {\n    \"error\": false,\n    \"message\": \"Successfully created the meeting for the user\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5bef95d3c9638e10f8086e51\",\n        \"__v\": 20,\n        \"newData\": [\n            {\n                \"adminName\": \"aniket-admin\",\n                \"endTime\": \"enter the time\",\n                \"startTime\": \"enter the time\",\n                \"end\": \"Sunday, November 18, 2018 10:59 AM\",\n                \"start\": \"Sunday, November 18, 2018 10:30 AM\",\n                \"purpose\": \"18 th day purpose\",\n                \"title\": \"event is 18\",\n                \"id\": \"2\"\n            }\n        ],\n        \"email\": \"aniket.harode@gmail.com\",\n        \"lastName\": \"Harode\",\n        \"firstName\": \"Aniket\",\n        \"userId\": \"s-oxtXcsf\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersCreatemeetingApiForCreatingTheMeetingForTheUsersUseByOnlyAdminTheseApiIsNotUsedWithPostmanAsCanGiveTheWrongDateInBackendDueToBugInAngularCalenderInLaterVersion"
  },
  {
    "type": "post",
    "url": "/api/v1/users/deleteMeeting",
    "title": "api for deleting of the meeting of the users.",
    "group": "users",
    "version": "1.0.0",
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersDeletemeeting"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "group": "users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Im55ZnhKdllMbyIsImlhdCI6MTU0MjUyMDY1MDY3MCwiZXhwIjoxNTQyNjA3MDUwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6MzgyMzI4MywiZW1haWwiOiJkaG9uaTdAZ21haWwuY29tIiwibGFzdE5hbWUiOiJEaG9uaSIsImZpcnN0TmFtZSI6Ik0uUyIsInVzZXJJZCI6ImtTWGJKRWZNUCJ9fQ.5ghDJ0K84b09HtpAWVLUWdm8HsJ53p3bw5rmc3o52Mo\",\n        \"userDetails\": {\n            \"mobileNumber\": 3823283,\n            \"email\": \"dhoni7@gmail.com\",\n            \"lastName\": \"Dhoni\",\n            \"firstName\": \"M.S\",\n            \"userId\": \"kSXbJEfMP\"\n        }\n    }\n}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "group": "users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n    \"error\": false,\n    \"message\": \"usser created succcessfully\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5bf0febed2fc99068897e189\",\n        \"createdOn\": \"2018-11-18T05:55:10.000Z\",\n        \"mobileNumber\": 3823283,\n        \"email\": \"dhoni7@gmail.com\",\n        \"lastName\": \"Dhoni\",\n        \"firstName\": \"M.S\",\n        \"userId\": \"kSXbJEfMP\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });
