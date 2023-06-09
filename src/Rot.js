import React from 'react';
import App2 from './App2';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Rot() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" component={mainPage} exact /> */}
                <Route path="/app" component={App2} />
            </Routes>
        </Router>
    );
}

export default Rot;
