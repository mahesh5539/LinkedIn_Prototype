exports.signin = function(req, res){
	console.log("You are succesfully logged in!!");
	var email=req.param("emailid");
	var password=req.param("password");
	console.log("The email id is "+email);
	
	if(isNaN(email)===true)
	{console.log("in true block!!");
		res.send(""+email);
	}
	else
		{
		console.log("Login Failed");
		
		}
	
	};

/*exports.signup = function(req, res){
		console.log("You are signed up!!");
		var firstName = req.param("firstName");
		var lastName= req.param("lastName");
		var email=req.param("email");
		var password=req.param("password");
		console.log("The profile includes "+firstName+", "+lastName+", "+email);
		
		if(isNaN(email)!==true)
		{console.log("in true block!!");
			res.send(""+firstName);
		}
		else
			{
			console.log("Login Failed");
			
			}
		
		};
*/
