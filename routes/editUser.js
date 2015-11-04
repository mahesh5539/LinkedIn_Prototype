var mysql = require("./mysql");
var ejs = require("ejs");
function heading(req, res){
	console.log("We are in edit user...successfully!!");
	var edtname =req.param("editName");
	console.log("value of edtname"+edtname);
	var edtsurname =req.param("editSurName");
	var edtheading = req.param("editHeading");
	var edtcity = req.param("editCity");
	var edtstate = req.param("editState");
	var edtGetquery= "select first_name, last_name from signup where email ='mahesh.dhamgunde@sjsu.edu'";
	var editquery = "update signup set first_name=\'"+edtname+"\' , last_name=\'"+edtsurname+"\' where email='mahesh.dhamgunde@sjsu.edu'";
	console.log("The query is "+editquery);
	
	mysql.putUser(function(error, Results)
			{
		
		if(error){
			throw error;
				}
			
				
				else{
					if(Results.affectedRows > 0){
						res.send({"profile":"edited"});
					}
					else{
						res.send({"profile":"not_edited"});
					}
				}
				},editquery);
};

function successfulEdited(req, res){
	ejs.renderFile('./views/profileBuild.ejs',function(err, Results) {
        // render on success
        if (!err) {
            res.end(Results);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};


function getProfileHead(req, res){
	console.log("Inside getProfileHead");
	var getHeadQuery ="select first_name, last_name from signup where email='mahesh.dhamgunde@sjsu.edu'";
	mysql.getprofileH1(function(error, Results){
		if(error){
			throw error;
		}
		else{
			if(Results.length > 0){
			console.log("Before result");
			console.log(Results);
			res.send(Results);
			console.log("After result");
			}
			else
				{
				res.send("Error occured !!");
				}
		}
	},getHeadQuery);
};


exports.heading= heading;
exports.successfulEdited=successfulEdited;
exports.getProfileHead=getProfileHead;

