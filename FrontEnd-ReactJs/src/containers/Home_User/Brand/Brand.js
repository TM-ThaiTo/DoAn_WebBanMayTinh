import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { Col, Row } from 'antd';
// scss
import './Brand.scss'


// danh sách thương hiệu
const list = [
    {
        link: 'https://vn.msi.com/',
        src:
            'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710038929/Image/Brand/MSI.webp',
        title: 'MSI',
        desc: 'MSI Gaming: Power for Gamers',
    },
    {
        link: 'https://www.apple.com/',
        src:
            'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710038389/Image/faftdahg9vj5xq9nrk8u.jpg',
        title: 'Apple',
        desc: 'Think Different',
    },
    {
        link: 'https://www.lenovo.com/vn/vn/',
        src:
            'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710038963/Image/Brand/Lenovo.webp',
        title: 'LENOVO',
        desc: 'Different Plays Better',
    },
    {
        link: 'https://www.asus.com/vn/',
        src:
            'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710038979/Image/Brand/Asus.webp',
        title: 'ASUS',
        desc: 'The Best or Nothing',
    },
];

class Brand extends Component {

    // fn: hiển thị danh sách thương hiệu
    showBrandList(list) {
        return list.map((item, index) => (
            <Col span={12} md={6} key={index}>
                <div className="brand-item t-center">
                    <a href={item.link} target="blank">
                        <img className="img" width="100%" src={item.src} alt="Photo" />
                    </a>
                    <h4 className="font-size-18px">{item.title}</h4>
                    <span className="font-size-16px">{item.desc}</span>
                </div>
            </Col>
        ));
    }


    // chuyển ngôn ngữ
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {

        return (
            <div className="p-16 Famous-Brand">
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <h2 className="font-weight-700">Thương hiệu nổi bật</h2>
                        <div className="underline-title"></div>
                    </Col>
                    {this.showBrandList(list)}
                </Row>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Brand);

