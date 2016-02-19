var express = require('express');
var router = express.Router();

/* GET home */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world test */
router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello World' });
});

/* GET userlist */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET load new user form */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to process form */
router.post('/adduser', function(req, res) {

    // connect to db
    var db = req.db;

    // get form info. gets values based on 'name' attribute of inputs
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // get the table
    var collection = db.get('usercollection');

    // insert new data into db (hint: looks like the console command for mongo)
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // fail message
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // on success
            res.redirect("userlist");
        }
    });
});
module.exports = router;
