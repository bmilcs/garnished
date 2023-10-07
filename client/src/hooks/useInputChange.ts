import React, { ChangeEvent, Dispatch } from "react";

type SetStateFunction<T> = Dispatch<React.SetStateAction<T>>;

export type InputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

//
// custom hook to handle input changes when saving them to a single state object
// accepts: setFormData useState function
// returns: handleInputChange function
//

// custom hook: takes one argument: a function that can update state

export const useInputChange = <T>(setFormData: SetStateFunction<T>) => {
  // this is the function that will be called every time an input changes
  // it takes one argument: an event object

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, type } = e.target;
    // we'll use the event object to get the name and type of the input that changed
    if (type === "checkbox") {
      // if the input is a checkbox, we'll get the checked property
      // and use it to update our state
      const { checked } = e.target as HTMLInputElement;
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      // otherwise, we'll get the value property and use it to update our state
      const { value } = e.target as HTMLInputElement | HTMLTextAreaElement;
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // return the function that will update our state
  return handleInputChange;
};
