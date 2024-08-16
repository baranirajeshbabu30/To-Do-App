import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidenav from './Sidenav';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="layout-container">
            <Header />
            <div className="main-content">
                <Sidenav />
                <div className="content">
                    <Outlet /> 
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
