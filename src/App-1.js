import { useEffect, useState, useRef } from "react";
import StarRating from "./starRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const key = "abf891de";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storage = localStorage.getItem("watched") || [];
    return JSON.parse(storage);
  });
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

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
    [query]
  );
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
function Navbar({ query, setQuery, NumberofResults }) {
  return (
    <div className="navbar ">
      <div className="nav">
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults NumberofResults={NumberofResults} />
      </div>
    </div>
  );
}
function Logo() {
  return <h3>UsepopCorn 🍿</h3>;
}
function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(
    function () {
      // const el = document.querySelector(".search");
      // console.log(el);
      // el.focus();
      // inputEl.current.focus();
      // document.addEventListener("");
      function callback(e) {
        if (document.activeElement === inputEl.current) return;
        if (e.code === "Enter") {
          inputEl.current.focus();
          // setQuery("");
        }
      }
      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );
  return (
    <input
      className="search"
      type="text"
      value={query}
      ref={inputEl}
      onChange={(e) => {
        setQuery(e.target.value);
        // console.log(e.target.value);
      }}
      placeholder="search"
    ></input>
  );
}
function NumResults({ NumberofResults }) {
  return <h3> found {NumberofResults} Results</h3>;
}

function Main({ children }) {
  return <main className="main container">{children}</main>;
}
function Box({ children }) {
  return <div className="Box">{children}</div>;
}
function Loader() {
  return (
    <p
      className="MovieList"
      style={{ textAlign: "center", fontSize: "1.5rem", paddingTop: "15px" }}
    >
      Loading...
    </p>
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
function MovieList({ movies, selectedId, handleSelectId }) {
  const [open1, setOpen1] = useState(true);

  return (
    <>
      <div className="MovieList">
        <button onClick={() => setOpen1(!open1)}> {open1 ? "-" : "+"}</button>
        {open1 &&
          movies?.map((movie) => (
            <Movie
              key={movie.imdbID}
              img={movie.Poster}
              title={movie.Title}
              year={movie.Year}
              imdbID={movie.imdbID}
              handleSelectId={handleSelectId}
            />
          ))}
        {/* <Loader /> */}
      </div>
    </>
  );
}

function Movie({ img, title, year, imdbID, handleSelectId }) {
  return (
    <div className="Movie" onClick={() => handleSelectId(imdbID)}>
      <div className="left-part">
        <img src={img}></img>
      </div>
      <div className="right-part">
        <h3>{title}</h3>
        <span> 🗓 {year}</span>
      </div>
    </div>
  );
}
function WatchedMovies({ children }) {
  const [open2, setOpen2] = useState(true);
  return (
    <div className="watchedMovies">
      <button className="close" onClick={() => setOpen2(!open2)}>
        {open2 ? "-" : "+"}
      </button>
      {open2 && children}
    </div>
  );
}

function WatchSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="watchSummary">
      <h3>Movies you watched</h3>
      <span>#️⃣️ {watched.length} movies</span>
      <span>{avgImdbRating.toFixed(2)} ⭐</span>
      <span>{avgUserRating.toFixed(2)} 🌟</span>
      <span>{avgRuntime.toFixed(2)} min ⌛</span>
    </div>
  );
}
function WatchedList({ watched, handleDeleteWatched }) {
  return (
    <div className="wathcedList">
      {watched.map((watchedMovie) => (
        <WatchedMovie
          key={watchedMovie.imdbID}
          imdbID={watchedMovie.imdbID}
          title={watchedMovie.title}
          img={watchedMovie.poster}
          userRating={watchedMovie.userRating}
          imdbRating={watchedMovie.imdbRating}
          runtime={watchedMovie.runtime}
          watchedMovie={watchedMovie}
          handleDeleteWatched={handleDeleteWatched}
        />
      ))}
    </div>
  );
}
function WatchedMovie({
  imdbID,
  title,
  img,
  userRating,
  imdbRating,
  runtime,
  handleDeleteWatched,
}) {
  return (
    <div className="WatchedMovie">
      <div className="left-part">
        <img src={img}></img>
      </div>
      <div className="right-part">
        <h3>{title}</h3>
        <span>{imdbRating} ⭐</span>
        <span className="middle">{userRating} 🌟</span>
        <span>{runtime} ⌛</span>
        <button onClick={() => handleDeleteWatched(imdbID)}>X</button>
      </div>
    </div>
  );
}
function MovieDetails({
  selectedId,
  handleCloseMovie,
  handleAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const WatchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  console.log(movie);
  console.log(isWatched);

  const {
    imdbID,
    Actors: actors,
    Poster: poster,
    Runtime: runtime,
    Title: title,
    imdbRating,
    Genre: genre,
    Year: year,
    Awards: awards,
    Released: released,
    Writer: writer,
    Director: director,
    Plot: plot,
  } = movie;
  function handleAdd() {
    const newWatched = {
      imdbID: selectedId,
      title,
      imdbRating: Number(imdbRating),
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      userRating: userRating,
    };
    console.log(newWatched);
    handleAddWatched(newWatched);
    handleCloseMovie();
  }
  useEffect(
    function () {
      if (!title) return;
      document.title = ` UsePopCorn || ${title}`;
      return function () {
        document.title = ` UsePopCorn`;
      };
    },
    [title]
  );
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handleCloseMovie();
        }
      }
      document.addEventListener("keydown", callback);

      document.removeEventListener("keydown", callback);
    },
    [handleCloseMovie]
  );

  useEffect(
    function () {
      async function getMoviesDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?i=${selectedId}&apikey=${key}`
          );
          const data = await res.json();
          // console.log(data);
          setMovie(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
      getMoviesDetails();
    },
    [selectedId]
  );
  return (
    <div className="MovieDetails">
      <button onClick={handleCloseMovie}>&larr;</button>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="top-part">
            <img src={poster} width="33%" height="100%"></img>
            <div className="right-part">
              <h2>{title}</h2>
              <p>
                {runtime}
                {released}
              </p>
              <p>{genre}</p>
              <p>⭐ {imdbRating} imdbRating</p>
            </div>
          </div>
          <div className="middle-part">
            {isWatched ? (
              <p className="rated">You rated movie {WatchedUserRating} ⭐</p>
            ) : (
              <>
                <StarRating
                  maxRating={10}
                  color="#fcc419"
                  onSetRating={setUserRating}
                  size={25}
                />
                {userRating > 0 ? (
                  <button onClick={handleAdd}>Add To List</button>
                ) : (
                  ""
                )}
              </>
            )}

            <p className="handle"></p>
          </div>
          <div className="bottom-part">
            <p>{plot}</p>
            <p className="middle-paragraph">Starring {writer}</p>
            <p> Directed By {director}</p>
          </div>
        </>
      )}
    </div>
  );
}
