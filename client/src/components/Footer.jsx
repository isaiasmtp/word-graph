import { Box, Container, Link, Typography } from "@mui/material";

const Copyright =() => {
    return (
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/isaiasmtp/">
          Isaías Martins
        </Link>{' '}
        {new Date().getFullYear()}
        {' '}| Fonte: {' '}
        <Link color="inherit" href="https://www.sinonimos.com.br/">
          Sinonimos
        </Link>
      </Typography>
    );
  }
  

export default function Footer() {
    return(
    <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
          theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>)
}


