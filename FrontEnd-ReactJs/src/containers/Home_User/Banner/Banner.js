import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Banner.scss';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';


import logo from '../../../assets/logo-banner/banner.jpg';
import logo1 from '../../../assets/logo-banner/banner1.png';
import logo2 from '../../../assets/logo-banner/Banner1.webp';
class Banner extends Component {

    // chuyển ngôn ngữ
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        let language = this.props.language;
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <React.Fragment>
                <div className="banner">
                    <div className="container banner-container">
                        <div className="row banner-content">

                            <div className="col-2 content-left">
                                <nav className="vertical-navbar">
                                    <div className="items">Laptop & Macbook</div>
                                    <div className="items">Màn hình</div>
                                    <div className="items">Ổ cứng</div>
                                    <div className="items">Ram</div>
                                    <div className="items">Card màn hình</div>
                                    <div className="items">Chuột</div>
                                    <div className="items">Bàn phím</div>
                                    <div className="items">Bo mạch chủ</div>
                                </nav>
                            </div>

                            <div className="col-10 content-right">
                                <div className="col-12 bn-image">
                                    <Slider {...settings}>
                                        <div className="bn-image">
                                            <img src={logo} />
                                        </div>
                                        <div>
                                            <img src={logo1} />
                                        </div>
                                        <div>
                                            <img src={logo1} />
                                        </div>
                                        <div>
                                            <img src={logo1} />
                                        </div>
                                        <div>
                                            <img src={logo1} />
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </React.Fragment>
        );
    }
}

// map redux đến react
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);

