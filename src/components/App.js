import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Nav from './Nav';
import MoviesList from '../features/Movies/MoviesList';
import MovieDetails from '..//features/Movies/MovieDetails';
import EditMovie from '../features/Movies/EditMovie';
import LoginRegister from '../features/Auth/LoginRegister';

import { AuthContextProvider } from '../features/Auth/AuthContext';

import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <AuthContextProvider>
        <div className="container">
            <Router>
                <Nav />

                <Route exact path="/login" component={ LoginRegister } />
                <Route exact path="/register" component={ LoginRegister } />

                <Route exact path="/" component={ () => <h1 className="">Movies</h1> } />
                <Route exact path="/movies" component={ MoviesList } />       
                <Route exact path="/movies/edit/:id" component={ EditMovie } />       
                <Route exact path="/movies/:id" component={ MovieDetails } />       
            </Router>
        </div>
    </AuthContextProvider>
);
}

export default App;
