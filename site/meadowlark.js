var express= require('express');
var app=express();
var handlebars= require('express3-handlebars').create({defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//modifying the view

var fortunes=[ "Conquer your fear","Blah Blah","Blahhhhh"];

// For sending data directly to client without any changes
// Includes static elements like logo for the website
app.use(express.static(__dirname+'/public'));


//setting port 3000 for establishing server
app.set('port',process.env.PORT||3000);


app.get('/',function(req,res){
	res.render('home');
});


//sending fortune along using handlebars

app.get('/about',function(req,res){
	var randfortune=fortunes[Math.floor(Math.random()*fortunes.length)];

	res.render('about',{fortune: randfortune});
});

app.get('/about/sam',function(req,res){
	res.type('text/plain');
	res.send('Hey , Im sam');
});

//custom 404 page
app.use(function(req,res,next){
	res.type('text/plain');
	res.status(404);
	res.render('404');
});

//custom 500 page

app.use(function(req,res){
	res.type('text/plain');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:3000'
	+ app.get('port')+';press ctrl-C to exit');
});
