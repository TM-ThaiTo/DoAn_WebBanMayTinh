import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils/index.js';
import { changeLanguageApp } from '../../../../store/actions/index.js';
import CustomScrollbars from '../../../../components/CustomScrollbars.js';
import './Header_Logo.scss';

class Header_Logo extends Component {

    // chuyển ngôn ngữ
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        let language = this.props.language;

        // Sử dụng biến đã được gán giá trị từ FormattedMessage
        let search_text = this.props.intl.formatMessage({ id: 'home-header.search' });

        return (
            <React.Fragment>
                <div className='logo-search-cart'>
                    <div className="container logo-container">
                        <div className="row logo-content">
                            <div className="col-1 left-logo ">
                                <div className='icon-logo'>
                                    <a href='http://localhost:4000/home'>
                                        <i className="fas fa-home"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="col-10 center-search">
                                <div className='search'>
                                    <div className='input-search'>
                                        <input type='text' placeholder={search_text} />
                                    </div>
                                    <button>
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-1 right-cart">
                                <div className='icon-shopping-cart'>
                                    <i className="fas fa-shopping-cart"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}



// Kết hợp injectIntl và connect
const ConnectedHeaderLogo = connect(
    state => ({
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    }),
    dispatch => ({
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    })
)(injectIntl(Header_Logo));

export default ConnectedHeaderLogo;
