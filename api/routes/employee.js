 const express = require('express');
 const router = express.Router();
 const url = require('url');

 //retrieve details from employee
router.get('/getEmployeeDetails',(req, res,next)=> {
try{
    var query = url.parse(req.url, true).query;
    var roleId = query.roleid;
    var deptId = query.deptid;
console.log( roleId);
console.log(deptId);
req.getConnection(function(err, conn){
if(err){
console.error('SQL Connection error :', err);
return next(err);
}else{
conn.query('select E.emp_name,D.dept_name, R.role_name from employee E, roles R, department D where E.role_id = R.role_id and E.dept_id = D.dept_id and E.role_id = ? and E.dept_id = ? order by doj', [roleId, deptId], function(err, rows, fields){
if(err){
    console.error('SQL QUERY FIRE ERROR:', err);
    return next(err);
}
 //if user not found
 if(rows.length < 1){
 return res.json({
    message:"No employee details found"
 });
 }
 else{
var resEmp = [];
for(var empIndex in rows){
    var empObj = rows[empIndex];
    resEmp.push(empObj);
}
res.json(resEmp);
}

});
}
});
}catch(ex){
    console.error("Internal error :" +ex);
    return next(ex);
}

 });

 //INSERT DETAILS for Employee
 router.post('/createNewEmployee',(req, res, next)=>{
try{
   
//validation
req.assert('empname','employee Name is required').notEmpty();
req.assert('roleid','A valid roleid is required').notEmpty();
req.assert('deptid','A valid deptid is required').notEmpty();
req.assert('roleid','please enter Integer value only').isInt();
req.assert('deptid','please enter Integer value only').isInt();

var errors = req.validationErrors();
if(errors){
    res.status(422).json(errors);
    return;
}

var reqObj = req.body;
console.log(reqObj);
    req.getConnection(function(err, conn){
    if(err){
    console.error('SQL Connection Error',err);
    return next(err);
    }else{
    var  insertSQL = "INSERT INTO employee SET ?";
    var insertValues = {
    "emp_name" : reqObj.empname,
    "role_id" : reqObj.roleid,
    "dept_id" : reqObj.deptid
};
var query = conn.query(insertSQL, insertValues, function(err, result){
if(err){
console.error('SQL error :',err);
return next(err);
}
console.log(result);
var employee_id = result.insertId;
res.json({"emp_id":employee_id});
});
}
    });

}catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }

 });

 //update Employee details
router.put('/updateEmployeeDetails', function(req, res, next){
try{
    
    req.assert('empname','employee Name is required').notEmpty();
    req.assert('roleid','A valid roleid is required').notEmpty();
    req.assert('roleid','please enter Integer value only').isInt();
    req.assert('deptid','A valid deptid is required').notEmpty();
    req.assert('deptid','please enter Integer value only').isInt();

    var  error = req.validationErrors();
    if(error){
        res.status(422).json(error);
        return;
    }
    var query = url.parse(req.url, true).query;
    var empId = query.empId;

    var inputData = {
        "emp_name" : req.body.empname,
        "role_id" : req.body.roleid,
        "dept_id" : req.body.deptid
    };

    //insert updated  value in employee
    req.getConnection(function(err, conn){
        if(err){
            return next('connot connect database');

        }else{
            var query = conn.query("UPDATE employee set ? where emp_id = ?",[inputData,empId],function(err, rows){
                if(err){
                    console.log(err);
                    return next("MySQL query error");
                }else{
                    res.json({
                        message:"employee detail got updated successfully",
                        id:empId
                    });
                }
            });
        }
    });

}catch(ex){
    console.error("Internal error"+ex);
    return next(ex);
}
});
//delete  record from employee

router.delete('/deleteEmployeeDetails',function(req, res, next){
    try{
    var query = url.parse(req.url, true).query;
    var empId = query.empId;
    req.getConnection(function(err, conn){
        if(err){
            return next('database not connected');
        }else{
            var query = conn.query("delete from employee where emp_id = ?",[empId], function(err, rows){
                if(err){
                    console.log(err);
                    return next('mySQL error check query please');
                }else{
                    res.json({
                        message:'record deleted successfully',
                        id:empId
                
                    });
                }
            });

        }
    });
}catch(ex){
    console.error("Internal error"+ex);
    return next(ex);
}
});


 module.exports = router;

