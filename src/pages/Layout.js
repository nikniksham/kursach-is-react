import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <spe id="root">
            <Header />
            <div className="main-content">
                <main>{children}</main>
            </div>
            <Footer />
        </spe>
    );
};

export default Layout;