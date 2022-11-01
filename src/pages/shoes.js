import { useEffect, useMemo, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { useQuery } from 'hooks/useQuery';
import Title from 'components/Atoms/Tittle';
import Button from 'components/Atoms/Button';
import RefreshIcon from 'components/Atoms/Icons/RefreshIcon';
import Layout from 'components/Organisms/Layout';
import CardShoes from 'components/Molecules/CardShoes';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Select from 'components/Atoms/Select';

import { useAddItems } from 'context/AddItemsToCart';

function CatalogueShoes() {
  const { addItem, removeItem } = useAddItems();

  // Comentario para obtener el valor del array de productos en el localStorage
  //console.log(products, total);

  const [searchParams] = useSearchParams();
  const trademarkidPage = searchParams.get('trademarkId');
  const nameTrademark = searchParams.get('name');
  let nameC = nameTrademark.toLowerCase();

  const [category, setCategory] = useState('');
  const [style, setStyle] = useState('');
  const [page, setPage] = useState(1);

  const { data, loading, refresh } = useQuery('/shoes/filter', trademarkidPage, category, style, '',page);
  const { data: dataC, loading: loadingC } = useQuery('/categories', null);
  const { data: dataS, loading: loadingS } = useQuery('/styles', null);

  useEffect(() => {
    //console.log({ dataC, loadingC });
  }, [loading, data, dataC, loadingC, dataS, loadingS]);

  const dataSelectCategory = useMemo(() => {
    if (!dataC) return [];
    return dataC?.map((item) => {
      const { id, categorieName = '' } = item;

      return {
        value: id,
        label: categorieName
      };
    });
  }, [dataC]);

  const dataSelectStyle = useMemo(() => {
    if (!dataS) return [];
    return dataS?.map((item) => {
      const { id, styleName = '' } = item;

      return {
        value: id,
        label: styleName
      };
    });
  }, [dataS]);

  const totalPages = data?.pageCount || 1;

  const onChangeCategory = (e) => {
    setCategory(e.value);
    setPage(1);
  };

  const onChangeStyle = (e) => {
    setStyle(e.value);
    setPage(1);
  };

  const onClearFilters = (e) => {
    setCategory(e.value = '');
    setStyle(e.value = '');
    setPage(1);
  };

  return (
    <Layout>
      <Title htmlTag="h1" size={75}>
        {nameC[0].toUpperCase() + nameC.slice(1)}
      </Title>
      <br />
      <div className="container-btn" style={{ textAlign: 'center' }}>
        <Button onClick={refresh}>
          <RefreshIcon></RefreshIcon>
        </Button>
      </div>
      <br />
      <div className="container-select" style={{ textAlign: 'left', display: 'inline-block', marginRight: '15px' }}>
        <Select
          required
          type="text"
          name="category"
          options={dataSelectCategory}
          isLoading={loadingC}
          placeholder="Choose a category"
          onChange={onChangeCategory}
        />
      </div>
      <div className="container-select" style={{ textAlign: 'left', display: 'inline-block', marginRight: '15px' }}>
        <Select
          required
          type="text"
          name="style"
          options={dataSelectStyle}
          isLoading={loadingS}
          placeholder="Choose a style"
          onChange={onChangeStyle}
        />
      </div>
      <div className="container-select" style={{ textAlign: 'left', display: 'inline-block', marginRight: '15px' }}>
        <Button onClick={onClearFilters} style={{background: '#46B98C'}}>Clear filters</Button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>
          <b>Loading..</b>
        </p>
      ) : (
        <Row>
          {data?.docs?.map((product) => {
            const { id, color, trademark, model, style, category, price, size, url } = product;
            return (
              <Col key={id} xs={12} md={6} lg={4}>
                <CardShoes
                  image={url}
                  trademark={trademark.trademarkName}
                  model={model.modelName}
                  color={color}
                  style={style.styleName}
                  category={category.categorieName}
                  price={price}
                  size={size}
                  isAddCart={
                    localStorage.getItem('products') !== null &&
                    JSON.parse(localStorage.getItem('products')).findIndex((item) => item.id === id) !== -1
                      ? true
                      : false
                  }
                  onAddCart={() => {
                    //En esta parte del codigo se agrega el producto al localStorage, o se elimina si ya existe.
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

export default CatalogueShoes;
