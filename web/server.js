const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 5000
const {MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD} = process.env
app.use(express.json())

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : MYSQL_HOST,
      port     : 3306,
      user     : MYSQL_USER,
      password : MYSQL_PASSWORD,
      database : MYSQL_DATABASE
    });
   
    connection.query(sqlQry, (error, results, fields) => {
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }


app.get('/', (req, res) => {
  res.send("<h1>Full Cycle Rocks!</h1>")
})

app.get('/peoples', (req, res) => {
    execSQLQuery("SELECT * FROM person", res)
})

app.post('/peoples', (req, res) => {
  execSQLQuery(`INSERT INTO person (name) VALUES ('${req.body.name}');`, res)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})