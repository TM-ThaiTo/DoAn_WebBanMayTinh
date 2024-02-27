import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { LANGUAGES } from '../../../utils';
// import { changeLanguageApp } from '../../../store/actions';

// scss
// import './ALLFlashSale.scss'
class ALLFlashSale extends Component {

    // // chuyển ngôn ngữ
    // changeLanguage = (language) => {
    //     this.props.changeLanguageAppRedux(language);
    // }

    render() {
        // let language = this.props.language;
        return (
            <>
                Đây là trang all flash sale
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

export default connect(mapStateToProps, mapDispatchToProps)(ALLFlashSale);

