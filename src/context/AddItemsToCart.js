import { createContext, useContext, useEffect, useState } from 'react';
import storage from 'utils/storage';

const AddItemsContext = createContext({
  products: [],
  total: 0,
  addItem: () => {},
  removeItem: () => {}
});

const KEY_PRODUCTS_NAME = 'products';

export const AddItemsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (product, quantity) => {
    const subT = Number(product.price * quantity).toFixed(2);

    setProducts((prev) => {
      const _products = [...prev];
      const findIndexProduct = _products.findIndex((p) => p.id === product.id);
      if (findIndexProduct !== -1) {
        _products[findIndexProduct] = { ...product, quantity, subTotal: subT };
        //console.log('Ya esta agregado');
        //alert('¡YA HA SIDO AGREGADO AL CARRITO!')
      } else {
        _products.push({ ...product, quantity, subTotal: subT });
        //console.log('Agregado');
        //alert('¡AGREGADO AL CARRITO!')
      }
      storage.setItem(KEY_PRODUCTS_NAME, _products);
      console.log( _products );
      return _products;
    });
  };

  useEffect(() => {
    const _total = products.reduce((prev, current) => prev + Number(current?.subTotal), 0);
    setTotal(_total?.toFixed(2));
  }, [products]);

  useEffect(() => {
    const _products = storage.getItem(KEY_PRODUCTS_NAME);
    if (typeof _products === 'object' && _products?.length) {
      setProducts(_products);
    }
  }, []);

  const removeItem = (id) => {
    setProducts((products) => products.filter((p) => p.id !== id));
  };

  return (
    <AddItemsContext.Provider value={{ products, total, addItem, removeItem }}>{children}</AddItemsContext.Provider>
  );
};

export const useAddItems = () => useContext(AddItemsContext);
