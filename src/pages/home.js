import { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { useQuery} from 'hooks/useQuery';
import Title from 'components/Atoms/Tittle';
import Button from 'components/Atoms/Button';
import RefreshIcon from '../components/Atoms/Icons/RefreshIcon';
import Layout from 'components/Organisms/Layout';
import CardTradeMark from 'components/Molecules/CardTradeMark';
import { useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';

function Home() {
  const navigate = useNavigate();

  const [page, setPage] = useState(  1);

  const { data, loading, refresh } = useQuery('/trademark', '', '', '', page);

  useEffect(() => {
    //console.log({ data, loading });
  }, [loading, data]);

  const totalPages = data?.pageCount;

  return (
    <Layout>
      <Title htmlTag="h1" size={75}>
        Available Trademarks
      </Title>
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
          {data?.docs.map(({ id, trademarkName, urlImage }) => (
            <Col key={id} xs={12} md={6} lg={4}>
              <CardTradeMark
                name={trademarkName}
                image={urlImage}
                onClick={() => {
                  navigate(`/shoes/filter?trademarkId=${id}`);
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
            setPage(page);
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

export default Home;
