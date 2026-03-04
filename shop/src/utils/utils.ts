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

export function isAxiosUnauthorizedError<T>(
  error: unknown,
): error is AxiosError<T> {
  return (
    isAxiosError<T>(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}