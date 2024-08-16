import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './Auth.css'; 

const Login = () => {
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { useremail, password });
            const { token, userId, useremail: responseEmail } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('useremail', responseEmail);

            navigate('/todo-list'); 
        } catch (error) {
            console.error('Login error:', error);
            alert('Invalid credentials');
        }
    };

    const handleSignupClick = () => {
        navigate('/signup'); 
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            value={useremail}
                            onChange={(e) => setUseremail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <button onClick={handleSignupClick} className="signup-button">Go to Signup</button>
            </div>
        </div>
    );
};

export default Login;
