import Layout from 'components/Organisms/Layout';
import Title from '../components/Atoms/Tittle';
import { useQuery } from 'hooks/useQuery';
import { useEffect, useState } from 'react';
import Button from '../components/Atoms/Button';
import RefreshIcon from '../components/Atoms/Icons/RefreshIcon';
import PayIcon from 'components/Atoms/Icons/PayFilled';
import { Col, Row } from 'react-grid-system';
import CardShoes from '../components/Molecules/CardShoes';
import { useAddItems } from 'context/AddItemsToCart';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Swal from 'sweetalert2';

function Cart() {
  const { addItem, removeItem, removeAll } = useAddItems();
  const [page, setPage] = useState(1);

  function redirectPaypal() {
    const products = JSON.parse(localStorage.getItem('products'));

    if (Object.keys(products).length !== 0) {
      if (localStorage.getItem('token')) {
        window.location.href = 'https://www.paypal.com/sv/signin';
        removeAll();
      } else {
        Swal.fire({
          showCancelButton: true,
          title: 'Info!',
          text: '¡Debes iniciar sesión para poder realizar el pago!, ¿Deseas iniciar sesión?',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/users/login';
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Debes agregar productos al carrito para poder realizar el pago'
      });
    }
  }

  //Getting the data from the localStorage
  const productsCart = JSON.parse(localStorage.getItem('products'));
  //Array of products
  let ArrayID = [];
  //Adding the id of the products to the array
  productsCart?.map((item) => {
    const { id } = item;
    ArrayID.push(id);
  });
  //Making the request to the API with the array of products
  const { data, loading, refresh } = useQuery('/shoes/filter', '', '', '', ArrayID, page);

  //Calculating the total of the purchase
  const total = productsCart?.reduce((prev, current) => prev + Number(current?.subTotal), 0);
  const total2 = total?.toFixed(2);
  //Calculating the total of the products
  const totalItems = productsCart?.reduce((prev, current) => prev + Number(current?.quantity), 0);
  const totalItems2 = totalItems?.toFixed(0);
  //Calculating the total of the pages
  const totalPages = data?.pageCount || 1;

  return (
    <Layout>
      <Title htmlTag="h1" size={55} style={{ textAlign: 'left' }}>
        ¡Bienvenido a tu carrito!
      </Title>
      <h1 style={{ textAlign: 'left', fontSize: '26px' }}>Items agregados: {totalItems2}</h1>
      <h1 style={{ textAlign: 'left', fontSize: '26px' }}>Total: ${total2}</h1>
      <br />
      <div className="container-btn" style={{ textAlign: 'right' }}>
        <Button onClick={refresh}>
          <RefreshIcon></RefreshIcon>
        </Button>
        <Button
          style={{ marginLeft: '4px', background: '#46B98C' }}
          onClick={() => {
            redirectPaypal();
          }}
        >
          <PayIcon></PayIcon>
        </Button>
      </div>
      {loading ? (
        <p style={{ textAlign: 'center' }}>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data?.docs?.map((product) => {
            const { id, model, price, size, image } = product;
            return (
              <Col key={id} xs={12} md={6} lg={4}>
                <CardShoes
                  image={image.secure_url}
                  model={model}
                  price={price}
                  size={size}
                  isAddCart={
                    localStorage.getItem('products') !== null &&
                    JSON.parse(localStorage.getItem('products')).findIndex((item) => item.id === id) !== -1
                      ? true
                      : false
                  }
                  onAddCart={() => {
                    //In case the product is already in the cart, it will be removed or added
                    if (localStorage.getItem('products') === null) {
                      addItem(product, 1);
                    } else {
                      let products = JSON.parse(localStorage.getItem('products'));
                      let index = products.findIndex((item) => item.id === id);
                      if (index === -1) {
                        addItem(product, 1);
                      } else {
                        removeItem(id);
                      }
                    }
                  }}
                />
              </Col>
            );
          })}
        </Row>
      )}
      <br />
      <div className="container-btn" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <StyledPagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </div>
      <br />
    </Layout>
  );
}

const StyledPagination = styled(Pagination)`
  && {
    .MuiPaginationItem-page {
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.text};
      font-size: 20px;

      &:hover {
        background: ${({ theme }) => theme.colors.secondary};
      }
    }

    .MuiPaginationItem-previousNext {
      color: ${({ theme }) => theme.colors.text};
      border-color ${({ theme }) => theme.colors.text};

      &:hover {
        background: ${({ theme }) => theme.colors.secondary};
      }
    }

    .Mui-selected {
      background: ${({ theme }) => theme.colors.secondary};

      &:hover {
        background: ${({ theme }) => theme.colors.background};
      }
    }`;

export default Cart;
