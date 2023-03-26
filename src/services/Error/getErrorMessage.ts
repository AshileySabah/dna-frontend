import axios from "axios";

const errors = {
  default: "An error has occurred, please try again.",
  internal: "Internal server error.",
};

export const getErrorMessage = (err: Error | unknown): string => {
  if (axios.isAxiosError(err)) {
    const resp = err?.response;

    if (resp) {
      if (resp?.status === 500) {
        return errors?.internal;
      }

      if (resp?.data?.message === null) {
        return errors?.default;
      }

      const message =
        resp.data?.errors?.length > 0
          ? resp?.data?.errors[0]?.message
          : resp?.data?.message;
      return message;
    }
  }

  return errors.default;
};
