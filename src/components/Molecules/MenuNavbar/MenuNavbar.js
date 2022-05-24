import { useAppTheme } from 'context/AppTheme';
import SunFilled from 'components/Atoms/Icons/SunFilled';
import MoonFilled from 'components/Atoms/Icons/MoonFilled';
import ProfileFilled from 'components/Atoms/Icons/ProfileFilled'
import CartShoppingFilled from 'components/Atoms/Icons/CartShopping';
import { StyleMenuItem, StyleMenuNavbar } from './style';

const MenuNavbar = () => {
  const { themeToggle, theme } = useAppTheme();

  return (
    <StyleMenuNavbar>
      <StyleMenuItem
        color="transparent"
        labelColor="text"
        onClick={themeToggle}
        style={{ fontSize: 18 }}
      >
        {theme === 'light' ? <MoonFilled /> : <SunFilled />}
      </StyleMenuItem>
      <StyleMenuItem color="transparent" labelColor="text">
        <CartShoppingFilled />
      </StyleMenuItem>
      <StyleMenuItem color="transparent" labelColor="text">
        <ProfileFilled />
      </StyleMenuItem>
    </StyleMenuNavbar>
  );
};

export default MenuNavbar;
