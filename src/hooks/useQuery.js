import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/v1`;

export const useQuery = (url, paramsPage) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}${url}`, { params: { page: paramsPage } });
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrors(err);
      setLoading(false);
      throw new Error(err);
    }
  }, [url, paramsPage]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return { loading, data, errors, refresh: getData };
};

export const useQueryShoes = (url, trademarkidPage, pageParam) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}${url}`, { params: { trademarkId: trademarkidPage, page: pageParam } });
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrors(err);
      setLoading(false);
      throw new Error(err);
    }
  }, [url, trademarkidPage, pageParam]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return { loading, data, errors, refresh: getData };
};
