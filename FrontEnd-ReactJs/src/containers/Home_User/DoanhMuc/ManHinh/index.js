import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils'

import { Col, Pagination, Row, Spin } from 'antd';
import { Link } from 'react-router-dom';
// import { changeLanguageApp } from '../../../store/actions';


// scss
import '../../FlashSale/FlashSale.scss'

// giao diện trong components
import ProductView from "../../../../components/ProductView";

const mockProducts = [
    {
        _id: '1',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1 sdasdsdsa',
        price: 200000,
        discount: 10,
        stock: 10,
    },
    {
        _id: '2',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 2',
        price: 75,
        discount: 15,
        stock: 5,
    },
    {
        _id: '3',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '4',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 2,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
    {
        _id: '5',
        avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1710045174/Image/ManHinh.webp',
        name: 'Product 1',
        price: 50,
        discount: 10,
        stock: 10,
    },
];

class ManHinh extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: mockProducts,
            currentPage: 1,
            productsPerPage: 4,
            total: mockProducts.length,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.getAllProducts();
    }

    componentWillUnmount() {
        // Cancel any ongoing async operations when the component is unmounted
        if (this.cancelToken) {
            this.cancelToken.cancel('Component unmounted');
        }
    }

    getAllProducts = async () => {
        // try {
        //   this.cancelToken = productApi.CancelToken.source();
        //   const response = await productApi.getAllProducts(
        //     this.state.page,
        //     24,
        //     this.cancelToken.token
        //   );

        //   if (response) {
        //     const { data, count } = response.data;
        //     this.setState({
        //       list: data,
        //       total: count,
        //       isLoading: false,
        //     });
        //   }
        // } catch (error) {
        //   if (!productApi.isCancel(error)) {
        //     // Handle non-cancel errors
        //     this.setState({ isLoading: false });
        //   }
        // }
    };

    showProducts = (list) => {
        list = list ? list : [];
        const { currentPage, productsPerPage } = this.state;
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = list.slice(indexOfFirstProduct, indexOfLastProduct);
        return currentProducts.map((product, index) => {
            const { avt, name, price, discount, stock, _id } = product;
            return (
                <Col key={index} span={24} sm={12} lg={8} xl={6}>
                    <Link to={`/product/${_id}`}>
                        <ProductView
                            className="m-auto"
                            name={name}
                            price={price}
                            stock={stock}
                            avtUrl={avt}
                            discount={discount}
                            height={400}
                        />
                    </Link>
                </Col>
            );
        });
    };

    handlePageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    };

    // chuyển ngôn ngữ
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { list, isLoading, currentPage, productsPerPage, total } = this.state;
        const totalPages = Math.ceil(total / productsPerPage);

        return (
            <Row className="p-16" style={{ minHeight: 400 }} gutter={[16, 16]}>
                <Col span={24}>
                    <h2 className="font-weight-700">Doanh mục ManHinh</h2>
                    <div className="underline-title"></div>
                </Col>
                {this.showProducts(list)}
                <Col className="item" span={24}>
                    <Pagination
                        className="nut"
                        current={currentPage}
                        pageSize={productsPerPage}
                        total={total}
                        onChange={this.handlePageChange}
                        showSizeChanger={false}
                    />
                </Col>
            </Row>
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

