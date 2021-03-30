const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'u5k0p76qab9lgo',
    host: 'ec2-3-223-209-121.compute-1.amazonaws.com',
    database: 'd2ft5tos13hvn3',
    password: 'paf02e06581915744a64c32f16b0af3cce70beb43fbd67725e0900b4d3a42421c',
    port: 5432,
    ssl: false
})

var client = new Client({
    user: "admin",
    password: "guest",
    database: "Employees",
    port: 5432,
    host: "localhost",
    ssl: false
}); 
client.connect();
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

// ;(async () => {
//     const { rows } = await pool.query('SELECT * FROM users',)
//     console.log('user:', rows[0])
//   })().catch(err =>
//     setImmediate(() => {
//       console.log(err)
//     })
//   )
// const client = new Client({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })