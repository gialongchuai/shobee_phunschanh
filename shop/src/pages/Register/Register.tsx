import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createUser } from "../../apis/auth.api";
import Input from "../../components/Input/Input";
import type { ApiResponse } from "../../types/api";
import { schema, type Schema } from "../../utils/rules";
import {
  isAxiosBadRequestError,
  isAxiosUnauthorizedError,
} from "../../utils/utils";
import type { UserRequest } from "../../types/user";
import { transformRegisterFormData } from "../../utils/formTransfrom";

// Lấy tất cả các trường cần thiết cho đăng ký (Flat structure - không phải mảng)
type FormData = Schema;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // nhờ yup truyền vào yupResolver để tự động sinh rules và validate
    resolver: yupResolver(schema),
  });

  // const rules = getRules();

  // Cấu hình Mutation (nếu dùng React Query)
  const registerMutation = useMutation({
    mutationFn: (body: Omit<UserRequest, "confirm_password">) =>
      createUser(body),
    onSuccess: (data) => {
      console.log("Đăng ký thành công:", data);
      alert("Đăng ký thành công!");
      // http://localhost:3000/login
      // window.location.href = "/login"; // Chuyển hướng sang trang login hoặc home
    },
    onError: (error: any) => {
      let msg = "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.";
      console.log(error);
      if (isAxiosBadRequestError<ApiResponse<FormData>>(error)) {
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

      if (isAxiosUnauthorizedError<ApiResponse<any>>(error)) {
        msg =
          "Bạn không có quyền thực hiện hành động này. Vui lòng liên hệ quản trị viên.";
      }

      // 1. Lưu message vào state để hiển thị lên khung Alert đẹp
      setServerMessage(msg);

      // 2. (Tùy chọn) Nếu muốn highlight riêng field nào đó thì dùng setError ở đây
      // Ví dụ: nếu msg chứa 'email' thì setError('email', ...)

      // Cuộn trang lên đầu form để người dùng thấy lỗi
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  // Data gửi đi giống với FormData như UserRequest nhưng sao gửi lỗi ?
  const onSubmit = handleSubmit((data: Schema) => {
    console.log("Gửi đi:", data);
    const payload = transformRegisterFormData(data);
    console.log("Payload gửi đi sau khi transform:", payload);

    // 2. Gọi API
    registerMutation.mutate(payload);
    // Nếu không dùng React Query, gọi trực tiếp:
    // authApi.register(payload).then(...).catch(...)
  });

  // State để lưu thông báo lỗi chung từ server (để hiển thị UI đẹp)
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  // Hàm đóng thông báo lỗi
  const closeServerError = () => setServerMessage(null);

  return (
    <div className="bg-purple-300 min-h-screen py-10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:pr-10">
          {/* Form container */}
          <div className="lg:col-span-8 lg:col-start-3">
            <form
              className="rounded bg-white p-8 shadow-md"
              noValidate
              onSubmit={onSubmit}
            >
              <div className="text-2xl font-bold text-center text-red-500 mb-8 uppercase">
                Đăng ký tài khoản mới
              </div>

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
                        Đăng ký không thành công
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

              {/* --- SECTION 1: THÔNG TIN TÀI KHOẢN --- */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                  1. Thông tin đăng nhập
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="username"
                    register={register}
                    type="text"
                    errorMessage={errors.username?.message}
                    placeholder="Username (*)"
                  />
                  <Input
                    name="email"
                    register={register}
                    type="email"
                    errorMessage={errors.email?.message}
                    placeholder="Email (*)"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    name="password"
                    register={register}
                    type="password"
                    errorMessage={errors.password?.message}
                    placeholder="Mật khẩu (*)"
                  />
                  <Input
                    name="confirm_password"
                    register={register}
                    type="password"
                    errorMessage={errors.confirm_password?.message}
                    placeholder="Xác nhận mật khẩu (*)"
                  />
                </div>
              </div>

              {/* --- SECTION 2: THÔNG TIN CÁ NHÂN --- */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                  2. Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    register={register}
                    type="text"
                    errorMessage={errors.firstName?.message}
                    placeholder="Tên (*)"
                  />
                  <Input
                    name="lastName"
                    register={register}
                    type="text"
                    errorMessage={errors.lastName?.message}
                    placeholder="Họ (*)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    name="phone"
                    register={register}
                    type="tel"
                    errorMessage={errors.phone?.message}
                    placeholder="Số điện thoại (*)"
                  />

                  {/* Input ngày sinh */}
                  <div className="">
                    <input
                      type="date"
                      className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm text-gray-600"
                      placeholder="Ngày sinh"
                      {...register("dateOfBirth")}
                    />
                    <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
                      {errors.dateOfBirth?.message}
                    </div>
                  </div>
                </div>

                {/* Chọn giới tính */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giới tính (*)
                  </label>
                  <div className="flex gap-6 justify-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="male"
                        {...register("gender")}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-gray-700">Nam</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="female"
                        {...register("gender")}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-gray-700">Nữ</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="other"
                        {...register("gender")}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-gray-700">Khác</span>
                    </label>
                  </div>
                  <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
                    {errors.gender?.message}
                  </div>
                </div>
              </div>

              {/* --- SECTION 3: ĐỊA CHỈ (SINGLE ADDRESS) --- */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                  3. Địa chỉ liên hệ
                </h3>

                {/* Nhóm các trường optional: Căn hộ, Tầng, Tòa nhà */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 rounded">
                  <Input
                    name="apartmentNumber"
                    register={register}
                    type="text"
                    errorMessage={errors.apartmentNumber?.message}
                    placeholder="Số căn hộ (*)"
                  />
                  <Input
                    name="floor"
                    register={register}
                    type="text"
                    errorMessage={errors.floor?.message}
                    placeholder="Tầng (*)"
                  />
                  <Input
                    name="building"
                    register={register}
                    type="text"
                    errorMessage={errors.building?.message}
                    placeholder="Tòa nhà (*)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="streetNumber"
                    register={register}
                    type="text"
                    errorMessage={errors.streetNumber?.message}
                    placeholder="Số nhà (*)"
                  />
                  <Input
                    name="street"
                    register={register}
                    type="text"
                    errorMessage={errors.street?.message}
                    placeholder="Tên đường (*)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Input
                    name="addressType"
                    register={register}
                    type="text"
                    errorMessage={errors.addressType?.message}
                    placeholder="Loại nhà (1, 2, ...) (*)"
                  />
                  <Input
                    name="city"
                    register={register}
                    type="text"
                    errorMessage={errors.city?.message}
                    placeholder="Tỉnh / Thành phố (*)"
                  />
                  <Input
                    name="country"
                    register={register}
                    type="text"
                    errorMessage={errors.country?.message}
                    placeholder="Quốc gia (*)"
                  />
                </div>
              </div>

              {/* Nút Submit */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-4 px-4 text-uppercase font-semibold hover:bg-red-600 transition-colors rounded-sm"
                >
                  ĐĂNG KÝ NGAY
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center text-sm">
                <span className="text-gray-500">Bạn đã có tài khoản?</span>
                <Link
                  className="ml-2 text-red-500 font-semibold hover:underline"
                  to="/login"
                >
                  Đăng nhập tại đây
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
