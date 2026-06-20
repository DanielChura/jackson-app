export interface CreateRoleRequest {
  name: string;
  description?: string;
}

export interface RoleResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}
