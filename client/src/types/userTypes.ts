import { TEventWithId } from "@/types/eventTypes";

export type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  phone: number;
  events: TEventWithId[];
};

export type TUserWithPassword = TUser & {
  password: string;
  confirmPassword: string;
};
