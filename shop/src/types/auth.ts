import type { ApiResponse } from "./api";

export type AuthResponse = ApiResponse<{    
    accessToken: string
    refreshToken: string
    userId: number
}>;