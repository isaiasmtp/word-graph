const express = require('express')
const path = require('path')
const cors =  require('cors')


const PORT = process.env.PORT || 3001

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.use(cors())

app.use(express.static(path.join(__dirname + "/client/build")))


app.get('/word', async (req, res) => {
    res.send({teste: '1'})
})




app.listen(PORT)