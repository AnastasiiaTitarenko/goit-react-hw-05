import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmM2NmMyZmU0ZmNlZGVjNDU0M2IzZWJiMGJiNDdhYyIsIm5iZiI6MTcyMTA1Njc2NS4zNzEyMTIsInN1YiI6IjY2OTUzYjA2YjkxNGIwNGE0ZjVmNmY5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1t9KqDOZXlKQTjbO_HQ91YhTu0ahu6JrbfnJHcrQBi8",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error(
          "Oops, something went wrong. Please try reloading the page. Error:",
          error
        );
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.reviewsContainer}>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={css.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <p className={css.reviewAuthor}>Author: {review.author}</p>
              <p className={css.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews.</p>
      )}
    </div>
  );
}