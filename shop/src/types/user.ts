// type Role = 'User' | 'Admin'

export interface Address {
  apartmentNumber: string
  floor: string
  building: string
  streetNumber: string
  street: string
  city: string
  country: string
  addressType: number
  userResponse: any
  createdAt: string
  createdBy: string | null
  id: number
  updatedAt: string
  updatedBy: string | null
}

export interface UserHasRoleResponse {
  roleResponse: any
  userResponse: any
  createdAt: string | null
  createdBy: string | null
  id: number | null
  updatedAt: string | null
  updatedBy: string | null
}

type gender = 'male' | 'female' | 'other' // Có thể mở rộng thêm nếu cần
type userType = 'user' | 'admin' // Có thể mở rộng thêm nếu cần
type userStatus = 'active' | 'inactive' // Có thể mở rộng thêm nếu cần

export interface User {
  firstName: string
  lastName: string
  dateOfBirth: string // ISO string
  gender: gender
  phone: string
  email: string
  username: string
  password: string | null
  type: userType
  status: userStatus
  addressResponses: Address[]
  groupHasUserResponses: any // Chưa rõ cấu trúc, để tạm là any
  userHasRoleResponses: UserHasRoleResponse[]
  createdAt: string // ISO string
  createdBy: string | null
  id: number
  updatedAt: string // ISO string
  updatedBy: string | null
}

export interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  username: string;
  password: string;
  type: string;      // Optional vì có thể default ở backend, nhưng ta vẫn gửi
  status: string;    // Optional
  addresses: {
    apartmentNumber: string;
    floor: string;
    building: string;
    streetNumber: string;
    street: string;
    city: string;
    country: string;
  }[];
}