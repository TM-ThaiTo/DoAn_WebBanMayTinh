import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './All_Products.scss';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import Product from '../../../components/Product/ProductCard/Product_front_one.js'

// scss
import './All_Products.scss'
class All_Products extends Component {

    // chuyển ngôn ngữ
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='container allproduct'>
                    <div className="row title-allproduct">
                        <div className='col-10'>
                            <span className='name'>
                                Sản phẩm cho bạn
                            </span>
                        </div>
                        <div className='col-2'>
                            <a className='xemthem' href='/all_product'>Xem thêm</a>
                        </div>
                    </div>

                    <div className='row product-allproduct'>
                        <div className="detail-allproduct">
                            <div className='css-1'>
                                <div type='gird' className='css-13'>
                                    <Product />
                                </div>
                                <div type='gird' className='css-13'>
                                    <Product />
                                </div>
                                <div type='gird' className='css-13'>
                                    <Product />
                                </div>
                                <div type='gird' className='css-13'>
                                    <Product />
                                </div>
                                <div type='gird' className='css-13'>
                                    <Product />
                                </div>
                            </div>
                            <div className='css-1'>
                                <div type='gird' className='css-13'>
                                    <Product />
                                </div>
                                <div type='gird' className='css-13'>
                                    <Product />
                                </div>
                                <div type='gird' className='css-13'>
                                    <Product />
                                </div>
                                <div type='gird' className='css-13'>
                                    <Product />
                                </div>
                                <div type='gird' className='css-13'>
                                    <Product />
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

export default connect(mapStateToProps, mapDispatchToProps)(All_Products);

