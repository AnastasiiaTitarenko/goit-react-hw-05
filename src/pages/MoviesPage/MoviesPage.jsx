import { useEffect, useState } from "react";
import axios from "axios";
import css from "./MoviesPage.module.css"
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
    const [query, setQuery] = useState(" ");
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const queryParam = setSearchParams.get("query");
        if (queryParam) {
            setQuery(queryParam);
            searchMovies(queryParam);
        }
    }, [searchParams]);

    const searchMovies = async (searchQuery) => {
        if (searchQuery.trim() === " ") return;

        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1`,
                {
                    headers: {
                        Authorization:
                            "Bearer api_read_access_token"
                    },
                }
            );
            setMovies(response.data.results);
        }
        catch (error) {
            console.error(
                "Oops, something went wrong. Please try reload the page. Error:",
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
