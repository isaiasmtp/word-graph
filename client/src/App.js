import { useState } from 'react';
import { Stack } from '@mui/system';
import { CssBaseline, Box, Typography, Container } from '@mui/material';
import { Search }from '@mui/icons-material';

import { ColorButton, CustomCircularProgress, CustomTextField } from './components/StyledComponents';
import DataGridTrends from './components/DataGridTrends';
import Footer from './components/Footer';

import axios from  'axios'
import VisNetwork from './components/VisNetwork';


const baseUrl = 'https://word-graph-analytics.herokuapp.com'
//const baseUrl = 'http://localhost:3001'

function App() {

  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(false)

  const [graph, setGraph] = useState({
    nodes: [],
    edges: []
  })

    const handleGenerate = () => {
      setLoading(true)

      axios.get(`${baseUrl}/word`)
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

      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Word Graph Analytics
        </Typography>

        <Stack direction="row" spacing={2}>          
          <CustomTextField id="standard-basic" value={word} onChange={e => setWord(e.target.value)} label="Word" variant="standard" />
          <ColorButton 
            disabled={loading} 
            variant="outline" 
            onClick={handleGenerate} 
            endIcon={ !loading && <Search/>}>
            { !loading ? <span>Generate</span> : <span>Loading</span>}
          </ColorButton>
        </Stack>
      </Container>

      <Box sx={{margin:'1em'}}>
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
              <DataGridTrends />
            </>
        }

      </Box>
      <Footer />
    </Box>
  );
}

export default App;
