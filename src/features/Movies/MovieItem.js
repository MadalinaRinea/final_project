import React from 'react'
import { Link } from 'react-router-dom';

export default function MovieItem({ movie, onDelete }) {

    console.log();

    function handleDelete(e) {
        fetch('http://movies-app-siit.herokuapp.com/movies' + movie._id,{
            method: 'DELETE'
        })
            .then(res => res.text())
            .then(message => {
                console.log(message);
                onDelete(movie._id);
            });
    }

    return (
        <div className="card col-3">
            <img src={movie.Poster} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{ movie.Title }</h5>
                <p className="card-text">{movie.Genre}</p>
                <Link to={ `/movie/${movie._id}` } className="btn btn-primary">Details</Link>
                
                <button className="btn btn-danger" onClick={ handleDelete }>Delete</button>
            </div>
        </div>
    );
}