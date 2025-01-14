import styles from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.link}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={320}
              height={400}
              className={styles.poster}
            />
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
