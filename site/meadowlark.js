var express= require('express');
var app=express();
var handlebars= require('express3-handlebars').create({defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
var path = require('path');
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views','tours')]);
//modifying the view

//fortunecookie moved to module '/lib/fortune.js'

var fortune=require('./lib/fortune.js');

// For sending data directly to client without any changes
// Includes static elements like logo for the website
app.use(express.static(__dirname+'/public'));


//setting port 3000 for establishing server
app.set('port',process.env.PORT||3000);


//For testing
// middleware to detect tes=1 in the query string
//important that it should appear before we assign any routes

app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test ==='1';
	next();
});

/////////////////////////////////////


//Routing using render (handlebars) instead of assigning type and send(express)

app.get('/',function(req,res){
	res.render('home');
});


//sending fortune cookies (Randomly) along using handlebars
// Also includes test for contact link in about page
app.get('/about',function(req,res){
	res.render('about',{fortune: fortune.getfortune(), pageTestScript: '/qa/tests-about.js'});
});

app.get('/about/sam',function(req,res){
	res.type('text/plain');
	res.send('Hey , Im sam');
});

//cross page testing
app.get('/hood-river',function(req,res){
	res.render('hood-river');
});

app.get('tours/request-group-rates',function(req,res){
	res.render('tours/request-group-rates');
});

//custom 404 page
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

//custom 500 page

app.use(function(req,res){
	res.status(500);
	res.render('500');
});



app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:3000'
	+ app.get('port')+';press ctrl-C to exit');
});
