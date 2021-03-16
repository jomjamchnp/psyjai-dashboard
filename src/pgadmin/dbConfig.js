const { Client } = require('pg')
const client = new Client({
    user: 'u5k0p76qab9lgo',
    host: 'ec2-3-223-209-121.compute-1.amazonaws.com',
    database: 'd2ft5tos13hvn3',
    password: 'paf02e06581915744a64c32f16b0af3cce70beb43fbd67725e0900b4d3a42421c',
    port: 5432,
    ssl: true
})

client.connect()
const getUsers = () => {
    return new Promise( async function(resolve, reject) {
        await client.query('select * from users', (error, results) => {
        if (error) {
            console.log(error)
            reject(error)
        }
        resolve(results);
        console.log(results)
        })
     }) 
  }
  

module.exports = { getUsers }