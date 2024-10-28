import { useState } from "react";

import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { Navbar } from "./Navbar";
import { Main, Box } from "./Main";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { Loader } from "./Loader";
import { WatchedMovies } from "./WatchedMovies";
import { WatchSummary } from "./WatchSummary";
import { WatchedList } from "./WatchedList";
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

export const key = "abf891de";
export default function App() {
  //   const [movies, setMovies] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState("");
  //   const [watched, setWatched] = useState();
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query, key);
  const [watched, setWatched] = useLocalStorageState("watched");

  const [selectedId, setSelectedId] = useState("");

  console.log(watched);
  function handleSelectId(id) {
    setSelectedId(selectedId === id ? null : id);
  }

  function handleCloseMovie(id) {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  //   useEffect(
  //     function () {
  //       localStorage.setItem("watched", JSON.stringify(watched));
  //     },
  //     [watched]
  //   );
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  //   useEffect(
  //     function () {
  //       async function fetchMovies() {
  //         const controller = new AbortController();
  //         try {
  //           setIsLoading(true);
  //           setError("");
  //           const res = await fetch(
  //             ` https://www.omdbapi.com/?s=${query}&apikey=${key}`,
  //             { signal: controller.signal }
  //           );
  //           // console.log(res);
  //           if (!res.ok) throw Error("something went wrong with fetching movie");
  //           const data = await res.json();
  //           if (data.Response === "False") {
  //             throw Error("  not found Movie");
  //           }
  //           // console.log(data.Search);
  //           setMovies(data.Search);
  //         } catch (err) {
  //           // console.log(err.message);
  //           if (err.name !== "AbortError") {
  //             setError(err.message);
  //           }
  //           return function () {
  //             controller.abort();
  //           };
  //         } finally {
  //           setIsLoading(false);
  //         }
  //       }
  //       if (query.length < 3) {
  //         setMovies([]);
  //         setError("");
  //         return;
  //       }
  //       fetchMovies();
  //     },
  //     [query]
  //   );
  return (
    <>
      <Navbar
        query={query}
        setQuery={setQuery}
        NumberofResults={movies.length}
      />
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : !error && !isLoading ? (
            <MovieList
              movies={movies}
              selectedId={selectedId}
              handleSelectId={handleSelectId}
            />
          ) : (
            <ErrorMessage message={error} />
          )}

          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <WatchedMovies>
              <WatchSummary watched={watched} />
              <WatchedList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </WatchedMovies>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p
      className="MovieList"
      style={{ textAlign: "center", fontSize: "1.5rem", paddingTop: "15px" }}
    >
      {message}
    </p>
  );
}
