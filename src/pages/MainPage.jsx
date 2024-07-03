import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { debounce } from 'lodash';
import Movie from '../components/Movie';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000;
`;

const WelcomeText = styled.div`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #22254b;
  width: 100%;
  padding: 50px 0;

  @media (max-width: 768px) {
    padding: 30px 0;
  }
`;

const SearchTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const SearchButton = styled.button`
  background-color: #ffcc00;
  border: none;
  border-radius: 50%;
  margin-left: 10px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const SearchIcon = styled.span`
  font-size: 20px;
`;

const ResultsContainer = styled.div`
  display: grid;
  background-color: grey;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 20px; 
  margin-top: 20px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 0 20px;
  width: 100%;
  justify-content: center;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 10px;
  }
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: 18px;
  margin-top: 20px;
`;

export default function MainPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=c004e3cbb51120f3feda30eae128a1af&language=ko&query=${query}`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <PageContainer>
      <WelcomeText>Welcome to the Movie Database</WelcomeText>
      <SearchSection>
        <SearchTitle>Search for a Movie</SearchTitle>
        <SearchForm onSubmit={(e) => e.preventDefault()}>
          <SearchInput
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter movie name"
          />
          <SearchButton type="submit">
            <SearchIcon>🔍</SearchIcon>
          </SearchButton>
        </SearchForm>
      </SearchSection>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <ResultsContainer>
          {results.map((movie) => (
            <Movie key={movie.id} {...movie} />
          ))}
        </ResultsContainer>
      )}
    </PageContainer>
  );
}
