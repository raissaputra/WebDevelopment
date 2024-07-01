const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = 3000

app.get('/', (req, res)=>{
    res.send('HALOOOOO Koding JS')
})

app.listen(port, ()=>{
    console.log(`Server running port ${port}`);
})
