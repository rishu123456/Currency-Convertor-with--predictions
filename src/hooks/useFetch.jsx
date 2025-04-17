import { useState, useEffect } from "react";

const useFetch = (url, options = {}, maxRetries = 3) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let retries = 0;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (retries < maxRetries) {
          retries++;
          console.warn(`Retrying (${retries}/${maxRetries})...`);
          setTimeout(fetchData, 1000 * retries);
        } else {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
