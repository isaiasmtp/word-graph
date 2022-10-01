import styled from "@emotion/styled";
import { Button, CircularProgress, TextField } from "@mui/material";
import { grey } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[700],
    },
}));

const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: grey[800],
}));

const CustomTextField = styled(TextField)`
  & label.Mui-focused {
    color: gray;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: gray;
    }
  }
  & .MuiInput-root:after {
    border-bottom: 2px solid #c2c2c2;
  }
`;


export { ColorButton, CustomTextField, CustomCircularProgress }