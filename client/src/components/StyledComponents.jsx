import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { grey } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[700],
    },
}));

export { ColorButton }