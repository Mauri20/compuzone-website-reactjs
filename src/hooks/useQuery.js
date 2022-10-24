import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import config from 'config';

const { baseUrl } = config;

export const useQuery = (url, trademarkId, categoryId, styleId, page) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}${url}`, { params: { trademarkId, categoryId, styleId, page } });
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrors(err);
      setLoading(false);
      throw new Error(err);
    }
  }, [url, trademarkId, categoryId, styleId, page]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return { loading, data, errors, refresh: getData };
};
