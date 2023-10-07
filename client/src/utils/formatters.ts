export const formatPhoneNumber = (phoneNumber: string | number) => {
  const phoneNumberString = phoneNumber.toString();
  const areaCode = phoneNumberString.slice(0, 3);
  const firstThree = phoneNumberString.slice(3, 6);
  const lastFour = phoneNumberString.slice(6, 10);
  return `(${areaCode}) ${firstThree}-${lastFour}`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", { timeZone: "UTC" });
};

export const formatDateWithDashes = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};

export const formatTime = (time: string) => {
  const timeArr = time.split(":");
  const hours = +timeArr[0] > 12 ? +timeArr[0] - 12 : timeArr[0];
  const minutes = timeArr[1];
  const suffix = +timeArr[0] > 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${suffix}`;
};
