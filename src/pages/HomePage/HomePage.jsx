import { useEffect, useState } from "react";
import axios from "axios";
import css from "./Homepage.module.css";
import MovieList from "../../components/MovieList/MovieList";

export default function Homepage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                    {
                        headers: {
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmM2NmMyZmU0ZmNlZGVjNDU0M2IzZWJiMGJiNDdhYyIsIm5iZiI6MTcyMTA1Njc2NS4zNzEyMTIsInN1YiI6IjY2OTUzYjA2YjkxNGIwNGE0ZjVmNmY5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1t9KqDOZXlKQTjbO_HQ91YhTu0ahu6JrbfnJHcrQBi8",
                        },
                    }
                );
                setMovies(response.data.results);
            }
            catch (error) {
                console.error(
                    "Oops, something went wrong. Please try to reload the page. Error:",
                    error
                );
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className={css.pageContainer}>
            <h1 className={css.pageTitle}>Popular Movies</h1>
            <MovieList movies={movies} />
        </div>
    );

}