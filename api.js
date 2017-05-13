var bodyparser = require('body-parser');
var express = require('express');
var _ = require('underscore');

module.exports = function (wagner) {
var api = express.Router();
console.log(api);
api.use(bodyparser.json());

api.get('/started',function(req,res){
    return res.
      status(200).
      json({ data: 'succesfully proccssed' }); 
});

api.get('/graduatedata', wagner.invoke(function(Graduate){
	
	return function (req,res) {
		return res.
		  status(200).
		  json({ data: Graduate });
	};	
}));

return api;
};