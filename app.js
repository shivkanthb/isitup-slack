var request = require('request');

var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req,res){

	res.json({msg:"hello"});
});

//example
// request.get({url:"http://isitup.org/duckduckgo.com.json", headers: headers},function(err,response,body){
// something happens here
// }

app.post('/isup', function(req,res){

var command = req.body.command;
var token = req.body.token;
var text = req.body.text;


if(token != 'FrJMYMpw5AjUU5xHefW5g1Fa')
res.send('The token for the slash command doesn\'t match. Check your script.');
else
{

	var headers = { 
    'User-Agent': 'Isitup-Slack/1.0 (https://github.com/shivkanthb/isitup-slack; shivkanthb@gmail.com)'
		};

	var url_to_check = 'http://isitup.org/'+text+'.json';

	request.get({url:url_to_check, headers: headers}, function(err,response,body){

		var body = JSON.parse(body);

		if(body.status_code == 1)
		{
			var reply = "Yay. *<http://"+text+"|"+text+">* is up :thumbsup:";
			res.send(reply);
		}
		else if(body.status_code == 2)
		{
			var reply =  "I am sorry to report that *<"+text+">* is *down*! :disappointed:";
			res.send(reply);
		}
		else if(body.status_code == 3)
		{
			var reply =  "*"+text+"* does not appear to be a valid domain. Please enter both the domain name AND the suffix (example: *amazon.com* or *whitehouse.gov*). :interrobang:";
			res.send(reply);
		}
		else
		{
			res.send("Something went wrong. Try after sometime.");
		}
		//console.log(body.response_code);
	});
	
}
//res.send("PODS");
//res.status(200).json({text:"YO "+command+" "+text});
});


app.listen(port, function(){
console.log('port: '+port);
});