var mysql = require("./mysql");
var ejs = require("ejs");


function getEmailid(req, res){
	console.log("We are in signin");
	  var emailForMember =req.param("emailid");
	  console.log("The value of emailForMember"+emailForMember);
	var getHeadQuery= "select first_name, last_name from signup where email =\'"+emailForMember+"\'";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results){
				
				res.send(Results);
			}
			else{
				res.send({"member":"absent"});
			}
		}
	},getHeadQuery);
};


function display(req,res){
	console.log("We are in signin");
	  var emailForMember =req.param("emailid");
	  console.log("Email id of member is "+emailForMember);
	var getHeadQuery= "select first_name, last_name, company_name, title, city, state from signup,profile where signup.email=profile.email_id and signup.email =\'"+emailForMember+"\'";
	console.log(getHeadQuery);
	mysql.getproEducation( function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.length > 0){
				console.log(Results);
				res.send(Results);
				console.log("after the result print");
			}
			else{
				res.send({"user":"validated"});
			}
		}
	},getHeadQuery);
	
};


function successGet(req,res)
{
	ejs.renderFile('./views/searchResult.ejs',function(err, result) {
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

function failGet(req,res)
{
	ejs.renderFile('./views/profileBuild.ejs',function(err, result) {
        // render on success
        if (!err) {
        	alert("Member not found!!!");
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};








exports.getEmailid=getEmailid;
exports.successGet=successGet;
exports.failGet=failGet;
exports.display=display;
