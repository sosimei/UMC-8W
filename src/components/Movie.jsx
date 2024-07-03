import React from 'react';
import { useNavigate } from 'react-router-dom';


export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

export default function Movie(props) {
    const navigate = useNavigate();

    const onclickMovieItem = () => {
        navigate(`/movie/${props.id}`,{
            state: props
        })
    }

    return (
        <div className="movie-container" onClick={onclickMovieItem}>
            <img src={IMG_BASE_URL + props.poster_path} alt="영화 포스터" />
            <div className="movie-info">
                <h3>{props.title}</h3>
                <span>{props.vote_average}</span>
            </div>
            <div className="movie-overview">
                {props.overview}
            </div>
            <div style={{ visibility: 'hidden'}} className='movie-release-date'>
                {props.release_date}
            </div>
        </div>
    );
}