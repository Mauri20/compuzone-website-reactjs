import Layout from 'components/Organisms/Layout';
import { useEffect, useState } from 'react';
import config from 'config';
function dashboard() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [total, setTotal] = useState(0);
  const url = config.baseUrl;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + '/maintainance', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setTotal(data.views.views);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [url]);

  return (<>
    <Layout>
      <h1 style={{ textAlign: 'center', color: '#000', textShadow: '1px 1px 2px black', fontSize: '40px', marginTop: '20px' }}>Visualizaciones</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' }}>
          <h2 style={{ textAlign: 'center' }}>Total de visualizaciones</h2>
          <h1 style={{ textAlign: 'center', fontSize: '40px' }}>{total}</h1>
        </div>
      </div>
    </Layout></>);
}

export default dashboard;
