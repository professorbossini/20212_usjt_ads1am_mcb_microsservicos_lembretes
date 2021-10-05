const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//cuida do envio dos eventos para os outros microsserviços

const app = express();
app.use(bodyParser.json());

const eventos = []

app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento);
    console.log(evento);
    //enviar o evento para cada microsserviço
    axios.post('http://localhost:4000/eventos', evento);
    axios.post('http://localhost:5000/eventos', evento);
    axios.post('http://localhost:6000/eventos', evento);
    axios.post('http://localhost:7000/eventos', evento);
    res.status(200).send({msg: "ok"});
});

app.get ('/eventos', (req, resp) => {
    resp.send(eventos)
})
app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.');
})