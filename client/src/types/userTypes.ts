import { TEventWithId } from "@/types/eventTypes";

type TUserBaseInfo = {
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

export type TUser = TUserBaseInfo & {
  _id: string;
  events: TEventWithId[];
};

export type TUserSignup = TUserBaseInfo & {
  password: string;
  confirmPassword: string;
};

export type TUserLoginCredentials = {
  username: string;
  password: string;
};
