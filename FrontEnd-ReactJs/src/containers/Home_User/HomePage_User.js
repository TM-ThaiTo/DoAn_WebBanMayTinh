import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min.js';
import { path } from '../../utils'
import { Col, Pagination, Row, Spin } from 'antd';


// scss
import './HomePage_User.scss'

// import giao diện của HomeUser
import Header_Top from './Header/Header_Top/Header_HomePage_User.js';
import Header_Logo from './Header/Header_Logo/Header_Logo.js'
import Banner from './Banner/Banner';
import FlashSale from './FlashSale/FlashSale.js';
import Brand from './Brand/Brand.js';

import Laptop from './DoanhMuc/Laptop/index.js';
import ManHinh from './DoanhMuc/ManHinh/index.js';
import Gear from './DoanhMuc/Gear/index.js';

import DoanhMuc from './DoanhMuc/index.js';
// import All_Products from './SanPham/All_Products.js';
import Footer from './Footer/Footer.js';
import SaleOff from './SaleOff/index.js';
import Filter  from '../../components/Filter';
import AllProduct from './SanPham/index.js';

class HomePage_User extends Component {

    render() {
        const { systemMenuPath, isLoggedIn } = this.props;


        return (
            <>
                <div className='homepage'>
                    {/* <Header_Top /> */}
                    {/* <Header_Logo /> */}

                    <div className="">
                        <SaleOff />
                        <div className="filter-wrapper trans-center container ">
                            <Filter />
                        </div>
                    </div>

                    <Row className="container">

                      
                        {/* <Col span={24} >
                            <Banner />
                        </Col> */}

                        {/* flash sale */}
                        <Col span={24} className="m-b-32 hp-01">
                            <FlashSale />
                        </Col>

                        {/* thương hiệu nổi bật */}
                        <Col span={24} className="m-b-32 hp-01">
                            <Brand />
                        </Col>

                        {/* Doanh muc Laptop */}
                        <Col span={24} className="m-b-32 hp-01">
                            <Laptop />
                        </Col>

                        {/* Doanh muc Man hinh */}
                        <Col span={24} className="m-b-32 hp-01">
                            <ManHinh />
                        </Col>

                        {/* Doanh muc Gear */}
                        <Col span={24} className="m-b-32 hp-01">
                            <Gear />
                        </Col>

                        {/* <All_Products /> */}
                        <Col span={24} className="m-b-32 hp-01 hp-02">
                            <AllProduct />
                        </Col>
                    </Row>
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
