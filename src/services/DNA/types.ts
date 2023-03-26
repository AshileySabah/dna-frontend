export interface IMatrixDTO {
  matrix: string;
}

export interface IValidateAnomalyDTO {
  message: string;
  anomaly: boolean;
}

export interface IStatisticsDTO {
  count_anomalies: number;
  count_no_anomalies: number;
  ratio: number;
}
