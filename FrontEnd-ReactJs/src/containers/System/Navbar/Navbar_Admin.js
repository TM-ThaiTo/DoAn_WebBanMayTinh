import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { ADMIN } from '../../../config/Data_route.js';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";


import './Navbar_Admin.scss';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: false,
        };
    }

    showSidebar = () => {
        this.setState(prevState => ({
            sidebar: !prevState.sidebar,
        }));
    };

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <>
                <IconContext.Provider value={{ color: '#fff' }}>
                    {/*header-admin */}
                    <div className='navbar'>
                        <div className='navbar-left'>
                            <Link to='#' className='menu-bars'>
                                <i className="fas fa-bars" onClick={this.showSidebar}></i>
                            </Link>
                        </div>

                        <div className='languages'>
                            {/* welcome */}
                            <span className='welcome'>
                                <FormattedMessage id="home-header.welcome" />
                            </span>
                            {/* language */}
                            <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                                onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                            >VN</span>
                            <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                                onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                            >EN</span>
                            {/* nút logout */}
                            <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        </div>
                    </div>

                    {/* navbar-admin */}
                    <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items'>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars' onClick={this.showSidebar}>
                                    <i className="fas fa-arrow-left"></i>
                                    <a>Menu</a>
                                </Link>
                            </li>
                            {ADMIN.map((item, index) => (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} onClick={this.showSidebar}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </IconContext.Provider>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        //userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
