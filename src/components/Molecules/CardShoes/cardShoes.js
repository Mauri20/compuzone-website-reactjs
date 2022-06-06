import { StyleWrapper, StyleImage } from './style';
import TittleSmall from 'components/Atoms/TittleSmall';

const CardShoes = ({image, trademark, model, style, category, price, size, color, onClick}) => {
  return (
    <StyleWrapper onClick={onClick}>
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
