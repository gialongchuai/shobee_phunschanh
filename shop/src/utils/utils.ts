import type { AxiosError } from "axios";
import axios from "axios";
import HttpStatusCode from "../constants/httpStatusCode";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isAxiosBadRequestError<T>(
  error: unknown,
): error is AxiosError<T> {
  return (
    isAxiosError<T>(error) &&
    error.response?.status === HttpStatusCode.BadRequest
  );
}
