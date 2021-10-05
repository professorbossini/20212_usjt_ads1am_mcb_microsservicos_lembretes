const express = require ('express')
const bodyParser = require ('body-parser')
const { v4: uuidv4 } = require ('uuid');
const axios = require ('axios')
const app = express()
app.use(bodyParser.json())

const observacoesPorLembrete = {};

app.post ('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    }
    catch (err) {}
    res.status(200).send({msg: 'ok'});
})

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
    observacoesDoLembrete.push({id: idObs, texto, status: 'Aguardando'});
    observacoesPorLembrete[req.params.id] = observacoesDoLembrete;
    axios.post ('http://localhost:10000/eventos', {
        tipo: 'ObservacaoCriada',
        dados: {id: idObs, texto, lembreteId: req.params.id, status: "Aguardando"}
    })
    res.status(201).send(observacoesDoLembrete);
})

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const observacoes = observacoesPorLembrete[observacao.lembreteId];
        const obsParaAtualizar = observacoes.find (o => o.id === observacao.id);
        obsParaAtualizar.status = observacao.status;
        axios.post('http://localhost:10000/eventos', 
        {
            tipo: "ObservacaoAtualizada",
            dados: {
                id: observacao.id,
                texto: observacao.texto,
                lembreteId: observacao.lembreteId,
                status: observacao.status
            }
        });
    }
}

app.listen(5000, () => console.log ("Observações. 5000"))