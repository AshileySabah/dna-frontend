export const ratioMask = (ratio: string | null | number | undefined) => {
  if (typeof ratio !== "number") {
    return 0;
  }
  return ratio?.toFixed(2);
};
