import Form from 'components/Form/Form';
import { Loader } from 'components/Loader/Loader';
import EditorList from 'pages/EditorList/EditorList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchByKeyword } from 'services/Api';

const Movie = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) return;
    (async () => {
      setLoading(true);
      try {
        const fetchSearch = await fetchSearchByKeyword(query);
        setSearchFilms(fetchSearch);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  const searchMovies = query => {
    setSearchParams({ query });
  };

  return (
    <main>
      <Form searchMovies={searchMovies} />
      {loading && <Loader />}
      {searchFilms.length === 0 && (
        <p>THERE IS NO MOVIES WITH THIS REQUEST. PLEASE, TRY AGAIN!</p>
      )}
      {searchFilms && <EditorList films={searchFilms} />}
    </main>
  );
};

export default Movie;
