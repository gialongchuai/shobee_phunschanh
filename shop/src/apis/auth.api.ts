import type { AuthResponse } from "../types/auth";
import type { LoginRequest, UserRequest } from "../types/user";
import http from "../utils/http";

export const loginAccount = (body: LoginRequest) =>
  http.post<AuthResponse>("/auth/access", body);

export const createUser = (body: UserRequest) => http.post<AuthResponse>("/user/", body);