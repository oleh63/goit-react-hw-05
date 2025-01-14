import { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Outlet,
  Link,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const defaultImg = "https://picsum.photos/300/450?text=No+Image";

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    };
    fetchData();
  }, [movieId]);

  const goBack = () => {
    navigate(location.state?.from ?? "/movies");
  };

  if (!movie) return null;

  return (
    <div className={styles.container}>
      <button onClick={goBack} className={styles.button}>
        Go back
      </button>
      <div className={styles.details}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          className={styles.image}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>
      <ul className={styles.links}>
        <li>
          <Link to="cast" state={{ from: location.state?.from }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: location.state?.from }}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
