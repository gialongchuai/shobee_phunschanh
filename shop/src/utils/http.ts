import axios, { type AxiosInstance } from "axios";
import type { AuthResponse } from "../types/auth";
import { getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setProfileToLS, setRefreshTokenToLS } from "./auth";

class Http {
  instance: AxiosInstance;

  // Khai báo biến lưu trữ token trong class để dễ dàng quản lý và cập nhật khi có thay đổi mà không cần phải truy cập localStorage nhiều lần, giúp tối ưu hiệu suất và giảm thiểu lỗi do đồng bộ hóa token giữa localStorage và biến trong class. Dùng ở interceptor để cập nhật token mới khi có response từ login/logout mà không cần phải truy cập localStorage, tránh lỗi do localStorage chưa kịp cập nhật hoặc bị xóa ngoài ý muốn. Khi khởi tạo class, sẽ lấy token từ localStorage để đảm bảo có token mới nhất ngay khi ứng dụng bắt đầu.
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.instance = axios.create({
      baseURL: "http://localhost:8080/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    //     curl --location --request POST 'http://localhost:8080/auth/logout' \
    // --header 'accept: */*' \
    // --header 'Content-Type: application/json' \
    // --header 'Authorization: eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbIkZBQ1RPUl9QQVNTV09SRCJdLCJ1c2VySWQiOjYxLCJzdWIiOiJoZWhlIiwiaWF0IjoxNzcyMTc2ODM1LCJleHAiOjE3NzIxODA0MzV9.TrSHv8cQ5j3sJHlbECGz5rIUCRMccijaPFgmGwkW1Go' \
    // --header 'Accept-Language: en-US'

    this.instance.interceptors.request.use((config) => {
      const accessToken = this.accessToken || localStorage.getItem("access_token");
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: accessToken
        };
      }
      console.log("HTTP Request:", config);
      return config;
    });

    this.instance.interceptors.response.use((response) => {
      console.log("HTTP Response:", response);
      const { url } = response.config;
      if (url === "/auth/access" && response.status === 200) {
        const result = (response.data as AuthResponse).result;
        this.accessToken = result.accessToken;
        this.refreshToken = result.refreshToken;
        setAccessTokenToLS(this.accessToken);
        setRefreshTokenToLS(this.refreshToken);
        setProfileToLS(result.username);
      } else if (url === "/auth/logout" && response.status === 200) {
        this.accessToken = null;
        this.refreshToken = null;
        setAccessTokenToLS("");
        setRefreshTokenToLS("");
        setProfileToLS("");
      }

      return response;
    });
  }
}

const http = new Http().instance;
export default http;
