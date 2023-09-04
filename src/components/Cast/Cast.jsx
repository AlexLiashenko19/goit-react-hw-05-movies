import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActors } from 'services/Api';
import {
  CastHeader,
  CastList,
  CastListItem,
  CastName,
  Wrapper,
} from './Cast.style';
import defaultImg from '../Image/2922700.png';

// const defaultImg = `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fru%2Fpng-nwmdp&psig=AOvVaw3-2KGcTs6SQvEudM5onJ5K&ust=1693919905671000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIi0wMOFkYEDFQAAAAAdAAAAABAa`;
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
      <CastList>
        {actors.map(({ id, profile_path, original_name, name, character }) => (
          <CastListItem key={id}>
            <img
              width="200px"
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : defaultImg
              }
              alt={original_name}
            />
            <CastHeader>{name}</CastHeader>
            <CastName>character: {character}</CastName>
          </CastListItem>
        ))}
      </CastList>
    </Wrapper>
  );
};

export default Cast;
