import type { ApiResponse } from "./api"
import type { UserResponse } from "./user"

export type AuthResponse = ApiResponse<UserResponse>;