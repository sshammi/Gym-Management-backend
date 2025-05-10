export type UserRole = 'admin' | 'trainer' | 'trainee';
export type IUserData = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  contactNo?: string;
  address?: string;
  profileImg?: string;
};
  