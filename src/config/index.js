const baseUrl = `${process.env.REACT_APP_API_URL}/v1`;

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
  }
};

export default config;
