import { Loader } from 'components/Loader/Loader';
import { fetchMovieDetails } from 'services/Api';
import {
  Button,
  Container,
  LinkInfo,
  List,
  ListInfo,
} from './MovieDetails.style';

const { useState, useEffect, Suspense } = require('react');
const { useParams, Outlet, Link, useLocation } = require('react-router-dom');

const MovieDetails = () => {
  const { movieId } = useParams();

  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetailsFims = () => {
      setLoading(true);
      fetchMovieDetails(movieId)
        .then(detailMovie => {
          setMovieInfo(detailMovie);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchMovieDetailsFims();
  }, [movieId]);

  if (!movieInfo) {
    return;
  }

  const {
    title,
    release_date,
    popularity,
    overview,
    genres,
    poster_path,
    original_title,
  } = movieInfo || {};

  return (
    <>
      <Link to={location.state?.from ?? '/'}>
        <Button type="button">Go back</Button>
      </Link>
      {loading && <Loader />}
      {movieInfo && (
        <Container>
          <img
            width="300px"
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : `https://via.placeholder.com/200x300?text=No+Image`
            }
            alt={original_title}
          />
          <Container>
            <h1>
              {title} ({release_date.slice(0, 4)})
            </h1>
            <p>User score: {popularity}</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <List>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </List>
          </Container>
        </Container>
      )}
      <hr />
      <div>
        <h3>Additional information</h3>
        <ListInfo>
          <li>
            <LinkInfo to="cast">Cast</LinkInfo>
          </li>
          <li>
            <LinkInfo to="reviews">Reviews</LinkInfo>
          </li>
        </ListInfo>
        <hr />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieDetails;
