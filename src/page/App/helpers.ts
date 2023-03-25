export const createMatrix = (dimension: number) => {
  const newMatrix: string[][] = [];
  for (let i = 0; i < Number(dimension); i++) {
    const row = new Array(Number(dimension))?.fill("");
    newMatrix?.push(row);
  }
  return newMatrix;
};

export const getVertical = (matrix: string[][]) => {
  const dimension = matrix?.length;
  const verticalArrays = [];
  for (let column = 0; column < dimension; column++) {
    const eachVerticalArrays = [];
    for (let row = 0; row < dimension; row++) {
      eachVerticalArrays?.push(matrix[row][column]);
    }
    verticalArrays?.push(eachVerticalArrays);
  }
  return verticalArrays;
};

export const getRemaningDiagonal = (matrix: string[][], dimension: number) => {
  const diagonalArrays = [];

  for (let i = 1; i < dimension - 1; i++) {
    const diagonal1 = [];
    const diagonal2 = [];
    for (let j = 0; j <= i; j++) {
      diagonal1?.push(matrix[i - j][j]);
      diagonal2?.push(matrix[dimension - 1 - i + j][dimension - 1 - j]);
    }
    diagonalArrays?.push(diagonal1);
    diagonalArrays?.push(diagonal2);
  }

  for (let i = 1; i < dimension - 1; i++) {
    const diagonal1 = [];
    const diagonal2 = [];
    for (let j = 0; j <= i; j++) {
      diagonal1?.push(matrix[j][i - j]);
      diagonal2?.push(matrix[dimension - 1 - j][dimension - 1 - i + j]);
    }
    diagonalArrays?.push(diagonal1);
    diagonalArrays?.push(diagonal2);
  }

  return diagonalArrays;
};

export const reverseMultidimentionalArray = (matrix: string[][]) => {
  const dimension = matrix?.length;
  const newMatrix = [];

  for (let i = 0; i < dimension; i++) {
    const reverseArray = matrix[i]?.reverse();
    newMatrix?.push(reverseArray);
  }

  return newMatrix;
};

export const removeDuplicateArrays = (matrix: string[][]) => {
  const uniqueArrays: string[][] = [];
  for (const array of matrix) {
    let exists = false;
    for (const uniqueArr of uniqueArrays) {
      if (
        array?.length === uniqueArr?.length &&
        array?.every((elem) => uniqueArr?.includes(elem))
      ) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      uniqueArrays?.push(array);
    }
  }
  return uniqueArrays;
};

export const getDiagonal = (matrix: string[][]) => {
  const dimension = matrix?.length;
  const diagonalArrays = [];

  const mainDiagonal = [];
  for (let i = 0; i < dimension; i++) {
    mainDiagonal?.push(matrix[i][i]);
  }
  diagonalArrays?.push(mainDiagonal);

  const secondaryDiagonal = [];
  for (let i = 0; i < dimension; i++) {
    secondaryDiagonal?.push(matrix[i][dimension - i - 1]);
  }
  diagonalArrays?.push(secondaryDiagonal);

  const topLeftToRightBottom = getRemaningDiagonal(matrix, dimension);
  const topTopRightToLeftBottom = getRemaningDiagonal(
    reverseMultidimentionalArray(matrix),
    dimension,
  );

  diagonalArrays?.push(...topLeftToRightBottom);
  diagonalArrays?.push(...topTopRightToLeftBottom);

  // Remove empty diagonals
  return removeDuplicateArrays(diagonalArrays);
};

export const checkEqualAndConsecutiveItems = (array: string[]) => {
  for (let i = 0; i < array?.length - 2; i++) {
    if (array[i] === array[i + 1] && array[i + 1] === array[i + 2]) {
      return true;
    }
  }
  return false;
};

export const identifyAnomalies = (matrix: string[][]) => {
  const diagonalArray = getDiagonal(matrix);
  const verticalArray = getVertical(matrix);

  const diagonalOccurrences: number[] = [];
  for (let i = 0; i < diagonalArray?.length; i++) {
    const checkAnomaliesDiagonal = checkEqualAndConsecutiveItems(
      diagonalArray[i],
    );
    if (checkAnomaliesDiagonal) {
      diagonalOccurrences?.push(1);
    }
  }

  const verticalOccurrences: number[] = [];
  for (let i = 0; i < verticalArray?.length; i++) {
    const checkAnomaliesVertical = checkEqualAndConsecutiveItems(
      verticalArray[i],
    );
    if (checkAnomaliesVertical) {
      verticalOccurrences?.push(1);
    }
  }

  const horizontalOccurrences: number[] = [];
  for (let i = 0; i < matrix?.length; i++) {
    const checkAnomaliesHorizontal = checkEqualAndConsecutiveItems(matrix[i]);
    if (checkAnomaliesHorizontal) {
      horizontalOccurrences?.push(1);
    }
  }

  return {
    diagonalOccurrences: diagonalOccurrences?.length,
    verticalOccurrences: verticalOccurrences?.length,
    horizontalOccurrences: horizontalOccurrences?.length,
  };
};
