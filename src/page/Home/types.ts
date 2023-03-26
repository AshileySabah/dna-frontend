export type insertMethodsType = "MI" | "EA";

export const insertMethods: Record<insertMethodsType, string> = {
  MI: "Matrix interface",
  EA: "Enter array",
};

export interface IDNATest {
  dimension: number | "";
  matrixInterfaceField: string[][];
  matrixEnterArrayField: string;
  insertMethod: insertMethodsType;
}

export const defaultValues: IDNATest = {
  dimension: "",
  matrixInterfaceField: [],
  matrixEnterArrayField: "",
  insertMethod: "MI",
};
