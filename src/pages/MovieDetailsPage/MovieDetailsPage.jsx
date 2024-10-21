import { useEffect, useState, useRef } from "react";
import axios from "axios";
import css from "./MovieDetailsPage.module.css";
import { useParams, Link, Outlet, useNavigate, useLocation } from "react-router-dom";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const prevLocationState = useRef(location.state);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    {
                        headers: {
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmM2NmMyZmU0ZmNlZGVjNDU0M2IzZWJiMGJiNDdhYyIsIm5iZiI6MTcyMTA1Njc2NS4zNzEyMTIsInN1YiI6IjY2OTUzYjA2YjkxNGIwNGE0ZjVmNmY5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1t9KqDOZXlKQTjbO_HQ91YhTu0ahu6JrbfnJHcrQBi8",
                        },
                    }
                );
                setMovie(response.data);
            }
            catch (error) {
                console.error(
                    "Oops, something went wrong. Please try to reload the page. Error:",
                    error
                );
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    const goBack = () => {
        if (prevLocationState.current) {
            navigate(-1, { state: prevLocationState.current });
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={css.pageContainer}>
            <button onClick={goBack} className={css.navLink}>Go Back</button>
            <h1 className={css.pageTitle}>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={css.movieImage}
            />
            <p className={css.movieOverview}>{movie.overview}</p>
            <nav className={css.navLinks}>
                <Link to="cast" className={css.navLink}>Cast</Link>
                <Link to="reviews" className={css.navLink}>Reviews</Link>
            </nav>
            <Outlet />

        </div>
    );

}
