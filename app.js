const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = require('./models/User')
const unirest = require("unirest");
const port = 4000;

/**
 * conecta com o moongoDB
 */
mongoose.connect('mongodb+srv://bruno:bruno@user-e6s3o.mongodb.net/db?retryWrites=true&w=majority',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection
db.once('open', function() {
    console.log('Connected')
})

app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('www')); 

app.post('/registar', function (req, res) {
        var data = req.body;
        console.log(data)
        User.findOne({ email: data.email }, function (err, user) {
            if (!err && !user) {
                var newUser = new User()
                newUser.username = data.uname
                newUser.email = data.email
                newUser.password = newUser.generateHash(data.pass) 
                newUser.nome = data.nome
                newUser.save((err) => {
                    if (!err) {
                        res.redirect('/homePT.html');
                    } else {
                        res.status(500).send('Error')
                    }
                })
            } else {
                res.status(200).send(false)
            }
        })
    })

    app.get('/data/users', function(req, res) {
        console.log('Entrou')
        User.find({}, function(err, users) {
            if(!err) {
                res.send(users)
            } else {
                res.send(err);
            }
        })
    })
    
    app.post('/login', function (req, res) {
        var data = req.body;
    console.log(data)
        User.findOne({ username: data.uname }, function (err, user) {
        console.log(user)
            if (!err && user) {
                if(user.validPassword(data.pass)) {
                        res.redirect('/homePT.html');
                } else {
                    res.status(200).send(false)
                }
            } else {
                res.status(200).send(false)
            }
        })
    })
    
    app.post('/edit', function (req, res) {
        var data = req.body;
    console.log(data)
        User.findOne({ username: data.uname }, function (err, user) {
            if (!err && user) {
                user.set(data)
                user.save((err)=>{
                    if(!err) {
                            res.redirect('/utilizadoresPT.html');
                    } else {
                        res.status(200).send(false)
                    }
                })
            } else {
                res.status(200).send(false)
            }
        })
    })
    
    app.post('/delete', function (req, res) {
        var data = req.body;
        User.deleteOne({ username: data.uname }, function (err, user) {
            if (!err && user) {
                    res.redirect('/utilizadoresPT.html');
            } else {
                res.status(200).send(false)
            }
        })
    })

app.listen(port, () => console.log('http://localhost:' + port)); 