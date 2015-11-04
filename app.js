var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session= require('express-session');
var bodyParser = require('body-parser');
var mysql =  require('mysql');
var routes = require('./routes/index');
var calculate = require('./routes/calculate');
var createUser = require('./routes/createUser');
var editUser = require('./routes/editUser');
var summary = require('./routes/summary');
var connections = require('./routes/connections');
var searchMembers = require('./routes/searchMembers');

var users = require('./routes/users');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 8085);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'mynameiskhan',
		 resave: true,
		    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.get('/editUser/getProfileHead', editUser.getProfileHead);
app.post('/createUser/signin', createUser.signin);


app.post('/createUser/signup', createUser.signup);
app.get('/successLogin', createUser.successLogin);
app.get('/failLogin', createUser.failLogin);
app.put('/editUser/heading', editUser.heading);
app.post('/searchMembers/display', searchMembers.display);
app.get('/successfulEdited', editUser.successfulEdited);
app.put('/summary/editsum', summary.editsum);
app.get('/summary/getSummary', summary.getSummary);
app.put('/summary/editEdu', summary.editEdu);
app.get('/summary/getEdu', summary.getEdu);
app.put('/summary/editExp', summary.editExp);
app.get('/summary/getExp', summary.getExp);
app.post('/searchMembers/getEmailid', searchMembers.getEmailid);
app.post('/connections/getConnectProfile',connections.getConnectProfile);
app.post('/connections/getProfile',connections.getProfile);
app.post('/connections/sendRequest',connections.sendRequest);
app.get('/notConnected',connections.notConnected);
app.get('/connected',connections.connected);
app.get('/successGet', searchMembers.successGet);
app.get('/failGet', searchMembers.failGet);
app.get('/connections/DisplayConnection',connections.DisplayConnection);
app.get('/connections/pendingConnection',connections.pendingConnection);
app.get('/connections/connectionPage',connections.connectionPage);
app.get('/showConnections',connections.showConnections);
app.post('/connections/acceptedInvitation',connections.acceptedInvitation);
app.post('/createUser/logout', createUser.logout);
app.get('/connections/lastLog',connections.lastLog);


app.get('/successLogout', createUser.successLogout);
http.createServer(app).listen(app.get('port'), function(){
	  console.log('This is calculator and Express server listening on port ' + app.get('port'));
	});

module.exports = app;
