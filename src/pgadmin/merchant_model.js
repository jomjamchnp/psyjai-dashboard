const Pool = require('pg').Pool
const pool = new Pool({
  username: 'u5k0p76qab9lgo',
  host: 'ec2-3-223-209-121.compute-1.amazonaws.com',
  database: 'd2ft5tos13hvn3',
  password: 'paf02e06581915744a64c32f16b0af3cce70beb43fbd67725e0900b4d3a42421c',
  port: 5432,
});
//users.id,users.first_name,users.last_name,users.app,users.botorigin,botorigins.botname from users INNER join botorigins on users.botorigin = botorigins.botorigin WHERE botorigins.botname Like "Covid Bot Test"
const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('select * from users', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
        console.log(results)
      })
    }) 
  }
  // const createMerchant = (body) => {
  //   return new Promise(function(resolve, reject) {
  //     const { name, email } = body
  //     pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
  //       if (error) {
  //         reject(error)
  //       }
  //       resolve(`A new merchant has been added added: ${results.rows[0]}`)
  //     })
  //   })
  // }
  // const deleteMerchant = () => {
  //   return new Promise(function(resolve, reject) {
  //     const id = parseInt(request.params.id)
  //     pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
  //       if (error) {
  //         reject(error)
  //       }
  //       resolve(`Merchant deleted with ID: ${id}`)
  //     })
  //   })
  // }
  
  module.exports = {
    getUsers,
   // createMerchant,
   // deleteMerchant,
  }