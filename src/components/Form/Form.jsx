import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, SearchForm } from './Form.styled';

const Form = ({ searchMovies }) => {
  const [inputQuery, setInputQuery] = useState('');

  const handleInputChange = event => {
    setInputQuery(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    searchMovies(e.target.query.value.toLowerCase().trim());
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
};

export default Form;
