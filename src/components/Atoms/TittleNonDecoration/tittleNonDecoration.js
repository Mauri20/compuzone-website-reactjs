import { StyleTitle } from './style';

const TittleSmallND = ({
  children,
  htmlTag = 'h4',
  color = 'text',
  size = 20,
  lineHeight = size + 5,
  ...restProps
}) => {
  return (
    <StyleTitle as={htmlTag} $size={size} $color={color} $lineHeight={lineHeight} {...restProps}>
      {children}
    </StyleTitle>
  );
};

export default TittleSmallND;
