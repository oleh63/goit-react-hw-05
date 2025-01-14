import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const initialValues = {
    search: query,
  };

  const validationSchema = Yup.object({
    search: Yup.string().required("Search query is required"),
  });

  const handleSearch = async (values, { setSubmitting }) => {
    const searchQuery = values.search.trim();
    if (!searchQuery) return;

    setSearchParams({ query: searchQuery });

    try {
      const data = await searchMovies(searchQuery);
      setMovies(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSearch}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <Field
              type="text"
              name="search"
              placeholder="Search movies..."
              className={styles.input}
            />
            <ErrorMessage
              name="search"
              component="div"
              className={styles.error}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.button}
            >
              {isSubmitting ? "Searching..." : "Search"}
            </button>
          </Form>
        )}
      </Formik>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
