const baseUrl = `${process.env.REACT_APP_API_URL}/v1`;
export const appNname = `${process.env.REACT_APP_APP_NAME}`;

const config = {
  baseUrl
};

export const ROUTES = {
  HOME: {
    path: '/trademark',
    absolutePath: '/trademark'
  },
  SHOES: {
    path: '/shoes/filter',
    absolutePath: 'shoes/filter'
  },

  LOGIN: {
    path: 'users/login',
    absolutePath: 'users/login'
  },
  REGISTERLOGIN: {
    path: 'users/registerlogin',
    absolutePath: 'users/registerlogin'
  },
  CART: {
    path: '/cart',
    absolutePath: '/cart'
  }
};

export default config;
