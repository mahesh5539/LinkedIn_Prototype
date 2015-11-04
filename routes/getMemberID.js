/*var searchMembers = require('./searchMembers');
var mysql=require('./mysql');


function desplayMember(req, res){
	searchMembers.getMember(function(error, emailMember){
		if(error){
			throw error;
		}
		else{
			var memberid = emailMember;
			var getHeadQuery="select first_name, last_name, company_name, title, city, state from signup, profile where signup.email= profile.email_id and signup.email =\'"+memberid+"\'";
			mysql.getprofileH1(function(error, Results){
				if(error){
					throw error;
				}
				else{
					
					console.log("Before result");
					console.log(Results);
					res.send(Results);
					console.log("After result");
										
				}
			},getHeadQuery);
		}
	})
	
}











exports.getSearchedMember=getSearchedMember;
exports.desplayMember=desplayMember;*/