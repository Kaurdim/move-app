import React, { useState } from 'react';
import styles from './styles.module.css';


const Search = (props) => {
  const [searchMovie, setSearchMovie] = useState('');
  
  const handleSearchInputChanges = (e) => {
    setSearchMovie(e.target.value.trim());
  }

  const resetInputField = () => {
    setSearchMovie('')
  }

  const callSearchFunction = (evt) => {
    evt.preventDefault();
    if (!searchMovie) {
      return;
    }
    props.search(searchMovie);
    resetInputField();
  }

  return (
      <form className={styles.search}>
        <input
          value={searchMovie}
          onChange={handleSearchInputChanges}
          type='text'
        />
        <button onClick={callSearchFunction}>
          SEARCH
        </button>
      </form>
    );
}

export default Search;