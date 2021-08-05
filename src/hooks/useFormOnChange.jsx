export const useFormOnChange = (
  setTitle,
  setDescription,
  setPrice,
  setQuantity
) => {
  const validate = (s) => {
    const rgx = /^[0-9]*\.?[0-9]*$/;

    return s.match(rgx) ? true : false;
  };

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };
  const handleDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };
  const handlePriceChange = ({ target }) => {
    !validate(target.value) ? (target.value = '') : setPrice(target.value);
  };
  const handleQuantityChange = ({ target }) => {
    !validate(target.value) ? (target.value = '') : setQuantity(target.value);
  };

  return {
    handleTitleChange,
    handleDescriptionChange,
    handlePriceChange,
    handleQuantityChange,
  };
};
