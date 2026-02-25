import type { AuthResponse } from "../types/auth";
import type { RegisterBody } from "../types/user";
import http from "../utils/http";

export const loginAccount = (body: { username: string; password: string }) =>
  http.post<AuthResponse>("/auth/access", body);

export const registerAccount = (body: RegisterBody) => http.post<AuthResponse>("/user/", body);