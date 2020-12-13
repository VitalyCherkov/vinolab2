export type HasErrorType = {
  hasError: true,
  message: string[],
};

export type ErrorType =
  | { hasError: false }
  | HasErrorType;
