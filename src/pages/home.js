import { useEffect } from 'react';
import { Row, Col } from 'react-grid-system';

import useQuery from 'hooks/useQuery';
import Title from 'components/Atoms/Tittle';
import Button from 'components/Atoms/Button';
import RefreshIcon from '../components/Atoms/Icons/RefreshIcon';
import Layout from 'components/Organisms/Layout';
import CardTradeMark from 'components/Molecules/CardTradeMark';

function Home() {
  const { data, loading, refresh } = useQuery('/trademark');

  useEffect(() => {
    //console.log({ data, loading });
  }, [loading, data]);

  return (
    <Layout>
      <Title htmlTag="h1" size={75}>
        Available Trademarks
      </Title>
      <div className="container-btn" style={{textAlign: "center"}}>
        <Button onClick={refresh}><RefreshIcon></RefreshIcon></Button>
      </div>
      {loading ? (
        <p style={{textAlign: "center"}}>
          <b>Loading..</b>
        </p>
      ) : (
        <Row>
          {
            data?.docs.map(({ id, trademarkName, urlImage }) => (
              <Col key={id} xs={12} md={6} lg={4}>
                <CardTradeMark name={trademarkName} image={urlImage} />
              </Col>
            ))
          }
        </Row>
      )}
    </Layout>
  );
}

export default Home;
