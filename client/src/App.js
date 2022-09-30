import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

const baseUrl = 'https://word-graph-analytics.herokuapp.com'

function App() {
  const [world, setWorld] = useState('teste')

  useEffect(()=>{
    axios.get(`${baseUrl}/world`)
    .then(res => {
      setWorld(res.data.teste)
    })    
  },[])

  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          try backend - { world }
        </p>
       
      </header>
    </div>
  );
}

export default App;
