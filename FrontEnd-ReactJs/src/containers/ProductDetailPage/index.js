import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProductById } from '../../services/productService.js';
import ProductDetail from '../../components/ProductDetail';
import GlobalLoading from '../../components/Loading/Global/index.js';

class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            isNotFoundProduct: false,
        };

        this.isComponentMounted = true;
    }

    componentDidMount() {
        this.getProduct();
    }

    componentWillUnmount() {
        this.isComponentMounted = false; // Fix the typo here
    }

    getProduct = async () => {
        const productId = this.props.match.params.productId;
        const res = await getProductById(productId);
        try {
            if (res && res.code === 0) {
                const data = res.data;
                this.setState({ product: data });
            }
        } catch (error) {
            if (this.isComponentMounted) {
                this.setState({ isNotFoundProduct: true });
            }
        }
    };

    render() {
        const { product, isNotFoundProduct } = this.state; // Destructure the state

        return (
            <>
                {product ? (
                    <ProductDetail dataProduct={product} />
                ) : (
                    <GlobalLoading content="Đang tải sản phẩm ..." />
                )}
                {isNotFoundProduct && <Redirect to="/not-found" />}
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetailPage));
