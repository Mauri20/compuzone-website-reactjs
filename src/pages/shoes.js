import { useEffect, useMemo } from 'react';
import { Row, Col } from 'react-grid-system';
import { useQueryShoes, useQueryWP, useQueryWS } from 'hooks/useQuery';
import Title from 'components/Atoms/Tittle';
import Button from 'components/Atoms/Button';
import RefreshIcon from '../components/Atoms/Icons/RefreshIcon';
import Layout from 'components/Organisms/Layout';
import CardShoes from 'components/Molecules/CardShoes';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Select from 'components/Atoms/Select';

function CatalogueShoes(){
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const trademarkidPage = searchParams.get('trademarkId');
  const pageParam = searchParams.get('page');

  const { data, loading, refresh } = useQueryShoes('/shoes/filter', trademarkidPage, pageParam);
  const { dataC, loadingC } = useQueryWP('/categories', null);
  const { dataS, loadingS } = useQueryWS('/styles', null);

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

  return(
    <Layout>
      <Title htmlTag="h1" size={75}>
        Catálogo de Zapatos
      </Title>
      <br/>
      <div className="container-btn" style={{ textAlign: 'center' }}>
        <Button onClick={refresh}>
          <RefreshIcon></RefreshIcon>
        </Button>
      </div>
      <br/>
      <div className="container-select" style={{ textAlign: 'left', display: 'inline-block', marginRight: '15px' }}>
        <Select
          required
          type="text"
          name="category"
          options={ dataSelectCategory }
          isLoading={loadingC}
          placeholder="Category"
        />
      </div>
      <div className="container-select" style={{ textAlign: 'left', display: 'inline-block' }}>
        <Select
          required
          type="text"
          name="style"
          options={ dataSelectStyle }
          isLoading={ loadingS }
          placeholder="Style"
          //defaultInputValue={isUpdate ? `${pet?.trainer?.firstName} ${pet?.trainer?.lastName}` : undefined}
        />
      </div>
      {loading ? (
        <p style={{ textAlign: 'center' }}>
          <b>Loading..</b>
        </p>
      ) : (
        <Row>
          {data?.docs?.map(({ id, color, trademark, model, style, category, price, size, url }) => (
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
                onAddCart={() => {
                  alert(`Ha agregado el id ${id}`);
                  console.log(price);
                }}
              />
            </Col>
          ))}
        </Row>
      )}
      <div className="container-btn" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <StyledPagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={(e, page) => {
            navigate(`/shoes/filter?trademarkId=${trademarkidPage}&page=${page}`);
          }}
        />
      </div>
      <br/>
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
