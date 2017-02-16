// Core
import React from 'react';
import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

// Styles
import style from '../styles/styles.scss';

// Compontents
import Home from './pages/home.jsx';
import Blog from './pages/blog.jsx';


render((
    <div>
        <Router history={hashHistory}>
            <Route path="/" component={Home}/>
            <Route path="/blog" component={Blog}/>
        </Router>
    </div>
), document.getElementById('app'))
