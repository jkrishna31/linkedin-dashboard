import { useCallback, useEffect, useState } from "react";
import { dummyPostsResponse } from "../../dummy/posts";

export default function useFetchPosts<T>(url: string, body?: object) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      // const res = await fetch(url, {
      //   method: "post",
      //   headers: {
      //     'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(body)
      // });
      // const json = await res.json();
      // setData(json.data);
      // setError(null);
      setTimeout(() => {
        setData(dummyPostsResponse.data)
        setError(null);
        setIsLoading(false);
      }, 5000);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      // setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { isLoading, data, error };
}