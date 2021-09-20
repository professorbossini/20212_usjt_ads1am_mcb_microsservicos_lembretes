const express = require ('express')
const bodyParser = require ('body-parser')
const { json } = require('express')
const app = express()
app.use(bodyParser.json())

//GET /lembretes/1/observacoes

app.get ('/lembretes/:id/observacoes', (req, res) => {
    console.log(req.params.id)
    res.end()
})


//POST /lembretes/1/observacoes
app.post ('/lembretes/:id/observacoes', (req, res) => {
    console.log (req.params.id)
    res.end()
})

app.listen(5000, () => console.log ("Observações. 5000"))