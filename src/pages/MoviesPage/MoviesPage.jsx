import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      query: "",
    },
    validationSchema: Yup.object({
      query: Yup.string()
        .min(2, "Search term must be at least 2 characters")
        .required("Search term is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await fetchMoviesByQuery(values.query.trim());
        if (data.length === 0) {
          setError("No results found.");
        } else {
          setError(null);
        }
        setMovies(data);
      } catch (error) {
        setError("Failed to fetch movies.");
        setMovies([]);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          value={formik.values.query}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${styles.input} ${
            formik.touched.query && formik.errors.query ? styles.errorInput : ""
          }`}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {formik.touched.query && formik.errors.query && (
        <p className={styles.error}>{formik.errors.query}</p>
      )}
      {error && <p className={styles.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
