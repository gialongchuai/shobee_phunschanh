import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerAccount } from "../../apis/auth.api";
import Input from "../../components/Input/Input";
import type { RegisterBody } from "../../types/user";
import { schema, type Schema } from "../../utils/rules";
import { isAxiosBadRequestError } from "../../utils/utils";
import type { ApiResponse } from "../../types/api";

// Lấy tất cả các trường cần thiết cho đăng ký (Flat structure - không phải mảng)
type FormData = Pick<
  Schema,
  | "username"
  | "email"
  | "password"
  | "confirm_password"
  | "firstName"
  | "lastName"
  | "phone"
  | "dateOfBirth"
  | "gender"
  | "apartmentNumber"
  | "floor"
  | "building"
  | "streetNumber"
  | "street"
  | "ward"
  | "city"
  | "country"
>;

const registerSchema = schema.pick([
  "username",
  "email",
  "password",
  "confirm_password",
  "firstName",
  "lastName",
  "phone",
  "dateOfBirth",
  "gender",
  "apartmentNumber",
  "floor",
  "building",
  "streetNumber",
  "street",
  "ward",
  "city",
  "country",
]);

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  // const rules = getRules();

  // Cấu hình Mutation (nếu dùng React Query)
  const registerMutation = useMutation({
    mutationFn: (body: RegisterBody) => registerAccount(body),
    onSuccess: (data) => {
      console.log("Đăng ký thành công:", data);
      alert("Đăng ký thành công!");
      // http://localhost:3000/login
      window.location.href = "/login"; // Chuyển hướng sang trang login hoặc home
    },
    onError: (error) => {
      if (isAxiosBadRequestError<ApiResponse<FormData>>(error)) {
        console.log("Lỗi phản hồi từ server:", error);
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    // 1. Xây dựng payload chuẩn API (KHÔNG bao gồm confirm_password)
    const payload: RegisterBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      username: data.username,
      password: data.password,
      type: "user",
      status: "active",
      addresses: [
        {
          apartmentNumber: data.apartmentNumber || "",
          floor: data.floor || "",
          building: data.building || "",
          streetNumber: data.streetNumber,
          street: data.street,
          city: data.city,
          country: data.country,
        },
      ],
    };

    console.log("Gửi đi:", payload);

    // 2. Gọi API
    registerMutation.mutate(payload);

    // Nếu không dùng React Query, gọi trực tiếp:
    // authApi.register(payload).then(...).catch(...)
  });

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
                    // rules={rules.username}
                  />
                  <Input
                    name="email"
                    register={register}
                    type="email"
                    errorMessage={errors.email?.message}
                    placeholder="Email (*)"
                    // rules={rules.email}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    name="password"
                    register={register}
                    type="password"
                    errorMessage={errors.password?.message}
                    placeholder="Mật khẩu (*)"
                    // rules={rules.password}
                  />
                  <Input
                    name="confirm_password"
                    register={register}
                    type="password"
                    errorMessage={errors.confirm_password?.message}
                    placeholder="Xác nhận mật khẩu (*)"
                    // rules={rules.confirm_password}
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
                    // rules={rules.firstName}
                  />
                  <Input
                    name="lastName"
                    register={register}
                    type="text"
                    errorMessage={errors.lastName?.message}
                    placeholder="Họ (*)"
                    // rules={rules.lastName}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    name="phone"
                    register={register}
                    type="tel"
                    errorMessage={errors.phone?.message}
                    placeholder="Số điện thoại (*)"
                    // rules={rules.phone}
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
                  <div className="flex gap-6">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded">
                  <Input
                    name="apartmentNumber"
                    register={register}
                    type="text"
                    errorMessage={errors.apartmentNumber?.message}
                    placeholder="Số căn hộ (Nếu có)"
                    // rules={rules.apartmentNumber}
                  />
                  <Input
                    name="floor"
                    register={register}
                    type="text"
                    errorMessage={errors.floor?.message}
                    placeholder="Tầng (Nếu có)"
                    // rules={rules.floor}
                  />
                  <Input
                    name="building"
                    register={register}
                    type="text"
                    errorMessage={errors.building?.message}
                    placeholder="Tòa nhà (Nếu có)"
                    // rules={rules.building}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="streetNumber"
                    register={register}
                    type="text"
                    errorMessage={errors.streetNumber?.message}
                    placeholder="Số nhà (*)"
                    // rules={rules.streetNumber}
                  />
                  <Input
                    name="street"
                    register={register}
                    type="text"
                    errorMessage={errors.street?.message}
                    placeholder="Tên đường (*)"
                    // rules={rules.street}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Input
                    name="ward"
                    register={register}
                    type="text"
                    errorMessage={errors.ward?.message}
                    placeholder="Phường / Xã (*)"
                    // rules={rules.ward}
                  />
                  <Input
                    name="city"
                    register={register}
                    type="text"
                    errorMessage={errors.city?.message}
                    placeholder="Tỉnh / Thành phố (*)"
                    // rules={rules.city}
                  />
                  <Input
                    name="country"
                    register={register}
                    type="text"
                    errorMessage={errors.country?.message}
                    placeholder="Quốc gia (*)"
                    // rules={rules.country}
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
