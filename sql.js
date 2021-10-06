const express=require('express');
var mysql=require('mysql');
const bodyparser=require('body-parser');
const app=express();
const port=3000;

app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'sample',
    password: 'SmartWork@123',
    database: 'mysql'
  });

con.connect((err)=>{
    if(err) 
        throw err;
    console.log('connected');
});


app.get('/',(req,res)=>{
var sql='select * from Student';
    con.query(sql,(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            console.log('Success Show Student table')
        }else{
            
            throw err;
                }
    });
});

app.get('/:id',(req,res)=>{
    con.query('select * from Student where id=?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            console.log("Search Successfully");
        }else{
            console.log(err);
                }
    });
});

app.delete('/delete/:id',(req,res)=>{
    con.query('Delete from Student where id=?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send('Deleted Successfully');
            console.log('deleted recods');
        }else{
            console.log(err);
                }
    });
});


app.post('/submit',(req,res)=>{

    var add ="insert into Student values(null,'"+req.body.Name+"','"+req.body.gender+"',"+req.body.age+",'"+req.body.s_address+"')";
    con.query(add,(err,rows,fields)=>{
        if(!err){
            res.send(rows);
                console.log('Record insert!!');
        }
        else{
           console.log(err);
        }
    });
});

app.put('/update/:id',(req,res)=>{

    var sql1 = "UPDATE Student set Name ='"+req.body.Name+"' , gender='"+req.body.gender+"',age='"+req.body.age+"',s_address='"+req.body.s_address+"' WHERE id = ?";
 
con.query(sql1,[req.params.id],(err,rows,fields)=> {
    res.send(rows);
    console.log("Record Updated!!");
});
});

app.listen(port,()=>{
    console.log(`Running Sucessfully localhost${port}`);
})