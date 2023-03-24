import { styled } from "@mui/material/styles";
import { FormControl as FormControlMui } from "@mui/material";

export const FormControl = styled(FormControlMui)`
  .MuiFormLabel-root.Mui-focused {
    color: #585858;
  }

  .MuiButtonBase-root.MuiRadio-root {
    padding: 0 9px;
  }

  .MuiFormLabel-root.Mui-error {
    color: #d32f2f;
  }
`;
