import { useState } from 'react';

export const useInputErrorCheck = () => {
  const [inputError, setInputError] = useState(false);
  const [header, setHeader] = useState('');

  const validate = (s) => {
    const rgx = /^[0-9]*\.?[0-9]*$/;

    return s.match(rgx) ? true : false;
  };

  const inputErrorCheck = (e, prop) => {
    console.log(e);
    if (prop === 'price' || prop === 'quantity') {
      if (validate(e.target.value) === false) {
        setHeader(prop), setInputError(true), (e.target.value = '');
      } else {
        setInputError(false);
      }
    }
  };
  return { inputErrorCheck, setInputError, inputError, header };
};
