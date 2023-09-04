import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, SearchForm } from './Form.style';

const Form = ({ searchMovie, query }) => {
  const [inputQuery, setInputQuery] = useState('');

  useEffect(() => {
    setInputQuery(query);
  }, [query]);

  const handleInputChange = event => {
    setInputQuery(event.target.value);
  };

  const handleSubmit = e => {
    e.prevenrDefault();
    searchMovie(inputQuery.toLocaleLowerCase());
  };
  return (
    <SearchForm onSubmit={handleSubmit}>
      <Input
        type="text"
        name="query"
        autoFocus
        value={inputQuery}
        onChange={handleInputChange}
      />
      <Button type="submit">Search</Button>
    </SearchForm>
  );
};

Form.propTypes = {
  searchMovies: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default Form;
