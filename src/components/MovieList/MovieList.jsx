import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
    const location = useLocation();

    return (
        <ul className={css.MovieList}>
            {movies.map((movie) => (
                <li key={movie.id} className={css.movieListItem}>
                    <Link to={{
                        pathname: `/movies/${movie.id}`,
                        state: { from: location },
                    }}
                        className={css.movieLink}
                    >
                        <h3 className={css.movie.Title}>{movie.title}</h3>
                        <p className={css.movieOverview}>{movie.overview}</p>
                    </Link>
                </li>
            ))}

        </ul>
    );
}