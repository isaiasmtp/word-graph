import axios from  'axios'
import { useState } from 'react';
import { Stack } from '@mui/system';
import { CssBaseline, Box, Typography, Container } from '@mui/material';
import { Search }from '@mui/icons-material';
import { ColorButton, CustomCircularProgress, CustomTextField } from './components/StyledComponents';

import VisNetwork from './components/VisNetwork';
import Footer from './components/Footer';

const baseUrl = 'https://word-graph-analytics.herokuapp.com'
//const baseUrl = 'http://localhost:3001'

function App() {

  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(false)

  const [graph, setGraph] = useState({
    nodes: [],
    edges: []
  })

  const handleWord = (e) => { 
    setWord(e.target.value.trim())
  }

    const handleGenerate = () => {
      setLoading(true)

      axios.post(`${baseUrl}/word`,{ word })
      .then(res => {
        if(res.status === 200){
          const edges = res.data.edges
          const nodes = res.data.nodes
          if (edges && nodes){
            setGraph({edges, nodes});
          }
        }
      })
      .catch(()=>{
        
      })
      .finally(()=>{
        setLoading(false)
      })   
    }
    
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />

      <Container component="main" sx={{ mt: 5, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Word Graph Analytics
        </Typography>

        <Stack direction="row" spacing={2}>          
          <CustomTextField id="standard-basic" value={word} onChange={handleWord} label="Word" variant="standard" />
          <ColorButton 
            disabled={loading} 
            variant="outline" 
            onClick={handleGenerate} 
            endIcon={ !loading && <Search/>}>
            { !loading ? <span>Generate</span> : <span>Loading...</span>}
          </ColorButton>
        </Stack>
      </Container>

      <Box sx={{margin:'0.5em'}}>
        {/* <TreeChart data={data} /> */}

        { loading &&
          <Box textAlign={'center'} padding={'176px'}>
            <CustomCircularProgress />
          </Box>
        }
        
        {
          !loading &&
          <>
            <VisNetwork nodes={graph.nodes} edges={graph.edges} />
            <Typography variant="p" component="p" gutterBottom>
              Sentidos de palavras.
            </Typography>
          </>
        }

      </Box>
      <Footer />
    </Box>
  );
}

export default App;
