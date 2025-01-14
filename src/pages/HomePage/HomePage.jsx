import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import styles from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    getData();
  }, []);
  return (
    <div>
      <h2>Tranding today</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
