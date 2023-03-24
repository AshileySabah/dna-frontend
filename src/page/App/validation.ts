import * as yup from "yup";

export const validation = yup.object().shape({
  dimension: yup
    .number()
    .transform((current, original) =>
      original === "" || original === undefined ? null : Number(original),
    )
    .typeError("The dimension must be a numeric type.")
    .min(3, "The minimum dimension is 3.")
    .max(2000, "The maximum dimension is 2000.")
    .required(),
  matrix: yup
    .array()
    .required("The matrix field is required.")
    .test(
      "testIfLengthIsCorrect",
      "The amount of elements of the matrix is not corret.",
      (array) => {
        const dimension = Math?.sqrt(Number(array?.length));
        return Number?.isInteger(dimension);
      },
    ),
});
