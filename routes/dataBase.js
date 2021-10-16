var mysql  = require('mysql');

var connection = mysql.createConnection({     
    host     : 'rm-wz98d7b053w33rb7zao.mysql.rds.aliyuncs.com',       
    user     : 'hailin',              
    password : 'Hailin2887',       
    port: '3306',                   
    database: 'hailin' 
  }); 
 
 
  connection.connect();

  /*
接口说明：除了Insert外，其他接口都是对所有数据库通用的
*/

function Modify(db,Id,Variable,Value,callback){
    //var modifySqlParams=[Variable,Id,Value];
    console.log('UPDATE `'+db+'` SET `'+Variable+'` = \''+Value+'\' WHERE `Id`=' +Id.toString());
    connection.query('UPDATE `'+db+'` SET `'+Variable+'` = \''+Value+'\' WHERE `Id`=' +Id.toString(),function (err, result) {
     if(err){
      console.log('[MODIFY ERROR] - ',err.message);
      callback(err,result);
     }
     else callback(null,result);        
  })
  }
  
  function Search(db,Variable,Name,callback){
     if(Name=="*")
     {
        connection.query('SELECT * FROM `'+db+'`',function (err, result) {
           if(err){
            console.log('[SEARCH ERROR] - ',err.message);
            callback(err,result);
           }
              else callback(null,result);

        })
     }
     else connection.query('SELECT * FROM `'+db+'` WHERE `'+Variable+'` = \''+Name+'\'',function (err, result) {
     if(err){ 
      console.log('[SEARCH ERROR] - ',err.message);
      callback(err,result);
     }   
     else callback(null,result);
  })
  }
  
  function Delete(db,Id,callback)
  {
     var deleteSqlParams=Id.toString();
     connection.query('DELETE FROM `'+db+'` where `Id`='+deleteSqlParams,function (err, result) {
         if(err){
          console.log('[DELETE ERROR] - ',err.message);
          callback(err,result);
         }
         callback(null,result);    
     })
  }

  function InsertUserData(Id,Name,Sex,Email,IdCard,Telephone,Password,callback)
  {
    var  addSqlParams = [Id,Name,Sex,Email,IdCard,Telephone,Password];
    connection.query('INSERT INTO `userdata` (`Id`,`Name`,`Sex`,`Email`,`IdCard`,`Telephone`,`Password`) VALUES(?,?,?,?,?,?,?)',addSqlParams,function (err, result) {
         if(err){ 
          console.log('[INSERT ERROR] - ',err.message);
          callback(err,result);
         }
         else callback(null,result);        
     })
  }

  function InsertSiteData(Id,Name,Address,Status)
  {
    var  addSqlParams = [Id,Name,Address,Status];
    connection.query('INSERT INTO `sitedata` (`Id`,`Name`,`Address`,`Status`) VALUES(?,?,?,?)',addSqlParams,function (err, result) {
         if(err){ 
          console.log('[INSERT ERROR] - ',err.message);
          return;
         }
         return result;        
     })
  }

  function InsertFeedBacks(Id,Name,Content,callback)
  {
    var  addSqlParams = [Id,Name,Content];
    connection.query('INSERT INTO `feedbacks` (`Id`,`Name`,`Content`) VALUES(?,?,?)',addSqlParams,function (err, result) {
         if(err){ 
          console.log('[INSERT ERROR] - ',err.message);
          callback(err,result);
         }
         callback(null,result);      
     })
  }

  function InsertEQMData(Pic,Name,Mentor,Experiment,Equipment,Remark,NormalPrice,VIPPrice,callback)
  {
    var  addSqlParams = [Pic,Name,Mentor,Experiment,Equipment,Remark,NormalPrice,VIPPrice];
    connection.query('INSERT INTO `eqmdata` (`Pic`,`Name`,`Mentor`,`Experiment`,`Equipment`,`Remark`,`NormalPrice`,`VIPPrice`) VALUES(?,?,?,?,?,?,?,?)',addSqlParams,function (err, result) {
         if(err){ 
          console.log('[INSERT ERROR] - ',err.message);
          callback(err,result);
         }
         callback(null,result);        
     })
  }

  function InsertEQMCatalog(Name,NumberLoaned,Ruined)
  {
    var  addSqlParams = [Name,NumberLoaned,Ruined];
    connection.query('INSERT INTO `eqmcatalog` (`Name`,`NumberLoaned`,`Ruined`) VALUES(?,?,?)',addSqlParams,function (err, result) {
         if(err){ 
          console.log('[INSERT ERROR] - ',err.message);
          return;
         }
         return result;        
     })
  }

  function InsertEPMReport(Experiment,Name,Address,Purpose,Equipment,Tenet,Flow,Problem,Evaluate,callback)
  {
    var  addSqlParams = [Experiment,Name,Address,Purpose,Equipment,Tenet,Flow,Problem,Evaluate];
    connection.query('INSERT INTO `epmreport` (`Experiment`,`Name`,`Address`,`Purpose`,`Equipment`,`Tenet`,`Flow`,`Problem`,`Evaluate`) VALUES(?,?,?,?,?,?,?,?,?)',addSqlParams,function (err, result) {
         if(err){ 
          console.log('[INSERT ERROR] - ',err.message);
          callback(err,result)
         }
         else callback(null,result);        
     })
  }

  function InsertEPMData(Id,Name,Teacher,Unit,Address,Date,Number,Status)
  {
    var  addSqlParams = [Experiment,Name,Address,Purpose,Equipment,Tenet,Flow,Problem,Evaluate];
    connection.query('INSERT INTO `epmreport` (`Experiment`,`Name`,`Address`,`Purpose`,`Equipment`,`Tenet`,`Flow`,`Problem`,`Evaluate`) VALUES(?,?,?,?,?,?,?,?,?)',addSqlParams,function (err, result) {
         if(err){ 
          console.log('[INSERT ERROR] - ',err.message);
          callback(err,result)
         }
         else callback(null,result);       
     })
  }

  function InsertVideoData(Pic,Title,URL,callback)
  {
    var  addSqlParams = [Pic,Title,URL];
    connection.query('INSERT INTO `videodata` (`Pic`,`Title`,`URL`) VALUES(?,?,?)',addSqlParams,function (err, result) {
         if(err){ 
          console.log('[INSERT ERROR] - ',err.message);
          callback(err,result);
         }
         callback(null,result);        
     })
  }

  function InsertRecordData(Pic,Name,Mentor,StartTime,EndTime,Status,callback)
  {
    var  addSqlParams = [Pic,Name,Mentor,StartTime,EndTime,Status];
    connection.query('INSERT INTO `videodata` (`Pic`,`Name`,`Mentor`,`StartTime`,`EndTime`,`Status`) VALUES(?,?,?,?,?,?)',addSqlParams,function (err, result) {
         if(err){ 
          console.log('[INSERT ERROR] - ',err.message);
          callback(err,result);
         }
         callback(null,result);        
     })
  }

  exports.Search=Search;
  exports.Modify=Modify;
  exports.Delete=Delete;
  exports.InsertUserData=InsertUserData;
  exports.InsertSiteData=InsertSiteData;
  exports.InsertFeedBacks=InsertFeedBacks;
  exports.InsertEQMData=InsertEQMData;
  exports.InsertEQMCatalog=InsertEQMCatalog;
  exports.InsertEPMReport=InsertEPMReport;
  exports.InsertEPMData=InsertEPMData;
  exports.InsertVideoData=InsertVideoData;
  exports.InsertRecordData=InsertRecordData;
