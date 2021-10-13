var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser'); //cookie中间件
var session = require('express-session'); //session中间件
var db = require('./dataBase');



router.get('/forget_confirm', function(req, res) {
    db.Search("userdata", "Name", req.query.username, function(err, data) {
        if (data == null) {
            res.send(400, { error: "用户不存在" });
            return;
        }
        if (req.query.username.toString() != data[0].Name) //验证用户名
        {
            res.send(400, { error: "用户名错误" });
            return;
        }
        if (req.query.telephone.toString() != data[0].Telephone) //验证邮箱
        {
            res.send(400, { error: "手机号错误" });
            return;
        }
        if (req.query.IdCard.toString() != data[0].IdCard) //验证邮箱
        {
            res.send(400, { error: "手机号错误" });
            return;
        }
        //var pwd=req.query.pwd;
        //console.log(pwd);
        db.Modify("userdata", data[0].Id, "Password", req.query.password, function(err, data) {
            if (err) res.send(400, err.message);
            else res.send(200, { message: "修改成功！" });
        });

    });
});

router.get('/vcode', function(req, res) {

    //todo:发送手机验证码
});

router.get('/', function(req, res) {
    res.render('forget_password');
});

module.exports = router;