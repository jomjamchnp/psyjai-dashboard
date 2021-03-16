// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

const express = require('express')
const cors = require('cors')
// const pool = require('./merchant_model').pool
const client = require('./dbConfig')
const { response } = require('express')
const app = express()
const port = 3001

// const merchant_model = require('./merchant_model')

app.use(cors());
app.use(express.json())
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// api get all
app.get('/', async (req, res) => {
  try{
    await client.getUsers()
    .then(response =>{
        console.log("response: ",response)
        res.status(200).send(response);
    })
    .catch(e =>{
        res.status(500).send(e);
    })
  }catch(err){
    console.log(err)
  }
})

// app.post('/merchants', (req, res) => {
//   merchant_model.createMerchant(req.body)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// app.delete('/merchants/:id', (req, res) => {
//   merchant_model.deleteMerchant(req.params.id)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
//select users.id,users.first_name,users.last_name,users.app,users.botorigin,botorigins.botname from users INNER join botorigins on users.botorigin = botorigins.botorigin WHERE botorigins.botname Like "Covid Bot Test"'
// ReactDOM.render(<App />, document.getElementById('root'));