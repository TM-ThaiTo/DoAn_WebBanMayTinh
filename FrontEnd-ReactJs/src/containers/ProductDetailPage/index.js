import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import giao diện
import ProductDetail from '../../components/ProductDetail';


class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            isNotFoundProduct: false,
        };
    }

    componentDidMount() {
        this.getProduct();
    }

    componentWillUnmount() {
        this.isSubscribe = false;
    }

    getProduct = async () => {
        this.isSubscribe = true;
        const productId = this.props.match.params.productId;
        console.log("Check id: ", productId);

        // try {
        //   const res = await productApi.getProduct(productId);
        //   if (res && res.code === 0) {
        //     const { data } = result;
        //     this.setState({ product: data });
        //   }
        // } catch (error) {
        //   if (this.isSubscribe) this.setState({ isNotFoundProduct: true });
        // }
    };

    render() {
        return (
            //         <>
            //   {product ? (
            //     <ProductDetail products={product} />
            //   ) : (
            //     <GlobalLoading content="Đang tải sản phẩm ..." />
            //   )}
            //   {isNotFoundProduct && <Redirect to="/not-found" />}
            // </>
            <ProductDetail />
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

// Connect withRouter to get match props
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetailPage));
