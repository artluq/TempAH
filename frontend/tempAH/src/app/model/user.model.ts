export interface User {
  userId?: number; // Mark as optional
  username?: string;
  passwordHash?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  createdAt?: Date;
  isActive?: boolean;
  roleId?: number;
  role?: string;
}