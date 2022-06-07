import { StyleWrapper, StyleImage, StyleButton } from './style';
import TittleSmall from 'components/Atoms/TittleSmall';
import AddCart from 'components/Atoms/Icons/AddCartFilled';

const CardShoes = ({image, trademark, model, style, category, price, size, color, onClick, onAddCart}) => {
  return (
    <StyleWrapper onClick={onClick}>
      <StyleButton labelColor="white" onClick={onAddCart}>
        <AddCart></AddCart>
      </StyleButton>
      <StyleImage loading="lazy" src={image} />
      <TittleSmall>Marca: {trademark}</TittleSmall>
      <TittleSmall>Modelo: {model}</TittleSmall>
      <TittleSmall>Estilo: {style}</TittleSmall>
      <TittleSmall>Categoria: {category}</TittleSmall>
      <TittleSmall>Precio: ${price}</TittleSmall>
      <TittleSmall>Talla: {size}</TittleSmall>
      <TittleSmall>Color: {color}</TittleSmall>
    </StyleWrapper>
  );
}

export default CardShoes;
