export const useFormOnChange = (
  setTitle,
  setDescription,
  setPrice,
  setQuantity
) => {
  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };
  const handleDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };
  const handlePriceChange = ({ target }) => {
    setPrice(target.value);
  };
  const handleQuantityChange = ({ target }) => {
    setQuantity(Number(target.value));
  };

  return {
    handleTitleChange,
    handleDescriptionChange,
    handlePriceChange,
    handleQuantityChange,
  };
};
