import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Animes from '../pages/Animes';
import Anime from '../pages/Anime';
import Collections from '../pages/Collections';
import Collection from '../pages/Collection';

export default function Pages() {
    return (
        <Router primary={false} component={Fragment}>
            <Animes path="/" />
            <Anime path="/anime/:id" />
            <Collections path="/collection" />
            <Collection path="/collection/:id" />
        </Router>
    );
}
