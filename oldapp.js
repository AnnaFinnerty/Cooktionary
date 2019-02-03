const express = require('express');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({host:'localhost',user:'root',password:'root',port:8889, database:"cooktionarytest"});
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("mysql connected");
});

app.get("/",(req,res)=>{
    res.send("connected to server");
})

app.get("/addpost1",(req,res)=>{
    let post = {title:"post 1",body:"This is post 1"}
    let sql = `insert into posts set ?`;
    let query = db.query(sql,post,(err,db_res)=>{
        if(err){
            throw err;
        }
        res.send("post1 created");
    })
})

app.get("/addpost2",(req,res)=>{
    let post = {title:"post 2",body:"This is post 2"}
    let sql = `insert into posts set ?`;
    let query = db.query(sql,post,(err,db_res)=>{
        if(err){
            throw err;
        }
        res.send("post2 created");
    })
})

app.get("/select",(req,res)=>{
    let sql = `select * from posts`;
    let query = db.query(sql,(err,db_res)=>{
        if(err){
            throw err;
        }
        console.log(db_res);
        res.send("posts fetched");
    })
})

app.get("/select/:id",(req,res)=>{
    let sql = `select * from posts where id = ${req.params.id}`;
    let query = db.query(sql,(err,db_res)=>{
        if(err){
            throw err;
        }
        console.log(db_res);
        res.send("post fetched");
    })
})

app.get("/update/:id",(req,res)=>{
    let newTitle = "Updated Title";
    let sql = `update posts set title = '${newTitle}' where id = ${req.params.id}`;
    let query = db.query(sql,(err,db_res)=>{
        if(err){
            throw err;
        }
        console.log(db_res);
        res.send("title update");
    })
})

app.get("/delete/:id",(req,res)=>{
    let sql = `delete from posts where id = ${req.params.id}`;
    let query = db.query(sql,(err,db_res)=>{
        if(err){
            throw err;
        }
        console.log(db_res);
        res.send("post deleted");
    })
})




/*

app.get("/addpost1",(req,res)=>{
    let post = {title:"post 1",body:"This is post 1"}
    let sql = `insert into posts set ?`;
    let query = db.query(sql,post,(err,db_res)=>{
        if(err){
            throw err;
        }
        res.send("post1 created");
    })
})

app.get("/createtable",(req,res)=>{
    let sql = `create table posts(id int auto_increment, title varchar(255),body varchar(255),primary key(id))`;
    let query = db.query(sql,(err,db_res)=>{
        if(err){
            throw err;
        }
        res.send("table created");
    })
})

app.get("/createdb",(req,res)=>{
    let sql = `create database cooktionarytest`;
    db.query(sql,(err,db_res)=>{
        if(err){
            throw err;
        }
        console.log(db_res);
        res.send("database created");
    })
})
*/

app.listen('3000', ()=>{console.log("server started on port 3000")});
