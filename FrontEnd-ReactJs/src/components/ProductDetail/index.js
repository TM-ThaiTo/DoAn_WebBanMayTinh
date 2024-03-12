import React, { Component } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import ProductPolicy from './Policy/index.js';
import ProductOverview from './Overview/index.js'
import Description from './Description/index.js';
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
                            <HomeOutlined className="p-12 icon-home font-size-16px bg-white" />
                        </Link>
                        <span className="r-arrow p-lr-8 font-weight-500">{`>`}</span>
                        <span className="pro-name p-8 font-weight-500 bg-white">{name}</span>
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
