import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Main = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
           {isLogin || <Navbar></Navbar>}
           <div className="">
            <Outlet></Outlet>
           </div>
            
            {isLogin || <Footer></Footer>}
            
        </div>
    );
};

export default Main;