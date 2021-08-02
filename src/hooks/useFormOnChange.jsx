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
    setPrice(Number(target.value));
  };
  const handleQuantityChange = ({ target }) => {
    setQuantity(Number(target.value));
  };

  return {
    handleQuantityChange,
    handlePriceChange,
    handleDescriptionChange,
    handleTitleChange,
  };
};
