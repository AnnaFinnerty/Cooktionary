const express = require('express');
const mysql = require('mysql');
const fs = require('fs');

// Create connection
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'cooktionary',
    port: 8889,
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();


// Create DB
app.get('/create_db', (req, res) => {
    let sql = 'CREATE DATABASE cooktionary';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    })
});

// Create all tables
app.get('/create_tables', (req, res) => {
    let tables = ['classifications', 'cuisines', 'forms', 'main', 'mistakens', 'names', 'similars']
    let sql
    for (let table of tables){
        switch(table){
            case "main":
                sql = `CREATE TABLE main(
                    key_id int AUTO_INCREMENT, 
                    cuisine_lookup_id int, 
                    classification_lookup_id int,
                    name_lookup_id int,
                    form_lookup_id int, 
                    color VARCHAR(255), 
                    mistaken_lookup_id int, 
                    similar_lookup_id int, 
                    id VARCHAR(255), 
                    description VARCHAR(255), 
                    PRIMARY KEY(key_id)
                )`;
                break;

            case "cuisines":
                sql = `CREATE TABLE cuisines(
                    key_id int AUTO_INCREMENT, 
                    lookup_id int, 
                    cuisine VARCHAR(255), 
                    type VARCHAR(255), 
                    dish VARCHAR(255), 
                    PRIMARY KEY(key_id)
                )`;
                break;

            case "names":
                sql = `CREATE TABLE names(
                    key_id int AUTO_INCREMENT, 
                    lookup_id int, 
                    language VARCHAR(255), 
                    name VARCHAR(255), 
                    PRIMARY KEY(key_id)
                )`;
                break;

            default:
                sql = `CREATE TABLE ${table}(
                    key_id int AUTO_INCREMENT, 
                    lookup_id int, 
                    ${table.slice(0,table.length-1)} VARCHAR(255), 
                    PRIMARY KEY(key_id)
                )`;
                break;
        }
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        })        
    }
    res.send('All tables created...')
});

    //  Insert post 1
    app.get('/addpost1', (req, res) => {
        let post = {title: 'Post One', body: 'This is post number one'};
        let sql = 'INSERT INTO posts SET ?';
        let query = db.query(sql, post, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send('Post 1 added...');
        })

    })

// Populate main table
app.get('/populate_tables', (req, res) => {
    
    
    let tables = ['classifications', 'cuisines', 'forms', 'main', 'mistakens', 'names', 'similars']
    let record
    for (let table of tables){
        fs.readFile(`./csv/${table}.csv`, 'utf8', function(err, contents){

            if(err) throw err;
            let lines = contents.split("\n");
            for (var i = 1; i < lines.length; i++){
                let line = lines[i];
                let split_line = line.replace("\r","").split(/,(?! )/)
                let record
                switch(table){
                    case "main":
                        record = {
                            key_id: split_line[0],
                            cuisine_lookup_id: split_line[1],
                            classification_lookup_id: split_line[2],
                            name_lookup_id: split_line[3],
                            form_lookup_id: split_line[4],
                            color: split_line[5],
                            mistaken_lookup_id: (split_line[6] != '' ? split_line[6]: null),
                            similar_lookup_id: (split_line[7] != '' ? split_line[7]: null),
                            id: split_line[8],
                            description: split_line[9]
                        };
                        break;

                    case "cuisines":
                        record = {
                            key_id: split_line[0],
                            lookup_id: split_line[1],
                            cuisine: split_line[2],
                            type: split_line[3],
                            dish: split_line[4]
                        };
                        break;

                    case "names":
                        record = {
                            key_id: split_line[0],
                            lookup_id: split_line[1],
                            language: split_line[2],
                            name: split_line[3]
                        };
                        break;

                    case "classifications":
                        record = {
                            key_id: split_line[0],
                            lookup_id: split_line[1],
                            classification: split_line[2]
                        };
                        break;
                        
                    case "forms":
                        record = {
                            key_id: split_line[0],
                            lookup_id: split_line[1],
                            form: split_line[2]
                        };
                        break;
                        
                    case "mistakens":
                        record = {
                            key_id: split_line[0],
                            lookup_id: split_line[1],
                            mistaken: split_line[2]
                        };
                        break;
                        
                    case "similars":
                        record = {
                            key_id: split_line[0],
                            lookup_id: split_line[1],
                            similar: split_line[2]
                        };
                        break;
                        
                    default:
                        break;
                }                
                let sql = `INSERT INTO ${table} SET ?`;
                let query = db.query(sql, record, (err, result) => {
                    if(err) throw err;
                    console.log(result);
                })
            }

        });        
    }
    res.send('All tables populated...')
    
    
    
});

app.get('/query_test', (req, res) => {
    let sql = `
    SELECT m.id, n.names

    FROM cooktionary.main as m

    left join (
    select n.lookup_id, GROUP_CONCAT(n.names SEPARATOR '; ') as "names"
    from (
        SELECT 
        n.lookup_id, 
        CONCAT(n.language, ':', GROUP_CONCAT(DISTINCT n.name ORDER BY n.key_id ASC SEPARATOR ', ')) as "names" 
        FROM cooktionary.names as n
        GROUP BY n.lookup_id, n.language
    ) n 
    GROUP BY n.lookup_id
) as n on n.lookup_id = m.name_lookup_id

`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Query successful...')
    })
})

// Populate main table
app.get('/populate_main_table', (req, res) => {
    fs.readFile('./csv/main.csv', 'utf8', function(err, contents){

        if(err) throw err;
        let lines = contents.split("\n");
        for (var i = 1; i < lines.length; i++){
            let line = lines[i];
            let split_line = line.replace("\r","").split(/,(?! )/)
            let record = {
                key_id: split_line[0],
                cuisine_lookup_id: split_line[1],
                classification_lookup_id: split_line[2],
                name_lookup_id: split_line[3],
                form_lookup_id: split_line[4],
                color: split_line[5],
                mistaken_lookup_id: split_line[6],
                similar_lookup_id: split_line[7],
                id: split_line[8],
                description: split_line[9]
            };
            let sql = 'INSERT INTO main SET ?';
            let query = db.query(sql, record, (err, result) => {
                if(err) throw err;
                console.log(result);
            })
        }
        
        //res.send('File read...')
        res.send('Main records added...');
        //console.log(contents.split("\r").replace("\n",""));
    });
});


app.listen('3000', () => {
    console.log('Server started on port 3000');
});