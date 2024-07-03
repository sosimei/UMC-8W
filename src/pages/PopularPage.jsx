import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import Movie from '../components/Movie';

const fetchMovies = async ({ queryKey }) => {
  const [, page] = queryKey;
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c004e3cbb51120f3feda30eae128a1af&language=ko&page=${page}&region=KR`);
  return response.data.results;
};

const PopularPage = () => {
  const [page, setPage] = useState(1);
  const { data: movies, error, isLoading } = useQuery({
    queryKey: ['movies', page],
    queryFn: fetchMovies,
    keepPreviousData: true,
  });

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data. Please try again.</div>;
  }

  return (
    <div>
      <AppContainer>
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
      </AppContainer>
      <Pagination>
        <PageButton
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          &lt;
        </PageButton>
        <PageNumber>{page}</PageNumber>
        <PageButton onClick={handleNextPage}>
          &gt;
        </PageButton>
      </Pagination>
    </div>
  );
};

export default PopularPage;

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  background-color: ${props => props.disabled ? 'gray' : 'blue'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 1rem;
`;

const PageNumber = styled.span`
  font-size: 1.5rem;
  margin: 0 1rem;
`;
