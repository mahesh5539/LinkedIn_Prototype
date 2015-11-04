var mysql = require('./mysql');
var ejs = require("ejs");
var crypto = require('crypto');


var hash = function (pass, salt) {
        var h = crypto.createHash('sha512');
        h.update(pass);
        h.update(salt);
        return h.digest('base64');
    };

    
    module.exports.getUser = function (conn, email, password, callback) {
        conn.query({
            name: 'getUser',
            text: 'SELECT "id", "passwordHash" FROM "user" WHERE "email" = $1 LIMIT 1',
            values: [email]
        }, function (err, result) {
            if (err) {
                throw err;
            }
            if (result.rows.length === 0) {
                callback(null);
            } else {
                var newHash = hash(password, email),
                    row = result.rows[0];

                if (row.passwordHash === newHash) {
                    callback({id: row.id, email: email});
                } else {
                    callback(null);
                }
            }
        });
    };
    
    
    
function signin(req, res){
	console.log("We are in signin");
	 var passwordsignin=req.param("password");
	  var emailsignin =req.param("emailid");
	var stringquery= "select user_password from signup where email ='"+req.param("emailid")+"'";
	mysql.getUser( function(error, results){
		if(error){
			throw error;
		}
		else{
			if(results.length > 0){
				req.session.email=req.param("emailid");
				var date = new Date();
				req.session.date=date;
				
				res.send({"user":"valid"});
			}
			else{
				res.send({"user":"invalid"});
			}
		}
	},stringquery,passwordsignin,emailsignin);
};





function signup(req, res){
	
	
	console.log("We are in create user...successfully!!");
	var firstNameSignup =req.param("firstName");
	var lastNameSignup =req.param("lastName");
	var passwordsignup = req.param("password");
	var emailsignup = req.param("email");
	mysql.fetchData(function(error, results)
			{
		
		if(error){
			throw error;
		}
		else
			{
			
			if(results.insertId > 0)
				{
				
				console.log("user created");
				res.send({"user":"created"});
				}
			else
				{
				
				console.log("Unable to create user");
				res.send({"user":"not_created"});
				}
			}
		
			},firstNameSignup,lastNameSignup,passwordsignup,emailsignup);
	
			
};


function successLogin(req,res)
{
	ejs.renderFile('./views/profileBuild.ejs',function(err, result) {
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



function logout(req, res){
	var lastlogin= req.session.date;
	var email = req.session.email;
	var getHeadQuery= "update signup set last_login= \'"+lastlogin+"\' where email=\'"+email+"\' ";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.affectedRows> 0){
				
				res.send({"status":"logout"});
							}
			else{
				res.send({"status":"not_logout"});
			}
		}
	},getHeadQuery);
	
};


function successLogout(req,res)
{
	ejs.renderFile('./views/index.ejs',function(err, result) {
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








function failLogin(req,res)
{
	ejs.renderFile('./views/index.ejs',function(err, result) {
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


exports.signin = signin;
exports.signup = signup;
exports.successLogin=successLogin;
exports.failLogin=failLogin;
exports.logout=logout;
exports.successLogout=successLogout;