import React from "react";
import { ButtonProps } from "@mui/material";
import { Container } from "./styles";

interface IButtonProps extends ButtonProps {
  loading?: boolean;
}

export const Button: React.FC<IButtonProps> = ({ loading, ...buttonProps }) => {
  const { color, variant, endIcon, startIcon, children } = buttonProps ?? {};

  return (
    <Container
      {...buttonProps}
      disableElevation
      color={color ?? "primary"}
      variant={variant ?? "contained"}
      disabled={loading}
      endIcon={endIcon}
      startIcon={startIcon}
    >
      {loading ? "Loading..." : children}
    </Container>
  );
};
