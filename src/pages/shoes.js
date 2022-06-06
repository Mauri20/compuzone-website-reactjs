import { useEffect } from 'react';
import { Row, Col } from 'react-grid-system';
import { useQueryShoes } from 'hooks/useQuery';
import Title from 'components/Atoms/Tittle';
import Button from 'components/Atoms/Button';
import RefreshIcon from '../components/Atoms/Icons/RefreshIcon';
import Layout from 'components/Organisms/Layout';
import CardShoes from 'components/Molecules/CardShoes';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';

function CatalogueShoes(){
  //const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const trademarkidPage = searchParams.get('trademarkId');
  const pageParam = searchParams.get('page');

  const { data, loading, refresh } = useQueryShoes('/shoes/filter', trademarkidPage, pageParam);

  useEffect(() => {
    //console.log({ data, loading });
  }, [loading, data]);

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
                onClick={() => {
                  alert(`Ha clickeado el id ${id}`);
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
            //navigate(`/shoes/filter/?trademarkId=${trademarkidPage}&page=${pageParam}`);
          }}
        />
      </div>
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
