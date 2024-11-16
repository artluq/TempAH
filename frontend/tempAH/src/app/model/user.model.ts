export interface User {
  userId: number;
  username: string;
  passwordHash: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  createdAt: Date; // Use Date instead of string if you prefer Date objects
  isActive: boolean;
  roleId: number;
  role: string;
}