const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//cuida do envio dos eventos para os outros microsserviços

const app = express();
app.use(bodyParser.json());

app.post('/eventos', (req, res) => {
    const evento = req.body;
    //enviar o evento para cada microsserviço
    axios.post('http://localhost:4000/eventos', evento);
    axios.post('http://localhost:5000/eventos', evento);
    res.status(200).send({msg: "ok"});
});
app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.');
})