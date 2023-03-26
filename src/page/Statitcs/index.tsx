import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSnackbar } from "../../hooks/Snackbar";
import { dnaService } from "../../services/DNA";
import { getErrorMessage } from "../../services/Error/getErrorMessage";
import { IStatisticsDTO } from "../../services/DNA/types";
import { ratioMask } from "../../utils/ratioMask";

export const Statitcs = () => {
  const { createSnack } = useSnackbar();

  const [statistcs, setStatistcs] = useState<IStatisticsDTO>(
    {} as IStatisticsDTO,
  );

  const [loading, setLoading] = useState<boolean>(false);

  const getStatistcs = async () => {
    try {
      const result = await dnaService?.getStatistcs();
      setStatistcs(result);
    } catch (error: Error | unknown) {
      createSnack({
        severity: "error",
        message: getErrorMessage(error),
      });
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getStatistcs();
      setLoading(false);
    })();
  }, []);

  return (
    <Box sx={{ px: 5, pb: 3 }} justifyContent="center" textAlign="center">
      {loading ? (
        <Box sx={{ px: 5, pb: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h5">Registered quantity of anomalies</Typography>
          <Typography color="red">{statistcs?.count_anomalies ?? 0}</Typography>

          <Typography variant="h5" mt={3}>
            Registered quantity of non anomalies
          </Typography>
          <Typography color="green">
            {statistcs?.count_no_anomalies ?? 0}
          </Typography>

          <Typography variant="h5" mt={3}>
            Ratio
          </Typography>
          <Typography color="blue">
            {ratioMask(statistcs?.ratio) ?? 0}
          </Typography>
        </>
      )}
    </Box>
  );
};
