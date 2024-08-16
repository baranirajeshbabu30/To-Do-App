import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './Auth.css'; 
import { toast } from 'react-toastify';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [useremail, setUseremail] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/auth/signup', { username, password, useremail });
            toast.success('User signed up successfully.');
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
            toast.error('Signup failed. Please try again.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Signup</h2>
                {loading ? (
                    <div className="loading-spinner">Loading...</div> 
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
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
                        <div className="form-group">
                            <input
                                type="email"
                                value={useremail}
                                onChange={(e) => setUseremail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <button type="submit">Signup</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Signup;
