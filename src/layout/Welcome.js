import React from 'react';
import { Link } from 'react-router-dom';
import '../layout/Welcome.css';

const Welcome = () => {
    return (
        <div className="landing-contaisner">
            <div className="landing-content">
                <h1>Welcome to Your Ultimate To-Do List App!</h1>
                <p>Transform your tasks into achievements with our easy-to-use to-do list application. Stay organized and boost your productivity today!</p>
                <Link to="/login" className="signup-button">Log In Now</Link>
            </div>
        </div>
    );
}

export default Welcome;
