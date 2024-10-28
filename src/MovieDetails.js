import { useState, useEffect } from "react";
import { key } from "./App-2";
import { Loader } from "./Loader";
import StarRating from "./starRating";
export function MovieDetails({
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
    Poster: poster,
    Runtime: runtime,
    Title: title,
    imdbRating,
    Genre: genre,
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
  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") {
  //         handleCloseMovie();
  //       }
  //     }
  //     document.addEventListener("keydown", callback);

  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   },
  //   [handleCloseMovie]
  // );

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
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie || ${title}`;
      return function () {
        document.title = "usePopCorn";
        // console.log(`clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  return (
    <div className="MovieDetails">
      <button onClick={handleCloseMovie}>&larr;</button>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="top-part">
            <img
              src={poster}
              alt="this is the poster of movie"
              width="33%"
              height="100%"
            ></img>
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
