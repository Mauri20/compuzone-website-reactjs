import styled from 'styled-components';

export const StyleTitle = styled.h4`
  font-size: ${({ $size }) => $size}px;
  line-height: ${({ $lineHeight }) => $lineHeight}px;
  color: ${({ theme, $color }) => theme.colors[$color]};
  text-align: left;
`;
