import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function MovieDetails() {
    const [movie, setMovie] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetch('http://movies-app-siit.herokuapp.com/movies' + id)
            .then(res => res.json())
            .then(data => setMovie(data.results));
    }, [id]);

    if(!movie) {
        return <h1>Loading ...</h1>;
    }

    return (
        <div>
            <h1>{ movie.Title }</h1>
            <p>{movie.Genre}</p>
            <p>{ movie.Language}</p>

            <div>
                 <Link className="btn btn-success" to={ '/movies/edit/' + id }>Edit Movie</Link>
            </div>
        </div>
    )
}
