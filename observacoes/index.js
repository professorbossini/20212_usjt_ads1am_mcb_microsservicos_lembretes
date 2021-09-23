const express = require ('express')
const bodyParser = require ('body-parser')
const { json } = require('express')
const { v4: uuidv4 } = require ('uuid');

const app = express()
app.use(bodyParser.json())

const observacoesPorLembrete = {};

//GET /lembretes/1/observacoes
app.get ('/lembretes/:id/observacoes', (req, res) => {
    //console.log(req.params.id)
    //res.end()
    res.send(observacoesPorLembrete[req.params.id] || []);
})

//POST /lembretes/1/observacoes
app.post ('/lembretes/:id/observacoes', (req, res) => {
    //console.log (req.params.id)
    //res.end()
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembrete[req.params.id] || [];
    observacoesDoLembrete.push({id: idObs, texto});
    observacoesPorLembrete[req.params.id] = observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
})

app.listen(5000, () => console.log ("Observações. 5000"))