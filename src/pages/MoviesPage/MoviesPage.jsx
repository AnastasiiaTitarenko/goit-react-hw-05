import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
      searchMovies(queryParam);
    }
  }, [searchParams]);

  const searchMovies = async (searchQuery) => {
    if (searchQuery.trim() === "") return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmM2NmMyZmU0ZmNlZGVjNDU0M2IzZWJiMGJiNDdhYyIsIm5iZiI6MTcyMTA1Njc2NS4zNzEyMTIsInN1YiI6IjY2OTUzYjA2YjkxNGIwNGE0ZjVmNmY5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1t9KqDOZXlKQTjbO_HQ91YhTu0ahu6JrbfnJHcrQBi8",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error(
        "Oops, something went wrong. Please try reloading the page. Error:",
        error
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query: query });
  };

  return (
    <div className={css.moviesPage}>
      <h1 className={css.pageTitle}>Search Movies</h1>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}