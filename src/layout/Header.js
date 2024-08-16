import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../layout/Header.css'; 

const Header = ({ searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();
    const [useremail, setUseremail] = useState('');
    const [token, setToken] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUseremail = localStorage.getItem('useremail');
        const storedDarkMode = localStorage.getItem('darkMode') === 'true';
        
        if (storedToken) {
            setToken(storedToken);
            setUseremail(storedUseremail || '');
        }
        
        setDarkMode(storedDarkMode);
        document.body.classList.toggle('dark-mode', storedDarkMode);
    }, []);

    const toggleTheme = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.body.classList.toggle('dark-mode', newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('useremail');
        localStorage.removeItem('darkMode');
        setUseremail('');
        setToken('');
        navigate('/login'); 
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
            <div className="header-left">
                <h1>TODO LIST</h1>
            </div>
            <div className="header-right">
                <button className="theme-toggle" onClick={toggleTheme}>
                    {darkMode ? '🌙' : '☀️'}
                </button>
                <div className="profile">
                    {token && (
                        <>
                            <div className="profile-icon" onClick={toggleDropdown}>
                                <span className="profile-icon-placeholder">👤</span>
                            </div>
                            {dropdownVisible && (
                                <ul className="profile-dropdown">
                                    <li className="profile-dropdown-item">{useremail}</li>
                                    <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
