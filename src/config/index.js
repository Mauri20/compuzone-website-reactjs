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
  }
};

export default config;
