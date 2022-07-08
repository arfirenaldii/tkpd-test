import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import App from '../App';

import Anime from '../pages/Anime';
import Collections from '../pages/Collections';

export default function Pages() {
    return (
        <Router primary={false} component={Fragment}>
            <App path="/" />
            <Anime path="/anime" />
            <Anime path="/anime/:id" />
            <Collections path="/collection" />
        </Router>
    );
}
