import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [world, setWorld] = useState('teste')

  useEffect(()=>{
    axios.get('http://localhost:3001/world')
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
