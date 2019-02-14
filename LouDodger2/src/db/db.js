let mysql = require('mysql');

let connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'Llewellyn',
    password: 'InnovateBham2019',
    database: 'Dodger'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
});

connection.end();
