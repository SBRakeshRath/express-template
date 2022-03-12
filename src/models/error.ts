const Codes = [
  "INTERNAL_ERROR",
  "SUCCESS",
  "CREATED",
  "BAD_REQUEST",
  "UNAUTHORIZED",
  "PAYMENT_REQUIRED",
  "FORBIDDEN",
  "PAGE_NOT_FOUND",
] as const;

export type errorCodes = typeof Codes[number];

const defaultError: {
  "200": errorCodes;
  "201": errorCodes;
  "400": errorCodes;
  "401": errorCodes;
  "402": errorCodes;
  "403": errorCodes;
  "404": errorCodes;
  "500": errorCodes;
} = {
  "200": "SUCCESS",
  "201": "CREATED",
  "400": "BAD_REQUEST",

  "401": "UNAUTHORIZED",
  "402": "PAYMENT_REQUIRED",
  "403": "FORBIDDEN",
  "404": "PAGE_NOT_FOUND",
  "500": "INTERNAL_ERROR",
};

export default class CustomError extends Error {
  code: errorCodes = "INTERNAL_ERROR";
  message: string = "An error occurred";
  status: number = 500;
  constructor(status: string | number, code?: errorCodes, message?: string) {
    super("");

    if (typeof status === "string") {
      this.setErrorFromString(status);
    } else this.setErrorFromStatusCode(status);

    if (code) {
      this.code = code;
    }

    if (message) {
      this.message = message;
    }
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  setErrorFromString(code: string) {
    this.status = 500;
    this.message = code;
    this.code = "INTERNAL_ERROR";
  }

  setErrorFromStatusCode(status: number) {
    this.status = status;
    this.code =
      defaultError[status.toLocaleString() as keyof typeof defaultError] ||
      "INTERNAL_ERROR";
  }

  returnError() {
    return { code: this.code, message: this.message, status: this.status };
  }
}

export { Codes, defaultError };
