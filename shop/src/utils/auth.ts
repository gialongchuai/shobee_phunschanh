export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};
export const setRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem("refresh_token", refreshToken);
};

// set Profile by username
export const setProfileToLS = (username: string) => {
  localStorage.setItem("username", username);
};

export const getAccessTokenFromLS = () => {
  return localStorage.getItem("access_token") || "";
};
export const getRefreshTokenFromLS = () => {
  return localStorage.getItem("refresh_token") || "";
};

export const getProfileFromLS = () => {
  return localStorage.getItem("username") || "";
};

export const clearLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");
};
