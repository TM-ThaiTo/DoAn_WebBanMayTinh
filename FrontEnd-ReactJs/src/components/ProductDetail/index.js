import React, { Component } from 'react';

import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductDetail extends Component {

    render() {
        return (
            <div className="Product-Detail-View container m-t-20">
                <Row gutter={[16, 32]}>
                    {/* Hiển thị đường dẫn trang */}
                    <Col span={24} className="d-flex page-position">
                        <Link to="/">
                            {/* <HomeOutlined className="p-12 icon-home font-size-16px bg-white" /> */}
                        </Link>
                        <span className="r-arrow p-lr-8 font-weight-500">{`>`}</span>
                        <span className="pro-name p-8 font-weight-500 bg-white">Test</span>
                    </Col>

                    {/* Thông tin cơ bản của sản phẩm */}
                    {/* <Col span={24} md={18}>
                        <ProductOverview products={products} />
                    </Col>
                     */}
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
