export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
}

export type DecodedJwt = Pick<AuthResponse, 'email' | 'role'> & { exp?: number };
