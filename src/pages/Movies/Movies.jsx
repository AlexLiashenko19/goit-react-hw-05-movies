import Form from 'components/Form/Form';
import { Loader } from 'components/Loader/Loader';
import EditorList from 'pages/EditorList/EditorList';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchSearchByKeyword } from 'services/Api';

const Movie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoviesText, setNoMoviesText] = useState(false);
  const [query, setQuery] = useState('');

  const searchMovies = useCallback(
    queryMovie => {
      fetchSearchByKeyword(queryMovie)
        .then(searchResult => {
          setSearchFilms(searchResult);
          setNoMoviesText(searchResult.length === 0);
          navigate(
            queryMovie
              ? `/movies?query=${encodeURIComponent(queryMovie)}`
              : '/movies'
          );
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate]
  );

  useEffect(() => {
    const queryMovie = new URLSearchParams(location.search).get('query');
    if (!queryMovie) {
      return;
    }
    if (queryMovie) {
      setQuery(queryMovie);
    }
    searchMovies(queryMovie);
  }, [location.search, searchMovies]);

  useEffect(() => {
    if (location.pathname === '/movies') {
      const queryMovie = new URLSearchParams(location.search).get('query');
      if (!queryMovie) {
        setSearchFilms([]);
      }
    }
  }, [location.pathname, location.search]);

  return (
    <main>
      <Form searchMovies={searchMovies} query={query} />
      {loading && <Loader />}
      {noMoviesText && (
        <p>THERE IS NO MOVIES WITH THIS REQUEST. PLEASE, TRY AGAIN!</p>
      )}
      {searchFilms && <EditorList films={searchFilms} />}
    </main>
  );
};

export default Movie;
