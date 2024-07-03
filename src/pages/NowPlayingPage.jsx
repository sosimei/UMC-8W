import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import Movie from '../components/Movie';
import Spinner from '../components/Spinner';

const fetchNowPlayingMovies = async ({ pageParam = 1 }) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=c004e3cbb51120f3feda30eae128a1af&language=ko&page=${pageParam}&region=KR`);
  return {
    results: response.data.results,
    nextPage: pageParam + 1,
    totalPages: response.data.total_pages,
  };
};

const NowPlayingPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage <= lastPage.totalPages) {
        return lastPage.nextPage;
      }
      return undefined;
    },
  });

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching data. Please try again.</div>;
  }

  return (
    <div>
      <AppContainer>
        {data.pages.map((page) =>
          page.results.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              overview={movie.overview}
            />
          ))
        )}
      </AppContainer>
      {isFetchingNextPage && <SpinnerContainer><Spinner /></SpinnerContainer>}
    </div>
  );
};

export default NowPlayingPage;

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;
