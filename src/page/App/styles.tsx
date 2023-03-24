import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled("div")`
  background: lightgray;
  height: calc(100vh + 8px);
`;

export const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  height: 80px;

  background: ${({ theme }) => theme?.palette?.primary?.main};

  img {
    width: 70px;
    padding: 5px;
  }

  p {
    color: #fff;
    font-size: 40px;
  }
`;
