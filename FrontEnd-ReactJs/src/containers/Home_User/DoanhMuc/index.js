import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/index.js'
// import { changeLanguageApp } from '../../../store/actions';


// scss
import '../FlashSale/FlashSale.scss'
import Laptop from './Laptop/index.js';
import Gear from './Gear/index.js';
import ManHinh from './ManHinh/index.js';
class DoanhMuc extends Component {

    // chuyển ngôn ngữ
    // changeLanguage = (language) => {
    //     this.props.changeLanguageAppRedux(language);
    // }

    render() {
        // let language = this.props.language;
        return (
            <React.Fragment>
                <Laptop />
                {/* <Gear /> */}
                {/* <ManHinh /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoanhMuc);

