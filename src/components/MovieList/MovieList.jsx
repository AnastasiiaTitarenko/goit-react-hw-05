import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieListItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.movieLink}
          >
            <h3 className={css.movieTitle}>{movie.title}</h3>
            <p className={css.movieOverview}>{movie.overview}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}