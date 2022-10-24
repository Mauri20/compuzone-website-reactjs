import { useState, useEffect } from 'react';
import { StyleWrapper, StyleImage, StyleButton } from './style';
import TittleSmall from 'components/Atoms/TittleSmall';
import AddCart from 'components/Atoms/Icons/AddCartFilled';
import RemoveCart from 'components/Atoms/Icons/RemoveCart';

const CardShoes = ({ image, trademark, model, style, category, price, size, color, onClick, onAddCart, isAddCart }) => {
  const [isAdd, setIsAdd] = useState(isAddCart);
  useEffect(() => {
    setIsAdd(isAddCart);
  }, [isAddCart]);

  return (
    <StyleWrapper onClick={onClick}>
      <StyleButton labelColor="white" onClick={onAddCart}>
        {isAdd ? <RemoveCart></RemoveCart> : <AddCart></AddCart>}
      </StyleButton>
      <StyleImage loading="lazy" src={image} />
      <TittleSmall>Modelo: {model}</TittleSmall>
      <TittleSmall>Precio: ${price}</TittleSmall>
      <TittleSmall>Talla disponible: {size}</TittleSmall>
    </StyleWrapper>
  );
};

export default CardShoes;
