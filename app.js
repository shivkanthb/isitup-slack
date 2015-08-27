var request = require('request');

var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req,res){

	var headers = { 
    'User-Agent': 'IsitupForSlack/1.0 (https://github.com/mccreath/istiupforslack; mccreath@gmail.com)'
};
	request.get({url:"http://isitup.org/duckduckgo.com.json", headers: headers},function(err,response,body){

		//console.log(response);
		//console.log('SAPPI');
		var body = JSON.parse(body);
		console.log(body.response_code);
	});

});


app.post('/isup', function(req,res){

var command = req.body.command;
var token = req.body.token;
var text = req.body.text;
res.send("PODS");
//res.status(200).json({text:"YO "+command+" "+text});
});


app.listen(port, function(){
console.log('port: '+port);
});