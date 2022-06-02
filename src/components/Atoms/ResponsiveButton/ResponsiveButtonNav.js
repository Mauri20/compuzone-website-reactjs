import { StyleButton } from './style';
import { useRef } from 'react';

const ButtonNavResponsive = ({ className, ...restProps }) => {
  const navRef = useRef();
  const showNavBar = () => {
    //navRef.current.classList.toggle('responsive_nav');
  };

  return <StyleButton onClick={showNavBar} className={`${className}`} {...restProps} />;
};

export default ButtonNavResponsive;
