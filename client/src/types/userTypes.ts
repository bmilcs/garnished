export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  phone: number;
}

export interface IUserWithPassion extends IUser {
  password: string;
  confirmPassword: string;
}
