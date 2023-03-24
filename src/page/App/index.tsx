/* eslint-disable react/no-array-index-key */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography, Button } from "@mui/material";

import dnaLogo from "/dna-logo.png";
import { validation } from "./validation";
import { Input } from "../../components/Input";
import { useSnackbar } from "../../hooks/Snackbar";

const createMatrix = (dimension: number) => {
  const newMatrix: string[][] = [];
  for (let i = 0; i < Number(dimension); i++) {
    const row = new Array(Number(dimension))?.fill("");
    newMatrix?.push(row);
  }
  return newMatrix;
};

interface IDNATest {
  dimension: number;
  matrix: string[][];
}

const defaultValues: IDNATest = {
  dimension: 3,
  matrix: createMatrix(3),
};

export const App = () => {
  // hooks
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
    reset,
    trigger,
  } = useForm<IDNATest>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(validation),
  });
  const { createSnack } = useSnackbar();

  const dimension = watch("dimension");
  const matrix = watch("matrix");

  const matrixFieldWidth = 100 / dimension;
  const showAsRow = matrixFieldWidth < 10;
  const showMatrix =
    matrix?.length > 0 && dimension >= defaultValues?.dimension;

  useEffect(() => {
    setValue("matrix", createMatrix(dimension));
  }, [dimension]);

  return (
    <Box sx={{ backgroundColor: "lightblue", height: "calc(100vh - 72px)" }}>
      <Box display="flex" alignItems="center">
        <img
          src={dnaLogo}
          alt="DNA logo"
          width={100}
          style={{ marginRight: 10 }}
        />
        <Typography variant="h4">DNA Test</Typography>
      </Box>

      <Grid container spacing={1} mt={5} justifyContent="center">
        <Grid item xs={12} sm={4} md={matrixFieldWidth <= 12.5 ? 3 : 2}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} sm={12} md={12}>
              <Input
                name="dimension"
                control={control}
                label="Matrix's dimension*"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8} md={matrixFieldWidth <= 12.5 ? 5 : 4}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} sm={6} md={6}>
              <Button variant="outlined" onClick={() => reset()}>
                Clear fields
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Button onClick={() => console.log(matrix)}>
                Submit DNA test
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {showMatrix &&
        (showAsRow ? (
          <Grid container spacing={1} mt={2} justifyContent="center">
            <Grid item xs={12}>
              {matrix?.map((row, rowIndex) => (
                <Box key={rowIndex} display="flex">
                  {row?.map((item, itemIndex) => (
                    <Box key={itemIndex}>
                      <Input
                        name={`matrix.${rowIndex}.${itemIndex}`}
                        control={control}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1} mt={2} justifyContent="center">
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ backgroundColor: "lightgrey" }}
            >
              {matrix?.map((row, rowIndex) => (
                <Box key={rowIndex} display="flex">
                  {row?.map((item, itemIndex) => (
                    <Box key={itemIndex}>
                      <Input
                        name={`matrix.${rowIndex}.${itemIndex}`}
                        control={control}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
            </Grid>
          </Grid>
        ))}
    </Box>
  );
};