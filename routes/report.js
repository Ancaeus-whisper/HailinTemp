var express = require('express');
var router = express.Router();
var cookie=require('cookie-parser'); //cookie中间件
var session=require('express-session');//session中间件
var db=require('./dataBase');

router.get('/report_send',function(req,res)
{
    db.InsertEPMReport(req.query.Experiment,req.query.Name,req.query.Address,req.query.Purpose,req.query.Equipment,req.query.Tenet,
        req.query.Flow,req.query.Problem,req.query.Evaluate,function(err,data)
    {
          if(err) res.send(400,err.message);
          else res.send(200,"提交成功");
    });
})

router.get('/',function(req,res)
{
    res.render('report');
})

module.exports = router;