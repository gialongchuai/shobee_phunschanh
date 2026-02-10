export interface SuccessResponse<T> {
  code: number
  message: string
  result?: T
}