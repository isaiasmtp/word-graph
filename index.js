const express = require('express')
const path = require('path')
const cors =  require('cors')


const PORT = process.env.PORT || 3001

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.use(cors())

app.use(express.static(path.join(__dirname + "/client/build")))

let nodes = [
    { id: 1, label: "Word", color: "#fff", value:20 },
    { id: 2, label: "Node a", color: "#c2c2c2", value:10 },
    { id: 3, label: "Node 3", color: "#c2c2c2", value:10 },
    { id: 4, label: "Node 4", color: "#c2c2c2",  value:10 },
    { id: 5, label: "Node 5", color: "#c2c2c2",  value:10 }
  ]

  let edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ]

app.get('/word', async (req, res) => {
    setTimeout(()=> {
        
        res.send({nodes, edges})
    },1000)
})




app.listen(PORT)