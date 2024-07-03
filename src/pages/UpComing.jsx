import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=c004e3cbb51120f3feda30eae128a1af&language=ko&page=1&region=KR`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data from TMDB', error);
        setError('Error fetching data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="app-container">
        {movies.map((item) => (
          <Movie
            key={item.id}
            id={item.id}
            title={item.title}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            overview={item.overview}
          />
        ))}
      </div>
    </div>
  );
};

export default NowPlayingPage;
