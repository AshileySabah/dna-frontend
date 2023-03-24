/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography, Button } from "@mui/material";

import dnaLogo from "/dna-logo.png";
import { validation } from "./validation";
import { Input } from "../../components/Input";
import { useSnackbar } from "../../hooks/Snackbar";

interface IDNATest {
  dimension: number;
  matrix: string[];
}

const defaultValues: IDNATest = {
  dimension: 3,
  matrix: [],
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
  const showMatrix = matrix?.length && dimension >= defaultValues?.dimension;

  useEffect(() => {
    const newMatrix = new Array(dimension ** 2)?.fill("");
    setValue("matrix", newMatrix);
  }, [dimension]);

  // implementar see as row or matrix

  const buildMultidimentionalMatrix = useCallback(() => {
    const matrixIndexesList: number[] = [];
    matrix?.forEach((item, index) => {
      const isRowBeggining = (index + dimension) % dimension === 0;
      const isRowEnd = (index + 1) % dimension === 0;

      if (isRowBeggining || isRowEnd) {
        matrixIndexesList?.push(index);
      }
    });

    console.log(matrixIndexesList);
  }, [matrix]);

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
              <Button onClick={() => buildMultidimentionalMatrix()}>
                Submit DNA test
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {showMatrix &&
        (showAsRow ? (
          <Grid container spacing={1} mt={2}>
            {matrix?.map((_value, index) => {
              const isRowBeggining = (index + dimension) % dimension === 0;
              const isRowEnd = (index + 1) % dimension === 0;

              return (
                <>
                  {isRowBeggining && (
                    <Box width="100%" mt={3}>
                      <Typography variant="h6">Row X</Typography>
                    </Box>
                  )}
                  <Input
                    name={`matrix.${index}`}
                    control={control}
                    label="Matrix"
                  />
                  {isRowEnd && <Box style={{ width: "100%" }} />}
                </>
              );
            })}
          </Grid>
        ) : (
          <Grid container spacing={1} mt={2} justifyContent="center">
            <Grid
              item
              xs={12}
              sm={12}
              md={matrixFieldWidth <= 12.5 ? 8 : 6}
              sx={{ backgroundColor: "lightgrey" }}
            >
              <Box
                display="flex"
                flexWrap="wrap"
                sx={{ backgroundColor: "tomato" }}
              >
                {matrix?.map((_value, index) => (
                  <Box key={index} sx={{ width: `${matrixFieldWidth}%` }}>
                    <Input
                      name={`matrix.${index}`}
                      control={control}
                      label="Matrix"
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        ))}
    </Box>
  );
};
