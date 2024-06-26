"use client";

import { useState, useEffect } from "react";
import { SearchIcon } from "src/components/icons/SearchIcon";
import Masonry from "react-masonry-css";
import "./styles.scss";

export default function App() {
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    768: 1,
  };
  const [inputValue, setInputValue] = useState("");
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    fetchDefaultGifs();
  }, []);

  function fetchDefaultGifs() {
    const apiKey = "fo3rkJN8rN4yN24Y1O4yzgAGwOFcgz2D";
    const defaultEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;

    fetch(defaultEndpoint)
      .then((response) => response.json())
      .then((jsonResponse) => setGifs(jsonResponse.data))
      .catch((error) => console.log(error));
  }

  function fetchAndSendInputValue() {
    if (inputValue.trim() !== "") {
      const apiKey = "fo3rkJN8rN4yN24Y1O4yzgAGwOFcgz2D";
      const defaultEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputValue}`;

      fetch(defaultEndpoint)
        .then((response) => response.json())
        .then((jsonResponse) => setGifs(jsonResponse.data))
        .catch((error) => console.log(error));
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      fetchAndSendInputValue();
    }
  }

  function inputLogic(event) {
    const inputValue = event.target.value;
    setInputValue(inputValue.trim());

    if (inputValue === "") {
      fetchDefaultGifs();
    }
  }

  return (
    <>
      <nav>
        <input
          placeholder="Search a gif"
          value={inputValue}
          onChange={inputLogic}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={fetchAndSendInputValue}
          className="button primary"
          disabled={!inputValue.trim()}
        >
          <SearchIcon />
        </button>
      </nav>
      <main className="main">
        <div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid-column"
          >
            {gifs.map((gif: any) => (
              <div key={gif.id}>
                <img src={gif.images.fixed_width.url} alt={gif.alt_text} />
              </div>
            ))}
          </Masonry>
        </div>
      </main>
    </>
  );
}
