/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@mui/material";

import dnaLogo from "/dna-logo.png";
import { validation } from "./validation";
import { Input } from "../../components/Form/Input";
import { useSnackbar } from "../../hooks/Snackbar";
import { createMatrix } from "./helpers";
import { Button } from "../../components/Button";
import { Container, LogoContainer } from "./styles";
import { Radio } from "../../components/Form/Radio";
import { IDNATest, defaultValues, insertMethods } from "./types";

export const App = () => {
  const { control, setValue, watch, reset, handleSubmit } = useForm<IDNATest>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const { createSnack } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  const dimension = watch("dimension");
  const matrixInterfaceField = watch("matrixInterfaceField");
  const insertMethod = watch("insertMethod");

  const showMatrix = matrixInterfaceField?.length > 0 && dimension >= 3;

  useEffect(() => {
    setValue("matrixInterfaceField", createMatrix(Number(dimension)));
  }, [dimension]);

  const getDNAResult = useCallback(async (data: IDNATest) => {
    console.log(data);
  }, []);

  const onSubmit = async (data: IDNATest) => {
    setLoading(true);
    await getDNAResult(data);
    setLoading(false);
  };

  return (
    <Container>
      <LogoContainer>
        <img src={dnaLogo} alt="DNA logo" />
        <Typography>DNA Test</Typography>
      </LogoContainer>

      <Grid container spacing={1} p={2}>
        <Grid item xs={12}>
          <Typography>How do you want to insert the DNA data?</Typography>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Radio
              name="insertMethod"
              control={control}
              radioGroupProps={{
                row: true,
              }}
              options={Object.entries(insertMethods).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </Grid>
        </Grid>

        {insertMethod === "MI" ? (
          <>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Input
                name="dimension"
                control={control}
                label="Matrix's dimension*"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Button variant="outlined" fullWidth onClick={() => reset()}>
                Clear fields
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit(onSubmit)}
              >
                Submit DNA test
              </Button>
            </Grid>
          </>
        ) : null}

        {insertMethod === "MI" && showMatrix ? (
          <Grid item xs={12}>
            {matrixInterfaceField?.map((row, rowIndex) => (
              <Box key={rowIndex} display="flex">
                {row?.map((item, itemIndex) => (
                  <Box key={itemIndex}>
                    <Input
                      name={`matrixInterfaceField.${rowIndex}.${itemIndex}`}
                      control={control}
                    />
                  </Box>
                ))}
              </Box>
            ))}
          </Grid>
        ) : null}

        {insertMethod === "EA" ? (
          <>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Input
                name="matrixEnterArrayField"
                control={control}
                label="Matrix*"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Button variant="outlined" fullWidth onClick={() => reset()}>
                Clear field
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit(onSubmit)}
              >
                Submit DNA test
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Container>
  );
};
