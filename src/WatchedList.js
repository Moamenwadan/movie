export function WatchedList({ watched, handleDeleteWatched }) {
  return (
    <div className="wathcedList">
      {watched.map((watchedMovie) => (
        <WatchedMovie
          key={watchedMovie.imdbID}
          watchedMovie={watchedMovie}
          userRating={watchedMovie.userRating}
          handleDeleteWatched={handleDeleteWatched}
        />
      ))}
    </div>
  );
}
function WatchedMovie({ userRating, watchedMovie, handleDeleteWatched }) {
  return (
    <div className="WatchedMovie">
      <div className="left-part">
        <img src={watchedMovie.poster} alt={watchedMovie.title}></img>
      </div>
      <div className="right-part">
        <h3>{watchedMovie.title}</h3>
        <span>{watchedMovie.imdbRating} ⭐</span>
        <span className="middle">{userRating} 🌟</span>
        <span>{watchedMovie.runtime} ⌛</span>
        <button onClick={() => handleDeleteWatched(watchedMovie.imdbID)}>
          X
        </button>
      </div>
    </div>
  );
}
