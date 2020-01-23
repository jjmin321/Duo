// /api/users/sign-in

const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : 'qwerz123',
  port : '3306',
  database : 'duo'
});
connection.connect();

//로그인
exports.User = function(req, res){
var user_info = {
  id : req.query.id,  
  pw : req.query.pw   
};
connection.query("SELECT * FROM users where id = '"+user_info.id+"' AND pw = '"+user_info.pw+"';", function(err, rows, fields) {
  //token 코드 알려주는 코드 
  //iat: issued at(토큰이 발급된 시간을 알려줌)
  if (rows[0] !== undefined){
      console.log('The solution is: ', rows[0].id); //id 출력
      const token = jwt.sign( user_info , 'my_secret_key');
      res.cookie("It's jwt!", token);
      console.log("jwt used : ", token);
      res.status(200).json({
        token:token,
        status : 200,
        message : 'OK'
      })
      console.log('로그인 완료');
   }else{
    res.status(400).json({
      status : 400,
      message : '아이디나 비밀번호가 잘못되었습니다.'
    })
  }
});
};
//로그인 