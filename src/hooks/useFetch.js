import React, { useEffect, useState } from 'react'

const useFetch = (API) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                setData(result);
            } catch (error) {
                console.error("Failed to fetch movie data: ", error)
            }
            finally {
                setLoading(false);
            }
        }
        fetchAPI();
    }, [API])

    return { data, loading, error };

}

export default useFetch