import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { LANGUAGES } from '../../../utils';
// import { changeLanguageApp } from '../../../store/actions';

// scss
import './AllProduct.scss'
class AllProduct extends Component {

    // // chuyển ngôn ngữ
    // changeLanguage = (language) => {
    //     this.props.changeLanguageAppRedux(language);
    // }

    render() {
        // let language = this.props.language;
        return (
            <>
                Đây là trang all product
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProduct);

