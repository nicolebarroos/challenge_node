const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000
app.use(express.json())

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'localhost',
      port     : 3306,
      user     : 'mysql',
      password : 'root',
      database : 'peoples'
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

