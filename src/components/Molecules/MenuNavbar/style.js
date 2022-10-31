import styled from 'styled-components';
import Button from '../../Atoms/Button/button';

export const StyleMenuNavbar = styled.div`
  width: auto;
  display: none;
  text-align: center;
  flex-direction: row;

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

export const StyleMenuItem = styled(Button)`
  margin-right: 10px;
  min-width: auto;
  padding: 0 5px;
  transition: color 0.3s;
  font-weight: 700;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
