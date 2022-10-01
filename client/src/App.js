import { useState } from 'react';
import { Stack } from '@mui/system';
import { CssBaseline, Box, Typography, TextField, Container } from '@mui/material';
import { Search }from '@mui/icons-material';

import { ColorButton } from './components/StyledComponents';
import TreeChart from './components/TreeChart';
import DataGridTrends from './components/DataGridTrends';
import Footer from './components/Footer';

import axios from  'axios'

//const baseUrl = 'https://word-graph-analytics.herokuapp.com'
const baseUrl = 'http://localhost:3001'

const initialData = {
  name: "Maria....",
  children: [
   
    {
      name: "EU",
      children: [
        {
          name: "testeeeeee"
        },
        {
          name: "outroooooo"
        },
        {
          name: "🤣", 
          children: [
            {
              name: "TE"
            },
            {
              name: "outroooooo"
            },
            {
              name: "🤣",
              children: [
                {
                  name: "testeeeeee"
                },
                {
                  name: "outroooooo"
                },
                {
                  name: "AMOOO"
                }
              ]
            }
          ]
          
        }
      ]
    },
    {
      name: "EU",
      children: [
        {
          name: "testeeeeee"
        },
        {
          name: "outroooooo"
        },
        {
          name: "🤣", 
          children: [
            {
              name: "TE"
            },
            {
              name: "outroooooo"
            },
            {
              name: "🤣",
              children: [
                {
                  name: "testeeeeee"
                },
                {
                  name: "outroooooo"
                },
                {
                  name: "AMOOO"
                }
              ]
            }
          ]
          
        }
      ]
    },
    {
      name: "EU",
      children: [
        {
          name: "testeeeeee"
        },
        {
          name: "outroooooo"
        },
        {
          name: "🤣", 
          children: [
            {
              name: "TE"
            },
            {
              name: "outroooooo"
            },
            {
              name: "🤣",
              children: [
                {
                  name: "testeeeeee"
                },
                {
                  name: "outroooooo"
                },
                {
                  name: "AMOOO"
                }
              ]
            }
          ]
          
        }
      ]
    },

    {
      name: "EU",
      children: [
        {
          name: "testeeeeee"
        },
        {
          name: "😁"
        },
        {
          name: "🤣", 
          children: [
            {
              name: "TE"
            },
            {
              name: "😁"
            },
            {
              name: "🤣",
              children: [
                {
                  name: "testeeeeee"
                },
                {
                  name: "😁"
                },
                {
                  name: "AMOOO"
                }
              ]
            }
          ]
          
        }
      ]
    },
  ]
};


function App() {
  const [word, setWord] = useState('')
  const [data, setData] = useState(initialData)

  const handleGenerate = () => {
    axios.get(`${baseUrl}/word`)
    .then(res => {
      
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
          <TextField id="standard-basic" value={word} onChange={e => setWord(e.target.value)} label="Word" variant="standard" />
          <ColorButton variant="outline" onClick={handleGenerate} endIcon={<Search/>}>
            Generate
          </ColorButton>
        </Stack>
      </Container>

      <Box>
        <TreeChart data={data} />
      </Box>
      
      <DataGridTrends />
      <Footer />
    </Box>
  );
}

export default App;
