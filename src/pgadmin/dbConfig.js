const { Client } = require('pg')
const client = new Client({
    user: 'u5k0p76qab9lgo',
    host: 'ec2-3-223-209-121.compute-1.amazonaws.com',
    database: 'd2ft5tos13hvn3',
    password: 'paf02e06581915744a64c32f16b0af3cce70beb43fbd67725e0900b4d3a42421c',
    port: 5432,
    ssl: true
})

// const queryTest ='select variablestransaction.timestamp,users.first_name,users.last_name,botorigins.botname,variablestransaction.variable,variablestransaction.value from users INNER join botorigins on users.botorigin = botorigins.botorigin INNER join variablestransaction on variablestransaction.userid = users.id WHERE botorigins.botname Like $1 and (variablestransaction.variable Like $2 or variablestransaction.variable Like $3 or variablestransaction.variable Like $4) order By users.first_name',['Covid Bot Test%','TotalQanx','TotalQstess','TotalQdepress']

client.connect()
const getUsers = () => {
    return new Promise( async function(resolve, reject) {
        await client.query('select variablestransaction.timestamp,users.first_name,users.last_name,botorigins.botname,variablestransaction.variable,variablestransaction.value from users'+ 
        ' INNER join botorigins on users.botorigin = botorigins.botorigin'+ 
        ' INNER join variablestransaction on variablestransaction.userid = users.id'+ 
        ' WHERE botorigins.botname Like $1 and (variablestransaction.variable Like $2 or variablestransaction.variable Like $3 or variablestransaction.variable Like $4 or variablestransaction.variable Like $5)'+
        ' and users.first_name Like $6'+
        ' ORDER By variablestransaction.timestamp',['Covid Bot Test%','emotion_class','topic','Pre%','Post%','June'], (error, results) => {
        if (error) {
            console.log(error)
            reject(error)
        }
        //console.log(results)
        resolve(results.rows.filter(x => x.first_name === 'June'));
        console.log(results.rows[0].first_name)
        console.log(typeof(results))
        console.log(results.rows.filter(x => x.first_name === 'June'))
        //var name = results.rows[0].first_name+" "+results.rows[0].last_name
        // var test = JSON.parse(results);
        // console.log(test)

        })
     }) 
  }
  const getResult = () => {
    return new Promise( async function(resolve, reject) {
        await client.query('select variablestransaction.timestamp,users.first_name,users.last_name,botorigins.botname,variablestransaction.variable,variablestransaction.value from users INNER join botorigins on users.botorigin = botorigins.botorigin INNER join variablestransaction on variablestransaction.userid = users.id WHERE botorigins.botname Like $1 and (variablestransaction.variable Like $2 or variablestransaction.variable Like $3 or variablestransaction.variable Like $4) order By users.first_name',['Covid Bot Test%','TotalQanx','TotalQstess','TotalQdepress'], (error, results) => {
        if (error) {
            console.log(error)
            reject(error)
        }
        resolve(results.rows.filter(x => x.first_name === 'June'));
        console.log(results.rows[0].first_name)
        console.log(typeof(results))
        console.log(results.rows.filter(x => x.first_name === 'June'))

        })
     }) 
  }
  const getIntervention = () => {
    return new Promise( async function(resolve, reject) {
        await client.query('select users.timestamp,users.first_name,users.last_name,botorigins.botname,variablestransaction.variable,variablestransaction.value from users INNER join botorigins on users.botorigin = botorigins.botorigin INNER join variablestransaction on variablestransaction.userid = users.id WHERE botorigins.botname Like $1 and variablestransaction.variable Like $2 ORDER By users.first_name',['Covid Bot Test%','Intervention'], (error, results) => {
        if (error) {
            console.log(error)
            reject(error)
        }
        resolve(results.rows.filter(x => x.first_name === '???????????????'));
        console.log(results.rows[0].first_name)
        console.log(typeof(results))
        console.log(results.rows.filter(x => x.first_name === '???????????????'))
        //var name = results.rows[0].first_name+" "+results.rows[0].last_name
        // var test = JSON.parse(results);
        // console.log(test)

        })
     }) 
  }

module.exports = { getUsers,getIntervention,getResult }