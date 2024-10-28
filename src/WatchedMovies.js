import { useState } from "react";
export function WatchedMovies({ children }) {
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
