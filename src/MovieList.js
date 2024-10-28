import { useState } from "react";
export function MovieList({ movies, selectedId, handleSelectId }) {
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
        <img src={img} alt={title}></img>
      </div>
      <div className="right-part">
        <h3>{title}</h3>
        <span> 🗓 {year}</span>
      </div>
    </div>
  );
}
