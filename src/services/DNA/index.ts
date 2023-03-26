import { api } from "../api";
import { IStatisticsDTO, IMatrixDTO, IValidateAnomalyDTO } from "./types";

const validateAnomaly = (data: IMatrixDTO): Promise<IValidateAnomalyDTO> => {
  return api.post("/validate-anomaly ", data);
};

const getStatistcs = (): Promise<IStatisticsDTO> => {
  return api.get("/stats").then((resp) => resp.data);
};

export const dnaService = {
  validateAnomaly,
  getStatistcs,
};
