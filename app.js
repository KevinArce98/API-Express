const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/appNode');

const User = require('./models/User');
const Role = require('./models/Role');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Routes Users */

app.get('/api/users', (req, res) => {
    User.find(function(err, users){
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
});

app.post('/api/users', (req, res) => {
    var user = new User();
    
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.role = req.body.role;
    user.save(function(err){
        if(err) {
            res.send(err);
        }
        res.status(201);
        res.json(user);
    });
});

app.patch('/api/users/:id', (req, res) => {
   	User.findById(req.params.id,function(err, user){
        if(err) {
            res.send(err);
        }
	    user.name = req.body.name;
	    user.lastname = req.body.lastname;
	    user.email = req.body.email;
	    user.role = req.body.role;
	    user.save(function(err){
	        if(err) {
	            res.send(err);
	        }
	        res.status(201);
	        res.json(user);
	    });
    });
});

app.delete('/api/users/:id', (req, res) => {
   	User.remove({ _id: req.params.id },function(err, user){
        if(err) {
            res.send(err);
        }
	    res.json({ message: "Deleted"});
    });
});


/*  Routes roles*/

app.get('/api/roles', (req, res) => {
    Role.find(function(err, roles){
        if(err) {
            res.send(err);
        }
        res.json(roles);
    });
});

app.post('/api/roles', (req, res) => {
    var role = new Role();
    
    role.name = req.body.name;
    role.type = req.body.type;
    role.save(function(err){
        if(err) {
            res.send(err);
        }
        res.status(201);
        res.json(role);
    });
});

app.patch('/api/roles/:id', (req, res) => {
    Role.findById(req.params.id,function(err, role){
        if(err) {
            res.send(err);
        }
        role.name = req.body.name;
        role.type = req.body.type;
        role.save(function(err){
            if(err) {
                res.send(err);
            }
            res.status(201);
            res.json(role);
        });
    });
});

app.delete('/api/roles/:id', (req, res) => {
    Role.remove({ _id: req.params.id },function(err, role){
        if(err) {
            res.send(err);
        }
	    res.json({ message: "Role Deleted"});
    });
});
// handle 404
app.use(function(req, res, next){
    res.status(404);
    res.send({ error: 'Not found' });
    return;
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));