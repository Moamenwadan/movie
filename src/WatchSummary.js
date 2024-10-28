const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export function WatchSummary({ watched }) {
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
