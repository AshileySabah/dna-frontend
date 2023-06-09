/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
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
import { dnaService } from "../../services/DNA";
import { getErrorMessage } from "../../services/Error/getErrorMessage";
import { useModal } from "../../hooks/Modal";
import { Statitcs } from "../Statitcs";

export const Home = () => {
  const { control, setValue, watch, handleSubmit, clearErrors } =
    useForm<IDNATest>({
      defaultValues,
      mode: "onBlur",
      resolver: yupResolver(validation),
    });
  const { createSnack } = useSnackbar();
  const { createModal } = useModal();

  const [loading, setLoading] = useState<boolean>(false);

  const dimension = watch("dimension");
  const matrixInterfaceField = watch("matrixInterfaceField");
  const insertMethod = watch("insertMethod");

  useEffect(() => {
    if (dimension >= 3 && dimension <= 10) {
      setValue("matrixInterfaceField", createMatrix(Number(dimension)));
    } else {
      setValue("matrixInterfaceField", []);
    }
  }, [dimension]);

  const DNAResult = async (data: IDNATest) => {
    try {
      const matrix =
        data?.insertMethod === "MI"
          ? JSON?.stringify(data?.matrixInterfaceField)
          : data?.matrixEnterArrayField;

      const result = await dnaService?.validateAnomaly({ matrix });

      createSnack({
        severity: "success",
        message: result?.message,
      });
    } catch (error: Error | unknown) {
      createSnack({
        severity: "error",
        message: getErrorMessage(error),
      });
    }
  };

  const onSubmit = async (data: IDNATest) => {
    setLoading(true);
    await DNAResult(data);
    setLoading(false);
  };

  const clearMatrixInterfaceFields = () => {
    setValue("dimension", "");
    setValue("matrixInterfaceField", []);
    clearErrors();
  };

  const clearMatrixEnterArrayField = () => {
    setValue("matrixEnterArrayField", "");
    clearErrors();
  };

  const showStatistics = () => {
    createModal({
      message: {
        close: true,
        component: <Statitcs />,
      },
    });
  };

  return (
    <Container>
      <LogoContainer>
        <img src={dnaLogo} alt="DNA logo" />
        <Typography>DNA Test</Typography>
      </LogoContainer>

      <Grid container spacing={1} p={2}>
        <Grid item xs={12}>
          <Typography fontSize={20}>
            How do you want to insert the DNA data?
          </Typography>
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
              <Button
                variant="outlined"
                fullWidth
                onClick={clearMatrixInterfaceFields}
              >
                Clear fields
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit(onSubmit)}
                loading={loading}
              >
                Submit DNA test
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={2}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={showStatistics}
              >
                Check statistics
              </Button>
            </Grid>
          </>
        ) : null}

        {insertMethod === "MI" && matrixInterfaceField?.length > 0 ? (
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
              <Button
                variant="outlined"
                fullWidth
                onClick={clearMatrixEnterArrayField}
              >
                Clear field
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit(onSubmit)}
                loading={loading}
              >
                Submit DNA test
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={2}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={showStatistics}
              >
                Check statistics
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography color="GrayText">
                Example: [[1, 2, 3], [1, 4, 5], [1, 2, 4]]
              </Typography>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Container>
  );
};
