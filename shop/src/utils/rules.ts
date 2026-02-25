import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
import * as yup from "yup";
// import { AnyObject } from 'yup/lib/types'

type Rules = {
  [key in
    | "username"
    | "email"
    | "password"
    | "confirm_password"
    | "firstName"
    | "lastName"
    | "phone"
    | "dateOfBirth"
    | "gender"
    | "streetNumber"
    | "street"
    | "ward"
    | "district"
    | "city"
    | "apartmentNumber"
    | "floor"
    | "country"
    | "building"]?: RegisterOptions;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  username: {
    required: {
      value: true,
      message: "Username là bắt buộc",
    },
  },
  email: {
    required: {
      value: true,
      message: "Email là bắt buộc",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Email không đúng định dạng",
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 5 - 160 ký tự",
    },
    minLength: {
      value: 5,
      message: "Độ dài từ 5 - 160 ký tự",
    },
  },
  password: {
    required: {
      value: true,
      message: "Password là bắt buộc",
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 160 ký tự",
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 160 ký tự",
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: "Nhập lại password là bắt buộc",
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 160 ký tự",
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 160 ký tự",
    },
    validate:
      typeof getValues === "function"
        ? (value) =>
            value === getValues("password") || "Nhập lại password không khớp"
        : undefined,
  },
  firstName: { required: { value: true, message: "Tên là bắt buộc" } },
  lastName: { required: { value: true, message: "Họ là bắt buộc" } },
  phone: {
    required: { value: true, message: "Số điện thoại là bắt buộc" },
    pattern: {
      value: /^(0|\+84)[0-9]{9}$/,
      message: "Số điện thoại không hợp lệ",
    },
  },
  dateOfBirth: { required: { value: true, message: "Ngày sinh là bắt buộc" } },
  gender: { required: { value: true, message: "Chọn giới tính" } },

  apartmentNumber: {required  : { value: true, message: "Số căn hộ là bắt buộc" }},
  floor: {required  : { value: true, message: "Tầng là bắt buộc" }},
  building: {required  : { value: true, message: "Tòa nhà là bắt buộc" }},

  // Địa chỉ
  streetNumber: { required: { value: true, message: "Số nhà là bắt buộc" } },
  street: { required: { value: true, message: "Tên đường là bắt buộc" } },
  ward: { required: { value: true, message: "Phường/Xã là bắt buộc" } },
  district: { required: { value: true, message: "Quận/Huyện là bắt buộc" } },
  city: { required: { value: true, message: "Tỉnh/Thành phố là bắt buộc" } },
  country: { required: { value: true, message: "Quốc gia là bắt buộc" } },
});

// function testPriceMinMax(this: yup.TestContext<AnyObject>) {
//   const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
//   if (price_min !== '' && price_max !== '') {
//     return Number(price_max) >= Number(price_min)
//   }
//   return price_min !== '' || price_max !== ''
// }

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .min(2, "Độ dài từ 2 - 160 ký tự")
    .max(160, "Độ dài từ 2 - 160 ký tự")
    .oneOf([yup.ref(refString)], "Nhập lại password không khớp");
};

export const schema = yup.object({
  username: yup
    .string()
    .required("Username là bắt buộc")
    .min(2, "Độ dài từ 2 - 160 ký tự")
    .max(160, "Độ dài từ 2 - 160 ký tự"),
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không đúng định dạng")
    .min(2, "Độ dài từ 2 - 160 ký tự")
    .max(160, "Độ dài từ 2 - 160 ký tự"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(2, "Độ dài từ 2 - 160 ký tự")
    .max(160, "Độ dài từ 2 - 160 ký tự"),
  confirm_password: handleConfirmPasswordYup("password"),
  // --- Thông tin cá nhân ---
  firstName: yup.string().required("Tên là bắt buộc").max(50),
  lastName: yup.string().required("Họ là bắt buộc").max(50),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^(0|\+84)[0-9]{9}$/, "Số điện thoại không hợp lệ (VN)"),

  dateOfBirth: yup
    .string()
    .required("Ngày sinh là bắt buộc")
    .test("is-adult", "Bạn phải trên 18 tuổi", (value) => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }),

  gender: yup
    .string()
    .required("Giới tính là bắt buộc")
    .oneOf(["male", "female", "other"], "Giới tính không hợp lệ"),

  // --- Thông tin địa chỉ (Phẳng - Single Address) ---
  apartmentNumber: yup.string().required("Số căn hộ là bắt buộc").max(20), // Số căn hộ (optional)
  floor: yup.string().required("Tầng là bắt buộc").max(10), // Tầng (optional)
  building: yup.string().required("Tòa nhà là bắt buộc").max(100), // Tòa nhà (optional)
  streetNumber: yup.string().required("Số nhà là bắt buộc").max(20),
  street: yup.string().required("Tên đường là bắt buộc").max(100),
  ward: yup.string().required("Phường/Xã là bắt buộc").max(100),
  district: yup.string().required("Quận/Huyện là bắt buộc").max(100),
  city: yup.string().required("Tỉnh/Thành phố là bắt buộc").max(100),
  country: yup.string().required("Quốc gia là bắt buộc").max(100),
  // price_min: yup.string().test({
  //   name: 'price-not-allowed',
  //   message: 'Giá không phù hợp',
  //   test: testPriceMinMax
  // }),
  // price_max: yup.string().test({
  //   name: 'price-not-allowed',
  //   message: 'Giá không phù hợp',
  //   test: testPriceMinMax
  // }),
  // name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
});

// export const userSchema = yup.object({
//   name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
//   phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
//   address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
//   avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
//   date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
//   password: schema.fields['password'],
//   new_password: schema.fields['password'],
//   confirm_password: handleConfirmPasswordYup('new_password')
// })

// export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>;
