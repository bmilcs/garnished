export type TEvent = {
  date: string;
  time: string;
  locationDescription: string;
  address: string;
  city: string;
  state: string;
  // leading zeros cause a TS error
  zip: string;
  guests: number;
  hours: number;
  eventType: string;
  needBar: boolean;
  needTent: boolean;
  needAlcohol: boolean;
  needRunningWater: boolean;
  needRefrigeration: boolean;
  needDrinkware: boolean;
  beer: boolean;
  wine: boolean;
  specialtyDrinks: boolean;
  liquorPreferences: string;
};

export type TEventWithId = TEvent & {
  _id: string;
};
