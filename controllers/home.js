var crypto = require('crypto');

function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

var mongoose = require('mongoose');
require('../models/user');
var userModel = mongoose.model('User');

module.exports = {
	index: function(req, res){
		if (req.session.username){
			res.render('timer', {username: req.session.username});
		} else {
			res.render('main');
		}
	},
	login: function(req, res){
		res.render('loginform');
	},
	loginProcess: function(req, res){
		if (req.body.username && req.body.password) {

			instance = userModel.findOne({username: req.body.username}, 'username password', function(err, user){

				if (err) {
					res.render('loginform', {lastUsername: req.body.username, error: 'Wrong'});
				}

				if (user.password == md5(req.body.password)) {
					req.session.username = req.body.username;
					res.redirect('/');
				} else {
					res.render('loginform', {lastUsername: req.body.username, error: 'Incorrect Password'});
				}

			})

		} else {
			res.render('loginform', {lastUsername: req.body.username, error: 'Invalid Username or Password'});
		}
	},
	logout: function(req, res){
		req.session.username = null;
		res.redirect('/');
	},
	about: function(req, res){
		res.render('about', {username: req.session.username});
	},
	register: function(req, res){
		res.render('registerform')
	},
	registerProcess: function(req, res){
		if (req.body.username && req.body.password && req.body.password_again && req.body.email) {

			if (req.body.password == req.body.password_again) {

				userdata = {
					username: req.body.username,
					password: md5(req.body.password),
					email: req.body.email
				}

				userModel.create(userdata)

				req.session.username = req.body.username;

				res.redirect('/');

			} else {
				res.render('registerform', {error: 'Password does not match'});
			}
		} else {
			res.render('registerform', {error: 'Invalid Username or Password or Email'});
		}
	}
};
