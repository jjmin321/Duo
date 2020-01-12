var express = require('express');
var app = express();
var port = 3000;
var login = require('./routes/login.js')
// 실험을 위한 코드
//routes 안에 있어야 함. 
var mysql = require('mysql');
var jwt = require("jsonwebtoken");

//데이터베이스
var connection = mysql.createConnection({
    // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerz123'
    host : '127.0.0.1',
    user : 'root',
    password : 'qwerz123',
    port : '3306',
    database : 'duo'
});
connection.connect();
var user_info = {
  'id':'jjmin321',
  'pw':'qwerz123',
};
var user_false = {
  'id':'jjmin333',
  'pw':'qwerz123',
};
console.log(user_info.id)
//primary key 인 유저의 id가 디비에 존재하는지를 확인하는 코드
connection.query("SELECT * FROM users where id = '"+user_info.id+"';", function(err, rows, fields) {
    if (!err){
      if (rows[0].id === user_info.id && rows[0].pw === user_info.pw) //아이디랑 비번이 일치하면 jwt 토큰을 줌
        console.log('The solution is: ', rows[0].id);
    }
    else
    console.log('Error while performing Query.', err);
connection.end();
});

//jwt
app.get("/login", function(req,res){
    res.send("Hello JWT");
    //토큰 내용
    var token = jwt.sign({
        id: "jjmin321"   // 토큰의 내용(payload)
    },
    login.secret ,    // 비밀 키
    {
        expiresIn: '5m'    // 유효 시간은 5분
    })
    //토큰 내용
});
// 실험을 위한 코드
app.listen(port, () => console.log(`Example app listening on port ${port}!`));