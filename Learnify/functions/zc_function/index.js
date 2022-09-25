'use strict';

const express = require('express');
const expressApp = express();
var catalyst = require('zcatalyst-sdk-node');
const bodyParser = require('body-parser');

expressApp.use(bodyParser.urlencoded({extended:true}));

//Student download file
expressApp.post('/',(req,res)=>{
	const name  = req.body.instituteName;
	const phn  = req.body.phone;
	const email  = req.body.your_email;
	const pass  = req.body.password;		
	console.log(name);
	//Get a file store instance
	var app = catalyst.initialize(req); 
	let datastore = app.datastore();
	
	let rowData = 
    { 
        Name: name,
        phone: phn,
        email: email,
		password : pass
    };
	let table = datastore.table('10174000000018001');
    let insertPromise = table.insertRow(rowData);
    insertPromise.then((row) => {
            console.log(row);
        });

		var signupConfig = {
			platform_type: 'web',
			zaid: 10048008360
	         };
		var userConfig = {
			last_name: name,
			email_id: email,
			role_id : '10174000000017016'
		};
		let userManagement = app.userManagement();
		let registerPromise = userManagement.registerUser(signupConfig, userConfig); //Pass the JSON configration to the method
		registerPromise.then(userDetails => {  //Returns a promise
        	console.log(userDetails); 
		});

	res.redirect("/app/login.html")	
});


expressApp.post('/login',(req,res)=>{
	const email  = req.body.your_email;
	const pass  = req.body.password;
	
	var app = catalyst.initialize(req); 
	let query = `SELECT * FROM userTable where email='${email}' and password='${pass}'`;
	let zcql = app.zcql();
	let zcqlPromise = zcql.executeZCQLQuery(query);
	zcqlPromise.then(queryResult => {
		  
		 
		const length = (queryResult.length);

		if(length==1){
			res.redirect("/app/create.html")
		}
		else{
			res.send('')
		}

	});
});

expressApp.post('/upload',(req,res)=>{
	console.log("hi");
});
module.exports=expressApp;