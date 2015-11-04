var mysql = require("./mysql");
var ejs = require("ejs");



function getConnectProfile(req, res){
	var connectEmail = req.param("emailid");
	console.log("My email id session is"+req.session.email);
	var getHeadQuery= "select email from signup where email=\'"+connectEmail+"\'";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.length> 0){
				
				res.send({"status":"no"});
							}
			else{
				res.send({"status":"connected"});
			}
		}
	},getHeadQuery);
	
};



function getProfile(req, res){
	var connectEmail = req.param("emailid");
	console.log(req.session.email);
	var getHeadQuery= "select * from signup,profile where signup.email=profile.email_id and profile.email_id=\'"+connectEmail+"\'";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.length>0){
				console.log(Results);
				res.send(Results);
							}
			else{
				res.send({"User":"Not Found"});
			}
		}
	},getHeadQuery);
	
};




function pendingConnection(req, res){
	//pending connections here nikhil is owner of account and it will be session id
	console.log(req.session.email);
	var getHeadQuery= "select first_name, last_name from signup, connections where signup.email=connections.my_email and _status='not_accepted' and connections.user_email='nikhilsc10@gmail.com'";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.length>0){
				console.log(Results);
				res.send(Results);
							}
			else{
				res.send({"User":"Not Found"});
			}
		}
	},getHeadQuery);
	
};




function connectionPage(req, res){

	console.log(req.session.email);
	var getHeadQuery= "select my_email,user_email from signup, connections where signup.email=connections.my_email";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.length>0){
				console.log(Results);
				res.send(Results);
							}
			else{
				res.send({"User":"Not Found"});
			}
		}
	},getHeadQuery);
	
};





function acceptedInvitation(req, res){
	var connectEmail = req.param("email");
					console.log("The email is "+connectEmail);  
	var getHeadQuery= "insert into connections (_status) Values ('accepted') where email=\'"+connectEmail+"\'";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.affectedRows>0){
				
				res.send(Results);
							}
			else{
				res.send({"Request":"Not sent"});
			}
		}
	},getHeadQuery);
	
};




function showConnections(req,res)
{
	ejs.renderFile('./views/viewConnections.ejs',function(err, result) {
        // render on success
        if (!err) {
        	    res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};







function DisplayConnection(req, res){
	//display connections here nikhil is owner of account and it will be session id
	email=req.session.email;
	var getHeadQuery= "select first_name, last_name email from signup, connections where signup.email=connections.user_email and _status='accepted' and connections.my_email=\'"+email+"\'";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.length>0){
				console.log(Results);
				res.send(Results);
							}
			else{
				res.send({"User":"Not Found"});
			}
		}
	},getHeadQuery);
	
};





function lastLog(req, res){
	
	var email=req.session.email
	var getHeadQuery= "select last_login from signup where email=\'"+email+"\'";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.length>0){
				console.log(Results);
				res.send(Results);
							}
			else{
				res.send({"User":"Not Found"});
			}
		}
	},getHeadQuery);
	
};





function sendRequest(req, res){
	var connectEmail = req.param("emailid");
					  
	var getHeadQuery= "insert into connections (my_email,user_email, _status) Values ('mahesh.dhamgunde@sjsu.edu',\'"+connectEmail+"\','not_accepted')";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.affectedRows>0){
				
				res.send(Results);
							}
			else{
				res.send({"Request":"Not sent"});
			}
		}
	},getHeadQuery);
	
};




function notConnected(req,res)
{

	console.log("received email- ", req.param("emailId"));
	var email = req.param("emailId");
	ejs.renderFile('./views/connectionReq.ejs', {emailId: email}, function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};

function connected(req,res)
{
	ejs.renderFile('./views/connectedNow.ejs',function(err, result) {
        // render on success
        if (!err) {
        	    res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};





exports.getConnectProfile=getConnectProfile;
exports.notConnected=notConnected;
exports.connected=connected;
exports.getProfile=getProfile;
exports.sendRequest=sendRequest;
exports.DisplayConnection=DisplayConnection;
exports.pendingConnection=pendingConnection;
exports.connectionPage=connectionPage;
exports.showConnections=showConnections;
exports.acceptedInvitation=acceptedInvitation;
exports.lastLog=lastLog;
