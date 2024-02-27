import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import { changeLanguageApp } from '../../../../store/actions';
import { HOMEPAGE } from '../../../../config/Data_route.js';

import './Header_HomePage_User.scss';

class Header_HomePage_User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            sidebar: false,

            user: "null",
        };
    }

    // chuyển ngôn ngữ
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    // sự kiện click để lấy đường dẫn
    handleChangeLink = (title) => {
        HOMEPAGE.forEach((item) => {
            if (item.title === title) {
                this.setState({ path: item.path });
            }
        });
    }

    showSidebar = () => {
        this.setState(prevState => ({
            sidebar: !prevState.sidebar,
        }));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        let userInfo = this.props.userInfo;
        if (prevProps.userInfo !== this.props.userInfo) {
            this.setState({
                user: userInfo,
            });
        }
    }


    render() {
        const { language, isLoggedIn, userInfo } = this.props;
        return (
            <React.Fragment>
                <div className='container-top'>
                    <div className='container home-header-container'>
                        <div className='row home-header-content'>
                            {/* Kênh bán hàng */}
                            <div className='col-6 left-content'>
                                {this.state.user === "ADMIN" && (
                                    <>
                                        <div
                                            className='col-3 saler basic'
                                            onClick={() => this.handleChangeLink("Seller Centre")}
                                        >
                                            <a href={this.state.path}>
                                                <FormattedMessage id="home-header.seller-centre" />
                                            </a>
                                        </div>
                                        <div className='separator'></div>
                                    </>
                                )}

                                {/* kết nối */}
                                <div
                                    className='col-3 connect basic'
                                    onClick={() => this.handleChangeLink("Connect")}
                                >
                                    <a href={this.state.path}>
                                        <FormattedMessage id="home-header.connect" />
                                    </a>
                                </div>
                            </div>

                            <div className=' right-content'>
                                {/* Hổ trợ */}
                                <div className='col-3 support basic'>
                                    <i className="fas fa-question-circle"></i>
                                    <FormattedMessage id="home-header.support" />
                                </div>
                                {/* language */}
                                <div className='separator'></div>
                                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>

                                {/* login - signup */}
                                {
                                    this.state.user === "null" && (
                                        <>
                                            <div className='separator'></div>
                                            <div
                                                className=' login basic'
                                                onClick={() => this.handleChangeLink("login")}
                                            >
                                                <a href={this.state.path}>
                                                    <FormattedMessage id="home-header.login" />
                                                </a>
                                            </div>
                                            <div className='separator'></div>
                                            <div
                                                className=' signup basic'
                                                onClick={() => this.handleChangeLink("signup")}
                                            >
                                                <a href={this.state.path}>
                                                    <FormattedMessage id="home-header.signup" />
                                                </a>
                                            </div>
                                        </>
                                    )
                                }
                                {/* Wellcome */}
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
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header_HomePage_User);
