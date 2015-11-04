var mysql = require("./mysql");
var ejs = require("ejs");



function editsum(req, res){
	console.log("We are in editsummary...successfully!!");
	console.log(req.session.member);
	var edtsummary =req.param("summaryText");
	var editquery = "update profile set summary=\'"+edtsummary+"\' where email_id ='mahesh.dhamgunde@sjsu.edu'";
	console.log("The query is "+editquery);
	
	mysql.putSummary(function(error, Results)
			{
		
		if(error){
			throw error;
				}
			
				
				else{
					if(Results.affectedRows > 0){
						res.send({"summary":"edited"});
					}
					else{
						res.send({"summary":"not_edited"});
					}
				}
				},editquery);
};


function getSummary(req, res){
	console.log("Inside getProfileHead");
	var getHeadQuery ="select summary from profile where email_id ='mahesh.dhamgunde@sjsu.edu'";
	mysql.getproSummary(function(error, Results){
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





function editEdu(req, res){
	console.log("We are in editEducation...successfully!!");
	var schoolName =req.param("school");
	var field =req.param("field");
	var grade =req.param("grade");
	var activity =req.param("activity");
	var desc =req.param("eduDescription");
	var editquery = "update profile set school_name=\'"+schoolName+"\', study_field=\'"+field+"\', grades="+grade+", activities=\'"+activity+"\', education_description=\'"+desc+"\' where email_id ='mahesh.dhamgunde@sjsu.edu'";
	console.log("The query is "+editquery);
	
	mysql.putEducation(function(error, Results)
			{
		
		if(error){
			throw error;
				}
			
				
				else{
					if(Results.affectedRows > 0){
						res.send({"education":"edited"});
					}
					else{
						res.send({"education":"not_edited"});
					}
				}
				},editquery);
};


function getEdu(req, res){
	console.log("Inside getEducation");
	var getHeadQuery ="select school_name, study_field, grades, activities, education_description from profile where email_id ='mahesh.dhamgunde@sjsu.edu'";
	mysql.getproEducation(function(error, Results){
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




function editExp(req, res){
	console.log("We are in editEducation...successfully!!");
	var company =req.param("company");
	var title =req.param("title");
	var location =req.param("location");
	var description =req.param("description");
	
	var editquery = "update profile set company_name=\'"+company+"\', title=\'"+title+"\', location='"+location+"', experience_description=\'"+description+"\' where email_id ='mahesh.dhamgunde@sjsu.edu'";
	console.log("The query is "+editquery);
	
	mysql.putEducation(function(error, Results)
			{
		
		if(error){
			throw error;
				}
			
				
				else{
					if(Results.affectedRows > 0){
						res.send({"experience":"edited"});
					}
					else{
						res.send({"experience":"not_edited"});
					}
				}
				},editquery);
};


function getExp(req, res){
	console.log("Inside getEducation");
	var getHeadQuery ="select company_name, title, location, experience_description from profile where email_id ='mahesh.dhamgunde@sjsu.edu'";
	mysql.getproEducation(function(error, Results){
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








exports.editsum=editsum;
exports.getSummary=getSummary;
exports.editEdu=editEdu;
exports.getEdu=getEdu;
exports.editExp=editExp;
exports.getExp=getExp;