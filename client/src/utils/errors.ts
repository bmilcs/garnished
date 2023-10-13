// this function is used to retrieve the error message from an error object
// if the error is not an instance of Error, it will be converted to a string

export const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : String(error);
};
