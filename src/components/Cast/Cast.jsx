import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActors } from 'services/Api';
import { CastHeader, CastListItem, CastName, Wrapper } from './Cast.style';

const Cast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onAutorsOfMovie = () => {
      setLoading(true);

      fetchActors(movieId)
        .then(actors => {
          setActors(actors);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    onAutorsOfMovie();
  }, [movieId]);

  return (
    <Wrapper>
      {loading && <Loader />}
      <h3>The cast of characters</h3>
      <CastListItem>
        {actors.map(({ id, profile_path, original_name, name, character }) => (
          <li key={id}>
            <img
              width="200px"
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={original_name}
            />
            <CastHeader>{name}</CastHeader>
            <CastName>character: {character}</CastName>
          </li>
        ))}
      </CastListItem>
    </Wrapper>
  );
};

export default Cast;
