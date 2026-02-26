import type { UserRequest } from "../types/user";
import type { Schema } from "./rules";

export const transformRegisterFormData = (
  data: Schema,
): Omit<UserRequest, "confirm_password"> => {
  const {
    confirm_password,
    apartmentNumber,
    floor,
    building,
    streetNumber,
    street,
    city,
    country,
    addressType,
    ...rest
  } = data;
  return {
    ...rest,
    status: 'active', // Mặc định là active, có thể thay đổi nếu cần
     type: 'user', // Mặc định là user, có thể thay đổi nếu cần
    addresses: [{
      apartmentNumber: data.apartmentNumber,
      floor: data.floor,
      building: data.building,
      streetNumber: data.streetNumber,
      street: data.street,
      city: data.city,
      country: data.country,
      addressType: data.addressType,
    }],
  };
};
