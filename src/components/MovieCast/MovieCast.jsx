import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";

export default function MovieCast() {
    const { movieId } = useParams();
    const [cats, setCast] = useState([]);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
                    {
                        headers: {
                            Authorization:
                                `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmM2NmMyZmU0ZmNlZGVjNDU0M2IzZWJiMGJiNDdhYyIsIm5iZiI6MTcyMTA1Njc2NS4zNzEyMTIsInN1YiI6IjY2OTUzYjA2YjkxNGIwNGE0ZjVmNmY5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1t9KqDOZXlKQTjbO_HQ91YhTu0ahu6JrbfnJHcrQBi8`,
                        },
                    }
                );
                setCast(response.data.cast);
            }
            catch (error) {
                console.error("Error fetching cast:", error);
            }
        };
        fetchCast();
    }, [movieId]);

    return (
        <div className={css.castContainer}>
            <h2>Cast</h2>
            <ul className={css.castList}>{cast.map((actor) => (
                <li key={actor.cats_id} className={css.castItem}>
                    <p className={css.actorName}>{actor.name}</p>
                    <p className={css.characterName}>Character: {actor.character}</p>
                    {actor.profile_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={`${actor.name} profile`}
                            className={css.actorImage}
                        />
                    )}
                </li>
            ))}
            </ul>

        </div>
    );
}