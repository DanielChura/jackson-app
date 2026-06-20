export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface UserResponse {
  id: string;
  firstName: string;
  email: string;
  phone?: string;
  address?: string;
  roleName: string;
}
