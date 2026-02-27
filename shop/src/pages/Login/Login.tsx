import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginAccount } from "../../apis/auth.api";
import Input from "../../components/Input/Input";
import { schema, type Schema } from "../../utils/rules";
import { useContext, useState } from "react";
import {
  isAxiosBadRequestError,
  isAxiosUnauthorizedError,
} from "../../utils/utils";
import type { ApiResponse } from "../../types/api";
import { AppContext } from "../../contexts/app.context";

type FormData = Pick<Schema, "username" | "password">;
const loginSchema = schema.pick(["username", "password"]);

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  // const onSubmit = handleSubmit((data) => console.log(data));

  const loginMutation = useMutation({
    mutationFn: loginAccount,
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        setIsAuthenticated(true);
        alert("Đăng nhập thành công!");
        navigate("/");
      },
      onError: (error: any) => {
        let msg = "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.";
        console.log(error);
        if (
          isAxiosBadRequestError<ApiResponse<FormData>>(error) ||
          isAxiosUnauthorizedError<ApiResponse<FormData>>(error)
        ) {
          const data = error.response?.data;

          // Ưu tiên lấy message từ server
          if (data?.message) {
            msg = data.message;
          }
          // // Một số API trả về mảng errors
          // else if (Array.isArray(data?.errors) && data.errors.length > 0) {
          //   msg = data.errors[0].message; // Lấy lỗi đầu tiên làm ví dụ, hoặc nối chuỗi
          // }
        } else if (error.message) {
          msg = error.message; // Lỗi network hoặc timeout
        }

        // 1. Lưu message vào state để hiển thị lên khung Alert đẹp
        setServerMessage(msg);

        // 2. (Tùy chọn) Nếu muốn highlight riêng field nào đó thì dùng setError ở đây
        // Ví dụ: nếu msg chứa 'email' thì setError('email', ...)

        // Cuộn trang lên đầu form để người dùng thấy lỗi
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    });
  });

  // State để lưu thông báo lỗi chung từ server (để hiển thị UI đẹp)
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  // Hàm đóng thông báo lỗi
  const closeServerError = () => setServerMessage(null);

  return (
    <div className="bg-purple-300">
      <div>
        <title>Đăng nhập | Shopee Clone</title>
        <meta name="description" content="Đăng nhập vào dự án Shopee Clone" />
      </div>
      <div className="container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              onSubmit={onSubmit}
              className="rounded bg-white p-10 shadow-sm"
              noValidate
            >
              <div className="text-2xl">Đăng nhập</div>

              {/* --- KHỐI HIỂN THỊ LỖI CHUNG (SERVER ERROR ALERT) --- */}
              {serverMessage && (
                <div className="mb-6 rounded-md bg-red-50 p-4 border-l-4 border-red-500 animate-fade-in-down">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {/* Icon Cảnh báo */}
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-red-800">
                        Đăng nhập không thành công
                      </h3>
                      <div className="mt-1 text-sm text-red-700">
                        {serverMessage}
                      </div>
                    </div>
                    <div className="ml-auto pl-3">
                      <div className="-mx-1.5 -my-1.5">
                        <button
                          type="button"
                          onClick={closeServerError}
                          className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                        >
                          <span className="sr-only">Dismiss</span>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* ------------------------------------------------------- */}

              <Input
                name="username"
                register={register}
                type="username"
                className="mt-8"
                errorMessage={errors.username?.message}
                placeholder="Username"
              />

              <Input
                name="password"
                register={register}
                type="password"
                className="mt-2"
                errorMessage={errors.password?.message}
                placeholder="Password"
              />

              <div className="mt-3">
                <button
                  type="submit"
                  className="flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
                >
                  Đăng nhập
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center text-sm">
                <span className="text-gray-500">Bạn chưa đã có tài khoản?</span>
                <Link
                  className="ml-2 text-red-500 font-semibold hover:underline"
                  to="/register"
                >
                  Đăng ký tại đây
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
