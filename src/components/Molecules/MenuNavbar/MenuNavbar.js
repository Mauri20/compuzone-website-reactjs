import { useAppTheme } from 'context/AppTheme';
import SunFilled from 'components/Atoms/Icons/SunFilled';
import MoonFilled from 'components/Atoms/Icons/MoonFilled';
import ProfileFilled from 'components/Atoms/Icons/ProfileFilled';
import HomeFilled from 'components/Atoms/Icons/HomeFilled';
import CartShoppingFilled from 'components/Atoms/Icons/CartShopping';
import { StyleMenuItem, StyleMenuNavbar } from './style';
import { useAddItems } from 'context/AddItemsToCart';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuNavbar = () => {
  const { themeToggle, theme } = useAppTheme();
  const { products } = useAddItems();
  const navigate = useNavigate();

  useEffect(() => {
    //console.log({ products });
  }, [products]);

  return (
    <StyleMenuNavbar>
      <StyleMenuItem color="transparent" labelColor="text" onClick={themeToggle} style={{ fontSize: 18 }}>
        {theme === 'light' ? <MoonFilled /> : <SunFilled />}
      </StyleMenuItem>
      <StyleMenuItem color="transparent" labelColor="text" onClick={() => {navigate('/trademark')}}>
        <HomeFilled />
      </StyleMenuItem>
      <StyleMenuItem color="transparent" labelColor="text" onClick={() => {navigate('/cart')}}>
        <CartShoppingFilled />
        <span>{products.length}</span>
      </StyleMenuItem>
      <StyleMenuItem color="transparent" labelColor="text">
        <ProfileFilled />
      </StyleMenuItem>
    </StyleMenuNavbar>
  );
};

export default MenuNavbar;
