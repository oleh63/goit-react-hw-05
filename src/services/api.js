import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGY4MDY3YTUwZmRjOGNiMDI5OTVkZDZiZjY5YzdmNyIsIm5iZiI6MTczNjc5ODAwNi4xMDQsInN1YiI6IjY3ODU2ZjM2NGJmZDdlZjU1ZGJiNDI1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aAPje54x8-wzeySwX-W_Eln3kEZtQhNlQ9Ls1BDlr-o";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};
// Трендові фільми
export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(
    `/trending/movie/day?language=en-US`,
    options
  );
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}?language=en-US`, options);
  return data;
};

export const searchMovies = async (query) => {
  const { data } = await axios.get(`/search/movie?query=${query}`, options);
  return data.results;
};

export const fetchMovieCast = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/credits`, options);
  return data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`, options);
  return data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const { data } = await axios.get(
    `/search/movie?query=${query}&language=en-US`,
    options
  );
  return data.results;
};
