import React, { Component } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import ProductPolicy from './Policy/index.js';
import ProductOverview from './Overview/index.js'
import Description from './Description/index.js';

import './index.scss';
class ProductDetail extends Component {


    render() {
        const { dataProduct } = this.props;
        const { product, desc, detail } = dataProduct;
        console.log("check product props: ", product, detail, desc);

        const { name, brand, type, _id, rate, otherInfo } = product;


        return (
            <div className="Product-Detail-View container m-t-20">
                <Row gutter={[16, 32]}>
                    {/* Hiển thị đường dẫn trang */}
                    <Col span={24} className="d-flex page-position">
                        <Link to="/">
                            <HomeOutlined className="p-12 icon-home font-size-16px bg-white font" />
                        </Link>
                        <span className="r-arrow p-lr-8 font-weight-500 font">{`>`}</span>
                        <span className="pro-name p-8 font-weight-500 bg-white font">{name}</span>
                    </Col>

                    {/* Thông tin cơ bản của sản phẩm */}
                    <Col span={24} md={18}>
                        <ProductOverview dataProduct={dataProduct} />
                    </Col>

                    {/* Chính sách */}
                    <Col span={24} md={6}>
                        <ProductPolicy />
                    </Col>

                    {/* Mô tả chi tiết sản phẩm */}
                    <Col span={24}>
                        <Description
                            detail={dataProduct.detail}
                            desc={dataProduct.desc}
                        />
                    </Col>

                    {/* Nhận xét của khách hàng */}
                    {/* <Col span={24} id="evaluation">
                    <Evaluation rates={rate} productId={_id} />
                    </Col> */}

                    {/* danh sách sản phẩm tương tự */}
                    {/* <Col span={24}>
                    <RelatedProduct
                        title="Sản phẩm tương tự"
                        type={type}
                        brand={brand}
                        id={_id}
                    />
                    </Col> */}

                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetail));
