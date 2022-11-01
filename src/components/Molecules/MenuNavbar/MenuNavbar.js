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
import LogoutIcon from 'components/Atoms/Icons/LogoutFilled';
import Swal from 'sweetalert2';

const MenuNavbar = () => {
  const token = localStorage.getItem('token');
  const { themeToggle, theme } = useAppTheme();
  const { products, removeAll } = useAddItems();
  const navigate = useNavigate();

  let handleNavigate;
  if (!token) {
    handleNavigate = () => {
      Swal.fire({
        title: 'Info!',
        text: 'Have you created your profile?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Info!',
            text: 'You will be redirected to the login page',
            icon: 'info',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/users/login');
            }
          });
        }
        if (result.dismiss === 'cancel') {
          Swal.fire({
            title: 'Info!',
            text: 'You will be redirected to creating profile page',
            icon: 'info',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/users/registerlogin');
            }
          });
        }
      });
    };
  } else {
    handleNavigate = () => {
      // informing the user that will close the session if he/she is not logged in
      Swal.fire({
        title: 'Are you sure?',
        text: 'If you close the session you will lose the items in your cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          removeAll();
          Swal.fire({
            title: '¡Bye!',
            text: 'You have closed the session',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/trademarks');
            }
          });
        }
      });
    };
  }

  useEffect(() => {
    //console.log({ products });
  }, [products]);

  return (
    <StyleMenuNavbar>
      <StyleMenuItem color="transparent" labelColor="text" onClick={themeToggle} style={{ fontSize: 18 }}>
        {theme === 'light' ? <MoonFilled /> : <SunFilled />}
      </StyleMenuItem>
      <StyleMenuItem
        color="transparent"
        labelColor="text"
        onClick={() => {
          navigate('/trademark');
        }}
      >
        <HomeFilled />
      </StyleMenuItem>
      <StyleMenuItem
        color="transparent"
        labelColor="text"
        onClick={() => {
          navigate('/cart');
        }}
      >
        <CartShoppingFilled />
        <span>{products.length}</span>
      </StyleMenuItem>
      <StyleMenuItem color="transparent" labelColor="text" onClick={handleNavigate}>
        {token ? <LogoutIcon /> : <ProfileFilled />}
      </StyleMenuItem>
    </StyleMenuNavbar>
  );
};

export default MenuNavbar;
