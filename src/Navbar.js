import { useEffect, useRef } from "react";
export function Navbar({ query, setQuery, NumberofResults }) {
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
      }}
      placeholder="search"
    ></input>
  );
}
function NumResults({ NumberofResults }) {
  return <h3> found {NumberofResults} Results</h3>;
}
