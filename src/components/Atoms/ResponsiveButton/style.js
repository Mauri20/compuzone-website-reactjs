import styled from 'styled-components';

export const StyleButton = styled.button`
  padding: 5px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  visibility: hidden;
  opacity: 0;

  @media only screen and (max-width: 1024px) {
    .nav-btn {
      visibility: visible;
      opacity: 1;
    }

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
`;
