import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min.js';
import { path } from '../../utils'

// scss
import './HomePage_User.scss'

// import giao diện của HomeUser
import Header_Top from './Header/Header_Top/Header_HomePage_User.js';
import Header_Logo from './Header/Header_Logo/Header_Logo.js'
import Banner from './Banner/Banner';
import FlashSale from './FlashSale/FlashSale';
import Brand from './Brand/Brand.js';
import DoanhMuc from './DoanhMuc/DoanhMuc.js';
import All_Products from './SanPham/All_Products.js';
import Footer from './Footer/Footer.js';

class HomePage_User extends Component {

    render() {
        const { systemMenuPath, isLoggedIn } = this.props;


        return (
            <>
                <div className='homepage'>
                    <Header_Top />
                    <Header_Logo />

                    <Banner />
                    <FlashSale />
                    <Brand />
                    <DoanhMuc />
                    <All_Products />

                    <Footer />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage_User);
