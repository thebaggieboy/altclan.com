import { useState, useEffect } from 'react';

const useGetProducts = (url) => {
  const [data2, setData2] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData2(jsonData);
        setLoading2(false);
      } catch (error) {
        setError2(error);
        setLoading2(false);
      }
    };

    fetchData();
  }, [url]);

  return { data2, loading2, error2 };
};

export default useGetProducts;
