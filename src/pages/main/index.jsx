import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Search from '../../components/ui/search';
import Movie from '../../components/ui/movie';
import styles from './styles.module.css';
import Loader from '../../components/ui/loader';
import { getMovies, getMovieById } from '../../api';

function MainPage () {

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const init = async () => {
      await searchMovies();
    }
    init();
  }, []);

  const searchMovies = async (search) => {
    setLoading(true);
    let errorMessage = 'Failed to get movies';
    try {
      const data = await getMovies(search);
      if (data.Response === 'Error') {
        errorMessage  = data.Error;
        setErrorMessage(errorMessage);
        return;
      }
      if (data.Search) {
        const movies = data.Search.map(movie => (
          {
            ...movie,
            Description: '',
          }
        ));
        setMovies(movies);
      }
    } catch (err) {
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const getMovieInfo = async (id) => {
    try {
      const info = await getMovieById(id);
      setMovies(movies.map(movie => {
        if (movie.imdbID === id) {
          movie.Description = info.Plot;
        }
        return movie;
      }));
    } catch (err) {
      // TODO: show error
      console.log(err);
    }
  }

  return (
    <>
      <Header text='Movie App' />
      <Search search={searchMovies}/>
      <p className={styles.appIntro}>Sharing a few of our favourite movies</p>
      <div className={styles.moves}>
        {loading && !errorMessage ? (
         <Loader />
         ) : errorMessage ? (
          <div className={styles.errorMessage}>{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} getMovieInfo={getMovieInfo}/>
          ))
        )}
      </div>
    </>
  );
}

export default MainPage;