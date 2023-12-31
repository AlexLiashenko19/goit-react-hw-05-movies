import axios from 'axios';
// базова URL-адреса для викликів AP
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
// ключ
const API_KEY = '48137aa323ffd59f149eae09a7ddffd1';

// список найпопулярніших фільмів на сьогодні для створення колекції на головній сторінці.
export const fetchTrending = async () => {
  const response = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

// пошук фільму за ключовим словом на сторінці фільмів.(keyword)
export const fetchSearchByKeyword = async query => {
  const response = await axios.get(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
  return response.data.results;
};

// запит повної інформації про фільм для сторінки кінофільму.
export const fetchMovieDetails = async movieId => {
  const response = await axios.get(
    // https://api.themoviedb.org/3/movie/335977?api_key=48137aa323ffd59f149eae09a7ddffd1&language=en-US
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

// запит інформації про акторський склад для сторінки кінофільму.
export const fetchActors = async movieId => {
  const response = await axios.get(
    `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
  return response.data.cast;
};

// запит оглядів для сторінки кінофільму.
export const fetchReviews = async movieId => {
  const response = await axios.get(
    `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};
