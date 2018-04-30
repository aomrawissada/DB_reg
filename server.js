var mysql = require('mysql');
var express = require('express')
var app = express()

var pool = mysql.createPool({
    connectionLimit: 10, // default = 10
    host: 'localhost',
    user: 'root',
    password: 'jinny1024', // aomam16101986
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

app.get('/updateGrade/:csid/:ccid/:semes1/:semes2/:cgrade', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;
        const csid = req.params.csid;
		const ccid = req.params.ccid;
		//const semes1 = req.params.semes1;
		//const semes2 = req.params.semes2;
		const semes = "'"+req.params.semes1+"/"+req.params.semes2+"'";
        const cgrade = req.params.cgrade;
        con.query("UPDATE grade SET grade.Grade=" + cgrade + " WHERE grade.SID=" + csid + " AND grade.CID="+ccid+ " AND grade.Semester="+semes, function (err, result, fields) {
            con.release();

            if (err) throw err;
            res.send(result);
            res.end();
        });
    });
})

app.get('/removeClass/:csid/:ccid/:semes1/:semes2', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;
        const csid = req.params.csid;
		const ccid = req.params.ccid;
		const semes = "'"+req.params.semes1+"/"+req.params.semes2+"'";
		con.query("DELETE FROM grade WHERE grade.SID=" + csid + " AND grade.CID="+ccid+ " AND grade.Semester="+semes, function (err, result, fields) {
            con.release();

            if (err) throw err;
            res.send(result);
            res.end();
        });
    });
})

app.get('/withdraw1/:csid/:ccid/:semes1/:semes2', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;
        const csid = req.params.csid;
		const ccid = req.params.ccid;
		const semes = "'"+req.params.semes1+"/"+req.params.semes2+"'";
        con.query("UPDATE grade SET grade.WFlag=true WHERE grade.SID=" + csid + " AND grade.CID="+ccid+ " AND grade.Semester="+semes, function (err, result, fields) {
            con.release();

            if (err) throw err;
            res.send(result);
            res.end();
        });
    });
})

app.get('/withdraw2/:csid/:ccid/:semes1/:semes2', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;
        const csid = req.params.csid;
		const ccid = req.params.ccid;
		const semes = "'"+req.params.semes1+"/"+req.params.semes2+"'";
		con.query("DELETE FROM enroll WHERE enroll.SID=" + csid + " AND enroll.CID="+ccid+ " AND enroll.Semester="+semes, function (err, result, fields) {
            con.release();

            if (err) throw err;
            res.send(result);
            res.end();
        });
    });
})

app.get('/addClass1/:csid/:ccid/:semes1/:semes2/:sect', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;
        const csid = req.params.csid;
		const ccid = req.params.ccid;
		const semes = "'"+req.params.semes1+"/"+req.params.semes2+"'";
		const sect = req.params.sect;
        con.query("INSERT INTO enroll VALUES (" + csid + ", "+ccid+ ", "+semes+", "+sect+");", function (err, result, fields) {
            con.release();

            if (err) throw err;
            res.send(result);
            res.end();
        });
    });
})
app.get('/addClass2/:csid/:ccid/:semes1/:semes2/:sect', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;
        const csid = req.params.csid;
		const ccid = req.params.ccid;
		const semes = "'"+req.params.semes1+"/"+req.params.semes2+"'";
		const sect = req.params.sect;
        con.query("INSERT INTO grade VALUES (" + csid + ", "+ccid+ ", "+semes+", NULL, false);", function (err, result, fields) {
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

app.get('/insert*/:statement', function (req, res) {
    pool.getConnection(function (err, con) {
        if (err) throw err;
        const db = req.url.substring(7, req.url.length);
        const index = db.indexOf("/");
        const dbname = db.substring(0, index);
        const statement = req.params.statement.split("_")
        var queryStr = ""
        for (i in statement) {
            if (i == 0) {
                queryStr += " " + statement[i]

            }
            else {
                queryStr += " " + statement[i]
            }
        }
        con.query("insert into " + dbname + queryStr, function (err, result, fields) {
            con.release();

            if (err) throw err;
            console.log(result);
            res.send(queryStr);
            res.end();
        });
    });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))



