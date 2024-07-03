import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { IMG_BASE_URL } from '../components/Movie';

const getStars = (vote_average) => {
    const stars = Math.floor(vote_average / 1);
    return '★'.repeat(stars) + '☆'.repeat(10 - stars);
};


export default function MovieDetail() {
    const { state } = useLocation();

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
            <div className='movie-credit' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}>
                    출연진 및 제작진
                </div>
                <div>안녕</div>
            </div>
        </div>
    )
}
