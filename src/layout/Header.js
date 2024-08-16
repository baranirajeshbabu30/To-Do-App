import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../layout/Header.css'; 

const Header = ({ searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();
    const [useremail, setUseremail] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        const storedUseremail = localStorage.getItem('useremail');
        const storedDarkMode = localStorage.getItem('darkMode') === 'true';
       
        setUseremail(storedUseremail);
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
        localStorage.removeItem('useremail');
        localStorage.removeItem('darkMode');
        setUseremail('');
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
                    <div className="profile-icon" onClick={toggleDropdown}>
                        <h3 className="profile-name" >profile</h3>
                    </div>
                    {dropdownVisible && (
                        <ul className="profile-dropdown">
                            <li className="profile-dropdown-item">{useremail}</li>
                            <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;