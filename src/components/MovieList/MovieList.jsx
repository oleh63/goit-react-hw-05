import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/${movie.id}`} className={styles.link}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
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
