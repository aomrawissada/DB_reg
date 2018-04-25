var mysql = require('mysql');
var express = require('express')
var app = express()

var pool = mysql.createPool({
    connectionLimit: 10, // default = 10
    host: 'localhost',
    user: 'root',
    password: 'jinny1024',
    database: 'registra'
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/getQuery*/:query', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;
        const db = req.url.substring(9, req.url.indexOf("/", 1));
        const query = req.params.query;
        con.query("SELECT * FROM " + db + " where " + (query), function (err, result, fields) {
            con.release();

            if (err) throw err;
            res.send(result);
            res.end();
        });
    });
})

app.get('/getAll*', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;
        const db = req.url.substring(7, req.url.length);
        con.query("SELECT * FROM " + db, function (err, result, fields) {
            con.release();
            if (err) throw err;
            console.log(result);
            res.send(result);
            res.end();
        });
    });
})

app.get('/login/:username/:password', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;

        const user = req.params.username;
        const password = req.params.password
        con.query("SELECT * FROM student where sid=" + user, function (err, result, fields) {
            con.release();

            if (err) throw err;
            if (password == result[0].Password) {
                res.send("success");
            } else {
                res.send("fail");
            }
            res.end();
        });
    });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))



