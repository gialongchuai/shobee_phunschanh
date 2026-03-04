// type Role = 'User' | 'Admin'

// == Create New User ===
export interface AddressRequest {
  building: string;
  streetNumber: string;
  street: string;
  city: string;
  country: string;
  apartmentNumber: string;
  floor: string;
  addressType: string;
}

export interface UserRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  addresses: AddressRequest[];
  type: string;
  status: string;
}

// === User login ===
export interface LoginRequest {
  username: string;
  password: string;
}


// == User Responense ===
export interface AddressResponse {
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

export interface UserResponse {
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
  addressResponses: AddressResponse[]
  groupHasUserResponses: any // Chưa rõ cấu trúc, để tạm là any
  userHasRoleResponses: UserHasRoleResponse[]
  createdAt: string // ISO string
  createdBy: string | null
  id: number
  updatedAt: string // ISO string
  updatedBy: string | null
}

// === Product