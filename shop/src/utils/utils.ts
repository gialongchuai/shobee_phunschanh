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
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'