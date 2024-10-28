import { useState, useEffect } from "react";

export function useMovies(query, key) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  useEffect(
    function () {
      async function fetchMovies() {
        const controller = new AbortController();
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            ` https://www.omdbapi.com/?s=${query}&apikey=${key}`,
            { signal: controller.signal }
          );
          // console.log(res);
          if (!res.ok) throw Error("something went wrong with fetching movie");
          const data = await res.json();
          if (data.Response === "False") {
            throw Error("  not found Movie");
          }
          // console.log(data.Search);
          setMovies(data.Search);
        } catch (err) {
          // console.log(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
          return function () {
            controller.abort();
          };
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query, key]
  );
  return { movies, isLoading, error };
}
