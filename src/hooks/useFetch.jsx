import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url]);

    return { isLoading, data, error };
};

export default useFetch;
