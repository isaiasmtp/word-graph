const express = require('express')
const path = require('path')
const cors =  require('cors')
const puppeteer = require('puppeteer')

const PORT = process.env.PORT || 3001
const SINONIMOS_URL = 'https://www.sinonimos.com.br'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.use(cors())
app.use(express.static(path.join(__dirname + "/client/build")))


/* MOCK
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
*/



app.post('/word', async (req, res) => {
    const word = req.body.word;
    const graphResult = await graph(word) 
    res.send(graphResult)
})


const graph = async (word) => {
    let nodes = [{ id: 1, label: word, color: "#fff", value:20 }]
    let edges = [{}]
    
    const data = await similarWords(word)
    

    
    for (let i=0; i < data.length; i++){
        // First connection to main node
        const id = create_UUID()
        const node = {id, label: data[i].sentido, color:"#fd6565", value:10}
        const edge = { from: 1, to: id}
        nodes.push(node)
        edges.push(edge)

        for (let j = 0; j < data[i].words.length;j++){
            const id_f = create_UUID()
            const node_f = {id: id_f, label: data[i].words[j], color:"#ffadad", value:5}
            const edge_f = { from: id, to: id_f}

            nodes.push(node_f)
            edges.push(edge_f)

        }
 

    }



    return {nodes, edges}
}

const similarWords = async (word) => {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ], headless: false
      });
    const page = await browser.newPage();
    await page.goto(`${SINONIMOS_URL}/${word}/`)
    
    const pageData = await page.evaluate(() => {
        let data =  []
        let sinonimos =  []
        let words = []
        let sentido = []

        document.querySelectorAll(".sinonimos").forEach((item) => sinonimos.push(item.childNodes))
        document.querySelectorAll(".sentido").forEach((item) => sentido.push(item.innerText))

        for (let i=0; i<sentido.length;i++){
            sentido[i] = sentido[i].slice(0, -1)
        }

        for (let i = 0; i < sinonimos.length; i++){
            words = []
            for (let j = 0; j < sinonimos[i].length; j++){
                if(sinonimos[i][j].classList){
                    if (sinonimos[i][j].classList.value ==='sinonimo'){
                        words.push(sinonimos[i][j].innerText)    
                    }
                }
            }
            data.push({sentido: sentido[i], words})
        }

        return data
      });
      
    await browser.close()
    return pageData
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

app.listen(PORT,()=>{
    console.log(`Running at port ${PORT}`);
})