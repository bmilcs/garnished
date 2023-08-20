import { TExpressValidatorError } from "@/types/apiResponseTypes";

//
// Get Express Validator error messages for a given field
//

export const getExpressValidatorError = (
  fieldName: string,
  errors: TExpressValidatorError[],
) => {
  if (errors.length === 0) return null;
  return errors
    .filter(error => error.path === fieldName)
    .map(error => error.msg)[0];
};

//
// form submit handler for async functions
//

export const onFormSubmit = (callback: () => Promise<void>) => {
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void callback();
  };

  return handleSubmitForm;
};
