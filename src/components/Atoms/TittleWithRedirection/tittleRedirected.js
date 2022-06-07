import { StyleTitle } from './style';

const TitleRedirected = ({ children, htmlTag = 'h2', color = 'text', size = 45, lineHeight = size + 20, onClick, ...restProps }) => {
  return (
    <StyleTitle as={htmlTag} $size={size} $color={color} $lineHeight={lineHeight} onClick={onClick} {...restProps}>
      {children}
    </StyleTitle>
  );
};

export default TitleRedirected;
