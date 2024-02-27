import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils'
// import { changeLanguageApp } from '../../../store/actions';


// scss
import '../../FlashSale/FlashSale.scss'

// giao diện trong components
import Product from "../../../../components/Product/ProductCard/Product_front_one";

class ManHinh extends Component {

    // chuyển ngôn ngữ
    // changeLanguage = (language) => {
    //     this.props.changeLanguageAppRedux(language);
    // }

    render() {
        // let language = this.props.language;
        return (
            <React.Fragment>
                <div className="container flash-sale">

                    <div className="title-flash-sale">
                        <div className="row title-content">

                            <div className="col-10 logo-timeout">
                                <div className="col-6 time-out">
                                    ManHinh
                                </div>
                            </div>
                            <div className="col-2 xemthem">
                                {/* <button className="btn-xemthem">Xem thêm</button> */}
                                <a href="/all_flashsale"> Xem tất cả </a>
                            </div>

                        </div>
                    </div>

                    <div className="container product-flash-sale">
                        <div className="row detail-poduct-flash-sale">
                            <div className="card-product-flashsale">
                                <div className='css-1'>
                                    <div type='gird' className="css-13">
                                        <Product />
                                    </div>
                                    <div type='gird' className="css-13">
                                        <Product />
                                    </div>
                                    <div type='gird' className="css-13">
                                        <Product />
                                    </div>
                                    <div type='gird' className="css-13">
                                        <Product />
                                    </div>
                                    <div type='gird' className="css-13">
                                        <Product />
                                    </div>
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
        // isLoggedIn: state.user.isLoggedIn,
        // language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManHinh);

