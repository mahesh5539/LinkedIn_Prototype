var mysql = require('mysql');
var crypto = require('crypto');
var hash = function (pass, salt) {
    var h = crypto.createHash('sha512');

    h.update(pass);
    h.update(salt);

    return h.digest('base64');
};


var p_stack = [];
var queueforwaiting = [];
var poolMaxsize = 1000; 
var starts = 0;

for(var i = 0; i < poolMaxsize; i++){
	var conn = getConnection();
	p_stack.push(conn);
}

function getConnection(){
	var connection = mysql.createConnection({
		host     : 'localhost',
	    user     : 'root',
	    password : '',
	    database : 'linkedintab'
	});
	return connection;
}

function getConnectionFromPool(){
	var conn = p_stack.pop();
	return conn;
}

function releaseConnection(conn){
	p_stack.push(conn);
}



function fetchData(callback, firstNameSignup, lastNameSignup, password, emaild){
	var connection = getConnectionFromPool();	
	var newHash = hash(password, emaild);
	console.log("The encrypted password is "+ newHash );
	var strquery = "insert into signup(first_name, last_name, email, user_password) VALUES('"+firstNameSignup +"','"+lastNameSignup+"','"+emaild+"','"+newHash+"')";
	console.log("Query in fetch is"+strquery)
	conn.query(strquery, function(error, results){
		if(error){
			console.log("We are in fetchdata error!!");
			throw error;
		}
		else
			{
			console.log("the value of results is "+results.insertId);
			callback(error, results);
			
			}
	});
	
}


function getUser(callback, stringquery, passwordsignin, emailsignin){
	var connection = getConnectionFromPool();	
		conn.query(stringquery, function(error, rows,fields){
			if(error){
				console.log("We are in error");
				throw error;
			}
			if(rows.length ==0){
				
				callback(null);
			}
			else{
				var newhash = hash(passwordsignin,emailsignin);
				console.log("New hash for password is "+ newhash);
				var row = rows[0];
				if(row.user_password===newhash){
					callback(error,rows);
				}
				else
					{
					callback(null);
					}
			
			  }
		
});
}


function putUser(callback,editquery){
	
	var connection = getConnectionFromPool();	
		
		conn.query(editquery, function(error, Results){
			
			if(error){
				
				console.log("We are in putUser error!!");
				throw error;
			}
			else
				{
				console.log("Results of putUser is "+Results.changedRows);
				callback(error, Results );
				
				}
	
	});
	}
	
function getprofileH1(callback, getHeadQuery){
var connection = getConnectionFromPool();	
		console.log("Inside getprofileH1");
		conn.query(getHeadQuery, function(error,Results){
		if(error){
			throw error;
		}	
		else{
			callback(error, Results);
		}
		});
}



function putSummary(callback,editquery){
	
	var connection = getConnectionFromPool();	
		
		conn.query(editquery, function(error, Results){
			
			if(error){
				
				console.log("We are in putSummary error!!");
				throw error;
			}
			else
				{
				console.log("Results of putSummary is "+Results.changedRows);
				callback(error, Results );
				
				}
		});
	}
	
function getproSummary(callback, getHeadQuery){
var connection = getConnectionFromPool();	
		console.log("Inside getproSummary");
		conn.query(getHeadQuery, function(error,Results){
		if(error){
			throw error;
		}	
		else{
			callback(error, Results);
		}
		});
}




function putEducation(callback,editquery){
	var connection = getConnectionFromPool();	
	
		
		conn.query(editquery, function(error, Results){
			
			if(error){
				
				console.log("We are in put Education error!!");
				throw error;
			}
			else
				{
				console.log("Results of putSummary is "+Results.changedRows);
				callback(error, Results );
				
				}
		});
	}
	
function getproEducation(callback, getHeadQuery){
var connection = getConnectionFromPool();	
		console.log("Inside get Education mysql");
		conn.query(getHeadQuery, function(error,Results){
		if(error){
			throw error;
		}	
		else{
			callback(error, Results);
		}
		});
}

			

exports.fetchData=fetchData;
exports.getUser=getUser;
exports.putUser=putUser;
exports.getprofileH1=getprofileH1;
exports.putSummary=putSummary;
exports.getproSummary=getproSummary;
exports.putEducation=putEducation;
exports.getproEducation=getproEducation;