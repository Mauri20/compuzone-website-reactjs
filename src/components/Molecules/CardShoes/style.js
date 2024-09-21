import styled from 'styled-components';
import Button from '../../Atoms/Button';

export const StyleWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bgGradiant};
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 15px 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;

export const StyleImage = styled.img`
  border-radius: 12px;
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const StyleButton = styled(Button)`
  position: absolute;
  min-width: auto;
  padding: 0;
  width: 40px;
  height: 40px;
  right: 30px;
  top: 30px;
  border-radius: 50px;
  font-size: 14px;
  z-index: ${({ theme }) => theme.zIndex.two};
`;
