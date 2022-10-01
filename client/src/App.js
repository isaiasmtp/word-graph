import { useState } from 'react';
import { Stack } from '@mui/system';
import { CssBaseline, Box, Typography, TextField, Container } from '@mui/material';
import { Search }from '@mui/icons-material';

import { ColorButton } from './components/StyledComponents';
import DataGridTrends from './components/DataGridTrends';
import Footer from './components/Footer';

import axios from  'axios'
import VisNetwork from './components/VisNetwork';


//const baseUrl = 'https://word-graph-analytics.herokuapp.com'
const baseUrl = 'http://localhost:3001'

function App() {

  const [word, setWord] = useState('')

    const handleGenerate = () => {
      axios.get(`${baseUrl}/word`)
      .then(res => {
        
      })   
    }

    const nodes = [
      { id: 1, label: "Word", color: "#fff", value:20 },
      { id: 2, label: "Node 2", color: "#c2c2c2", value:10 },
      { id: 3, label: "Node 3", color: "#c2c2c2", value:10 },
      { id: 4, label: "Node 4", color: "#c2c2c2",  value:10 },
      { id: 5, label: "Node 5", color: "#c2c2c2",  value:10 }
    ]

    const edges = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
    
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />

      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Word Graph Analytics
        </Typography>

        <Stack direction="row" spacing={2}>          
          <TextField id="standard-basic" value={word} onChange={e => setWord(e.target.value)} label="Word" variant="standard" />
          <ColorButton variant="outline" onClick={handleGenerate} endIcon={<Search/>}>
            Generate
          </ColorButton>
        </Stack>
      </Container>

      <Box sx={{margin:'1em'}}>
        {/* <TreeChart data={data} /> */}
        <VisNetwork nodes={nodes} edges={edges} />
        <DataGridTrends />
      </Box>

      
      <Footer />
    </Box>
  );
}

export default App;
