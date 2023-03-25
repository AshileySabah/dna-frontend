import * as yup from "yup";
import { insertMethods } from "./types";

const validateStringArray = (matrix: string) => {
  try {
    const array = JSON?.parse(matrix);
    const isArray = Array?.isArray(array);
    return {
      array,
      isArray,
    };
  } catch {
    return {
      array: null,
      isArray: false,
    };
  }
};

const validateIsMultidimentionalArray = (matrix: []) => {
  for (let i = 0; i < matrix?.length; i++) {
    if (Array?.isArray(matrix[i])) {
      return true;
    }
  }
  return false;
};

const destructureMultidimentionalArray = (matrix: []): any[] => {
  const flattened = [];

  for (let i = 0; i < matrix?.length; i++) {
    if (Array.isArray(matrix[i])) {
      flattened.push(...destructureMultidimentionalArray(matrix[i]));
    } else {
      flattened.push(matrix[i]);
    }
  }

  return flattened;
};

const validateMatrixDimension = (matrix: []) => {
  const matrixLength = destructureMultidimentionalArray(matrix)?.length;
  const dimension = Math.sqrt(matrixLength);

  if (Number?.isInteger(dimension) && dimension >= 3 && dimension <= 2000) {
    return true;
  }
  return false;
};

export const validation = yup.object().shape({
  dimension: yup
    .number()
    .transform((current, original) =>
      original === "" || original === undefined ? null : Number(original),
    )
    .nullable()
    .when("insertMethod", {
      is: "MI",
      then: yup
        .number()
        .transform((current, original) =>
          original === "" || original === undefined ? null : Number(original),
        )
        .typeError("The dimension must be a numeric type.")
        .min(3, "The minimum dimension is 3.")
        .max(10, "The maximum dimension is 10.")
        .required("Dimension is required."),
    }),
  matrixInterfaceField: yup
    .array()
    .notRequired()
    .when("insertMethod", {
      is: "MI",
      then: yup
        .array()
        .of(
          yup
            .array()
            .of(yup.string().required("The matrix's field is required")),
        )
        .required("Matrix is required.")
        .test(
          "testIfIsMultidimentional",
          "This array is not a multidimentional array.",
          (array: any) => validateIsMultidimentionalArray(array),
        )
        .test(
          "testIfDimensionIsAcceptable",
          "This multidimentional array does not have the dimension between 3 and 2000.",
          (array: any) => validateMatrixDimension(array),
        ),
    }),
  matrixEnterArrayField: yup
    .mixed()
    .notRequired()
    .when("insertMethod", {
      is: "EA",
      then: yup
        .mixed()
        .required("Matrix is required.")
        .test(
          "testIfStringIsEmpty",
          "Matrix is required.",
          (array: any) => array !== "",
        )
        .test(
          "testIfStringIsArray",
          "The typed value is not a array.",
          (array: any) => validateStringArray(array)?.isArray,
        )
        .test(
          "testIfIsMultidimentional",
          "This array is not a multidimentional array.",
          (array: any) => {
            const parsedArray = validateStringArray(array)?.array;
            return validateIsMultidimentionalArray(parsedArray);
          },
        )
        .test(
          "testIfDimensionIsAcceptable",
          "This multidimentional array does not have the dimension between 3 and 2000.",
          (array: any) => {
            const parsedArray = validateStringArray(array)?.array;
            return validateMatrixDimension(parsedArray);
          },
        ),
    }),
  insertMethod: yup
    .string()
    .oneOf(Object.entries(insertMethods).map(([value]) => value))
    .required("Campo obrigatório."),
});
