// Core
import React from 'react';
import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

// Styles
import style from '../styles/styles.scss';

// Compontents
import home from './pages/home.jsx';


render((
    <div>
        <Router history={hashHistory}>
            <Route path="/" component={home}/>
        </Router>
    </div>
), document.getElementById('app'))
