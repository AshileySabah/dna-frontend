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

  // Get remaining diagonals
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

  // Remove empty diagonals
  return diagonalArrays?.filter((diagonal) => diagonal?.length > 0);
};

export const checkEqualAndConsecutiveItems = (array: string[]) => {
  for (let i = 0; i < array?.length - 2; i++) {
    if (array[i] === array[i + 1] && array[i + 1] === array[i + 2]) {
      return true;
    }
  }
  return false;
};
