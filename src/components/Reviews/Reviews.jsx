import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from 'services/Api';
import { List } from './Review.style';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const featchReviewsFilm = () => {
      setLoading(true);

      fetchReviews(movieId)
        .then(reviews => {
          setReviews(reviews);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    featchReviewsFilm();
  }, [movieId]);
  return (
    <>
      {loading && <Loader />}
      {reviews.length !== 0 && (
        <div>
          <List>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <h2>Author: {author}</h2>
                <p>{content}</p>
              </li>
            ))}
          </List>
        </div>
      )}
      {reviews.length === 0 && (
        <div>WE DON`T HAVE ANY REVIEWS FOR THIS MOVIE!</div>
      )}
    </>
  );
};

export default Reviews;
