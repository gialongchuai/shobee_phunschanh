export const setAccessTokenToLS = (accessToken: string) => {
    localStorage.setItem('access_token', accessToken);
}
export const setRefreshTokenToLS = (refreshToken: string) => {
    localStorage.setItem('refresh_token', refreshToken);
}

export const getAccessTokenFromLS = () => {
    return localStorage.getItem('access_token') || '';
}
export const getRefreshTokenFromLS = () => {
    return localStorage.getItem('refresh_token') || '';
}

export const removeAccessTokenFromLS = () => {
    localStorage.removeItem('access_token');
}
export const removeRefreshTokenFromLS = () => {
    localStorage.removeItem('refresh_token');
}