import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


import {
    AutoComplete,
    Badge,
    Button,
    Drawer,
    Dropdown,
    Input,
    Menu,
    message,
} from 'antd';

// import CartView from './CartView';
import './index.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// scss
// import './HeaderView.scss'
import logoUrl from '../../assets/imgs/logo.png';

class HeaderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkSearch: '',
            isMdDevice: false,
            drawerVisible: false,
            isSmDevice: false
        };
    }

    componentDidMount() {
        const w = window.innerWidth;
        if (w <= 992) this.setState({ isMdDevice: true });
        if (w <= 480) this.setState({ isSmDevice: true });

        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            if (width <= 992) {
                this.setState({ isMdDevice: true });
            } else {
                this.setState({ isMdDevice: false });
            }
            if (width <= 480) this.setState({ isSmDevice: true });
            else this.setState({ isSmDevice: false });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize');
    }

    render() {
        const { systemMenuPath, isLoggedIn } = this.props;

        const { isMdDevice, isSmDevice } = this.state;
        return (
            <div
                className="wrap-header container-fluid bg-white w-100vw"
                style={{ height: isSmDevice ? 76 : 104 }}
            >
                <div className="header container h-100 d-flex justify-content-between align-i-center">
                    {/* Logo */}
                    <Link to="/">
                        <img
                            src={logoUrl}
                            width={isSmDevice ? 78 : 112}
                            height={isSmDevice ? 36 : 48}
                        />
                    </Link>
                </div>

                {/* thanh tìm kiếm */}
                <div className="t-right search-bar-wrapper w-100">
                    <div className="search-bar pos-relative">
                        <AutoComplete
                            className="trans-center w-100"
                        //options={options}
                        // onChange={(value) =>
                        //     this.setState({ linkSearch: helpers.formatQueryString(value) })
                        // }
                        // filterOption={(inputValue, option) =>
                        //     option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                        //     -1
                        // }
                        >
                            <Input
                                maxLength={200}
                                size={isSmDevice ? 'middle' : 'large'}
                                placeholder={!isSmDevice ? 'Nhập từ khoá cần tìm' : 'Tìm kiếm'}
                            />
                        </AutoComplete>
                        <Button type="primary" size={isSmDevice ? 'middle' : 'large'}>
                            {/* <Link to={linkSearch === '' ? locations : '/search?keyword=' + linkSearch}>
                                <SearchOutlined /> {!isSmDevice ? 'Tìm kiếm' : ''}
                            </Link> */}
                        </Button>
                    </div>
                </div>


            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);
