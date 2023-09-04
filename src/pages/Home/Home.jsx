import { Loader } from 'components/Loader/Loader';
import EditorList from 'pages/EditorList/EditorList';
import { useEffect, useState } from 'react';
import { fetchTrending } from 'services/Api';
import { SectionTitle } from './Home.style';

const Home = () => {
  const [films, setFilm] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingFilms = () => {
      setLoading(true);
      fetchTrending()
        .then(trendingFilms => {
          setFilm(trendingFilms);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchTrendingFilms();
  }, []);
  return (
    <main>
      <SectionTitle>Trending today</SectionTitle>
      <EditorList films={films} />
      {loading && <Loader />}
    </main>
  );
};

export default Home;
