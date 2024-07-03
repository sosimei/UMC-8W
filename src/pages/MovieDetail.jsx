import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { IMG_BASE_URL } from '../components/Movie';

const NO_IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

const getStars = (vote_average) => {
    const stars = Math.floor(vote_average);
    return '★'.repeat(stars) + '☆'.repeat(10 - stars);
};

const CreditContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const CreditItem = styled.div`
  margin: 10px;
  text-align: center;
  color: white;
`;

const CreditImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export default function MovieDetail() {
    const { id } = useParams();
    const { state } = useLocation();
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c004e3cbb51120f3feda30eae128a1af&language=ko`);
                setCredits(response.data.cast.slice(0, 20)); // 최대 20명의 출연진만 가져오기
            } catch (error) {
                console.error('Error fetching credits:', error);
            }
        };

        fetchCredits();
    }, [id]);

    return (
        <div className='page-container'>
            <div style={{ display: 'flex' }} className='movie-detail'>
                <img
                    style={{ width: '300px', height: '450px', marginRight: '20px' }}
                    src={IMG_BASE_URL + state.poster_path}
                    alt="영화 포스터" />

                <div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>{state.title}</div>
                    <div style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>
                        평점: {getStars(state.vote_average)} ({state.vote_average})
                    </div>
                    <div style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>
                        개봉일: {state.release_date}</div>
                    <div style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>줄거리</div>
                    <div style={{ fontSize: '16px', lineHeight: '1.5', color: 'white' }}>{state.overview}</div>
                </div>
            </div>
            <div className='movie-credit' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px', marginBottom: '10px' }}>
                    출연진 및 제작진
                </div>
                <CreditContainer>
                    {credits.map((person) => (
                        <CreditItem key={person.id}>
                            <CreditImage
                                src={person.profile_path ? `${IMG_BASE_URL}${person.profile_path}` : NO_IMAGE_URL}
                                alt={person.name}
                            />
                            <div>{person.name}</div>
                            <div>{person.character || 'Acting'}</div>
                        </CreditItem>
                    ))}
                </CreditContainer>
            </div>
        </div>
    );
}
