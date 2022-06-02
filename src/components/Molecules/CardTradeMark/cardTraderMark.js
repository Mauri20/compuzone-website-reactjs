import Title from 'components/Atoms/Tittle';
import { StyleImage, StyleWrapper } from './style';

const CardPet = ({ image, name, onClick }) => {
  return (
    <StyleWrapper onClick={onClick}>
      <StyleImage loading="lazy" src={image} />
      <Title>{name}</Title>
    </StyleWrapper>
  );
};

export default CardPet;
