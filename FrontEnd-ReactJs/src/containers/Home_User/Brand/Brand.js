import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import Product from '../../../components/Product/ProductCard/Product_front_one.js'

// scss
import './Brand.scss'
class Brand extends Component {

    // chuyển ngôn ngữ
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='container brand'>

                    <div className='row title-brand'>
                        Thương hiệu nổi bật
                    </div>

                    <div className='items-brand'>
                        <div className='apple'>
                            <a href='https://www.apple.com/' target='black'>
                                <div className='image-Apple img-design'></div>
                            </a>
                            <div className='name-slogan'>
                                <span >Apple</span>
                            </div>
                            <div>
                                <span>"Think Different"</span>
                                {/* <span> (Suy nghĩ Khác Biệt)</span> */}
                            </div>
                        </div>

                        <div className='msi'>
                            <a href='https://vn.msi.com/' target='black'>
                                <div className='image-MSI img-design'></div>
                            </a>
                            <div className='name-slogan'>
                                <span >MSI</span>
                            </div>
                            <div>
                                <span>MSI Gaming: Power for Gamers</span>
                            </div>
                        </div>

                        <div className='lenovo'>
                            <a href='https://www.lenovo.com/vn/vn/' target='black'>
                                <div className='image-LENOVO img-design'></div>
                            </a>
                            <div className='name-slogan'>
                                <span >LENOVO</span>
                            </div>
                            <div>
                                <span>"Different Plays Better"</span>
                                {/* <span>(Chơi Tốt Hơn khi Khác Biệt)</span> */}
                            </div>

                        </div>
                        <div className='asus'>
                            <a href='https://www.asus.com/vn/' target='black'>
                                <div className='image-ASUS img-design'></div>
                            </a>
                            <div className='name-slogan'>
                                <span >ASUS</span>
                            </div>
                            <div>
                                <span>"The Best or Nothing"</span>
                                {/* <span>(Chỉ Có Tốt Nhất hoặc Không Có Gì)</span> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Brand);

