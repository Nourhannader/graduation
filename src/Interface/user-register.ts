export interface UserRegister {
  firstName: string;
  lastName: string;
  userName: string;
  phone?: string;
  email: string;
  password: string;
  confirmPassword: string;
  imageFile?: File; 
  role: string;
}
