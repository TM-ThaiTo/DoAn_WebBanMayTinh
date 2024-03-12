import { Col, Pagination, Row, Spin } from 'antd';
// import productApi from 'apis/productApi';
import ProductView from '../../../components/ProductView';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAPIProductList } from '../../../services/adminService';

import "./index.scss";

// const mockProducts = [
//     {
//         _id: '1',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1 sdasdsdsa',
//         price: 200000,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '2',
//         avt: 'https://example.com/product2.jpg',
//         name: 'Product 2',
//         price: 75,
//         discount: 15,
//         stock: 5,
//     },
//     {
//         _id: '3',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '4',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 2,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
//     {
//         _id: '5',
//         avt: 'https://res.cloudinary.com/duvnxrvqr/image/upload/v1709965609/products/R-001/pceor7catdbsi0htuvav.jpg',
//         name: 'Product 1',
//         price: 50,
//         discount: 10,
//         stock: 10,
//     },
// ];
class AllProduct extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     list: mockProducts,
        //     currentPage: 1,
        //     productsPerPage: 16,
        //     total: mockProducts.length,
        //     isLoading: false,
        // };
        this.state = {
            list: [],
            currentPage: 1,
            productsPerPage: 16,
            total: 0,
            isLoading: true,
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
        try {
            //   this.cancelToken = productApi.CancelToken.source();
            //   const response = await productApi.getAllProducts(
            //     this.state.page,
            //     24,
            //     this.cancelToken.token
            //   );

            const response = await getAPIProductList();
            if (response) {
                const data = response.data;
                this.setState({
                    list: data,
                    // total: count,
                    isLoading: false,
                });
            }
        } catch (error) {
            // if (!productApi.isCancel(error)) {
            //     // Handle non-cancel errors
            //     this.setState({ isLoading: false });
            // }

            console.log("Lỗi: ", error);
        }
    };

    showProducts = (list) => {
        list = list ? list : [];
        const { currentPage, productsPerPage } = this.state;
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = list.slice(indexOfFirstProduct, indexOfLastProduct);

        return currentProducts.map((product, index) => {
            const { avt, name, price, discount, stock, id_product } = product;
            return (
                <Col key={index} span={24} sm={12} lg={8} xl={6}>
                    <Link to={`/product/${id_product}`}>
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

    render() {
        const { list, isLoading, currentPage, productsPerPage, total } = this.state;
        const totalPages = Math.ceil(total / productsPerPage);

        return (
            <Row className="p-16" style={{ minHeight: 400 }} gutter={[16, 16]}>
                <Col span={24}>
                    <h2 className="font-weight-700">Tất cả sản phẩm</h2>
                    <div className="underline-title"></div>
                </Col>

                <>
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
                </>
            </Row>
        );
    }
}

export default AllProduct;
