import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { connect } from 'react-redux';
import './Product_front_one.scss';
// import { LANGUAGES } from '../../../utils';
// import { changeLanguageApp } from '../../../store/actions';

class Product_front_one extends Component {

    render() {
        // let language = this.props.language;
        return (
            // <Card
            //     className='card-product'
            //     bodyStyle={{ padding: "0" }}

            // >
            <div className='card-product'>
                <div className="SP-container">
                    <div className="SP-content">
                        {/* ảnh */}
                        <Link to="/product">
                            <div className="SP-image">
                            </div>
                        </Link>
                        {/* detail */}
                        <div className='SP-thongtin'>
                            <div className="SP-name ">
                                <span className='name none-a'>
                                    <Link to="/product">
                                        Laptop gaming ASUS TUF Gaming A15 FA507NU LP034W
                                    </Link>
                                </span>
                            </div>

                            <div className='SP-detail'>
                                <div className='proloop-technical'>
                                    <div className='proloop-technical--line'>
                                        <span>
                                            <i class="fas fa-microchip"></i>
                                            i7-12345H
                                        </span>
                                    </div>
                                    <div className="proloop-technical--line">
                                        <span>RTX-2060</span>
                                    </div>
                                    <div className="proloop-technical--line">
                                        <span>
                                            <i class="fas fa-memory"></i>
                                            16 GB
                                        </span>
                                    </div>
                                    <div className="proloop-technical--line">
                                        <span>
                                            <i class="far fa-hdd"></i>
                                            512 GB
                                        </span>
                                    </div>
                                    <div className="proloop-technical--line">
                                        <span>
                                            <i class="fas fa-desktop"></i>
                                            123455
                                        </span>
                                    </div>
                                    <div className="proloop-technical--line">
                                        <span>144 Hz</span>
                                    </div>
                                </div>
                            </div>


                            <div className="SP-price">
                                <span className='SP-pice-number'> 149.990.000₫</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            // </Card>
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
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product_front_one);

