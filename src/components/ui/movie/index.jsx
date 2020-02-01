import React, { useState } from 'react';
import Loader from '../loader';
import styles from './styles.module.css';
import defImg from '../../../images/default.png'


const Movie = ({ movie, getMovieInfo }) => {
  const [isLoadingInfo, setLoadingInfo] = useState(true);

  const getInfo = async () => {
    if (movie.Description) {
      return;
    }
    setLoadingInfo(true);
    await getMovieInfo(movie.imdbID);
    setLoadingInfo(false);
  }

  const poster = movie.Poster === "N/A" ? defImg : movie.Poster;
  return (
    <div className={styles.movie} onMouseEnter={getInfo}>
      <div className={styles.poster}>
        <img
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <div className={styles.back} >
        <h2 className={styles.movieTitle}>{movie.Title}</h2>
        <p className={styles.movieYear}>Year: {movie.Year}</p>
        {isLoadingInfo ? <Loader size={30}/> : 
          <p className={styles.movieDescription}>{movie.Description}</p>} 
      </div>
    </div>
  );
};


export default Movie;