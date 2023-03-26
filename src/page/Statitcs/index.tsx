import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from "../../hooks/Snackbar";
import { dnaService } from "../../services/DNA";
import { getErrorMessage } from "../../services/Error/getErrorMessage";
import { IStatisticsDTO } from "../../services/DNA/types";

export const Statitcs = () => {
  const { createSnack } = useSnackbar();

  const [statistcs, setStatistcs] = useState<IStatisticsDTO>(
    {} as IStatisticsDTO,
  );

  useEffect(() => {
    (async () => {
      try {
        const result = await dnaService?.getStatistcs();
        setStatistcs(result);
      } catch (error: Error | unknown) {
        createSnack({
          severity: "error",
          message: getErrorMessage(error),
        });
      }
    })();
  }, []);

  return (
    <Box sx={{ px: 5, pb: 3 }} justifyContent="center" textAlign="center">
      <Typography variant="h5">Registered quantity of anomalies</Typography>
      <Typography color="red">{statistcs?.count_anomalies}</Typography>

      <Typography variant="h5" mt={3}>
        Registered quantity of non anomalies
      </Typography>
      <Typography color="green">{statistcs?.count_no_anomalies}</Typography>

      <Typography variant="h5" mt={3}>
        Ratio
      </Typography>
      <Typography color="blue">{statistcs?.ratio}</Typography>
    </Box>
  );
};
