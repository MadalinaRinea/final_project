import React, { useEffect, useState } from 'react';
import MovieItem from './MovieItem';


export default function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://movies-app-siit.herokuapp.com/movies')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
            // data = { pagination: {}, results: [Movie, Movie, Movie]}
            .then(data => setMovies(data.results));
    }, []);

  

    return (    
    <div>
        <h1>Movies</h1>
        <div className="row justify-content-between">
            { movies.map(item => <MovieItem movie={ item } key={ item._id }   />) }
        </div>
    </div>
    );
}
