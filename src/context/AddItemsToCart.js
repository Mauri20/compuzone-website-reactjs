import {createContext, useContext, useEffect, useState} from 'react';
import storage from 'utils/storage';

const AddItemsContext = createContext({
  products: [],
  total: 0,
  addItem: () => {},
  removeItem: () => {}
});

const KEY_PRODUCTS_NAME = 'product';

export const AddItemsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (product, quantity) => {
    const subT = Number(product.price * quantity).toFixed(2);
    const findP = products.findIndex(p => p.id === product.id)
    if(findP !== -1){
      products[findP] = {...product, quantity, subTotal: subT}
      console.log("ya hay producto")
    }else{
      products.push({...product, quantity, subTotal: subT})
      console.log("no hay producto")
    }
  }

  useEffect(() => {
    const _total = products.reduce((prev, current) => prev += current?.subTotal, 0);
    setTotal(_total.toFixed(2));
  }, [products]);

  const removeItem = (id) => {;
    setProducts(products => products.filter(p => p.id !== id));
  }

  return (
    <AddItemsContext.Provider value={{  products, total, addItem, removeItem }}>
      {children}
    </AddItemsContext.Provider>
  )
};

export const useAddItems = () => useContext(AddItemsContext)
