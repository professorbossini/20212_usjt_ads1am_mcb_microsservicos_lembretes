const express = require ('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const lembretes = {}
contador = 0

app.post ('/lembretes', (req, res) => {
    contador++
    const { texto } = req.body
    lembretes[contador] = {
        contador, texto
    }
    res.status(201).send(lembretes[contador])
})


app.get ('/lembretes', (req, res) => {
    res.send(lembretes)
})

app.listen (4000, () => {
    console.log ('Lembretes. Porta 4000.')
})