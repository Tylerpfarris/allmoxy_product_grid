import { useState } from 'react';
import { updateProduct, storage, db } from '../Firebase/firebase';
// import { useInputErrorCheck } from './useInputErrorCheck';

export const useUpdateProduct = (products, setProducts) => {
  const [editIdx, setEditIdx] = useState(-1);

  const handleImgUpdate = async (e, product) => {
    const productImgRef = db.collection('Products').doc(product.id);

    const file = e.target.files[0];
    const storageRef = storage.ref();

    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);
    const uploadImg = await fileRef.getDownloadURL();

    return productImgRef.update({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      img: uploadImg,
    });
  };

  const handleChange = (event, name, i, product) => {
    const { value } = event.target;

    const pro = products.map((row, j) =>
      j === i ? { ...row, [name]: value } : row
    );
    if (product === products[i]) {
      setProducts(pro);
    }
  };

  const handleStopEdit = (product, i, name, e) => {
    const { value } = e.target;

    const pro = products.map((row, j) =>
      j === i ? { ...row, [name]: value } : row
    );

    if (product === products[i]) {
      updateProduct(product.id, product).then(() => {
        setProducts(pro);

        setEditIdx(-1);
      });
    }
  };
  const handleEdit = (i) => {
    setEditIdx(i);
  };

  return {
    editIdx,
    handleChange,
    handleEdit,
    handleStopEdit,
    handleImgUpdate,
  };
};
