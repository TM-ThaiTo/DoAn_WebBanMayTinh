import React, { Component } from 'react';
import { Button, Col, Image, InputNumber, message, Rate, Row } from 'antd';
import { CheckOutlined, PhoneOutlined } from '@ant-design/icons';
import ImgLoadFailed from '../../../assets/imgs/loading-img-failed.png';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { useSelector } from 'react-redux';
// import cartActions from 'reducers/carts';

import './index.scss';


class ProductOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numOfProduct: 1,
            avtIndex: 0,
        };

        // this.dispatch = useDispatch();
    }

    // Hàm đếm số sản phẩm đó trong giỏ hàng
    countItemInCart = (productCode, carts) => {
        let count = 0;
        if (carts) {
            carts.forEach((item) => {
                if (item.code === productCode) count += item.amount;
            });
        }
        return count;
    };

    // fn: hiên thị danh sách hình ảnh sp
    showCatalogs = (catalog) => {
        return catalog.map((item, index) => (
            <Image
                key={index}
                src={item}
                width={48}
                className={`catalog-item p-8 ${index === this.state.avtIndex ? 'active' : ''}`}
                onMouseEnter={() => this.setAvtIndex(index)}
            />
        ));
    };

    // fn: hiển thị vài thông tin cơ bản của sản phẩm
    showOverviewInfo = (product) => {
        // let result = [];
        // let i = 0;
        // for (let key in product) {
        //     if (i >= 5) break;
        //     if (typeof product[key] === 'string') {
        //         result.push(
        //             <p key={i++} className="m-b-8">
        //                 {`- ${helpers.convertProductKey(key)}: ${product[key]}`}
        //             </p>,
        //         );
        //     }
        // }
        // return result;
    };

    // fn: Thêm vào giỏ hàng
    addCart = () => {
        const { code, name, price, _id } = this.props.products.product;
        const { discount, stock } = this.props.products.productDetail;
        const { numOfProduct } = this.state;

        let product = {
            code,
            name,
            price,
            amount: numOfProduct,
            avt: this.props.products.product.avt,
            discount,
            stock,
            _id,
        };

        this.setState({ numOfProduct: 1 });
        // this.dispatch(cartActions.addToCart(product));
        message.success('Thêm vào giỏ hàng thành công');
    };

    // fn: Set index của hình ảnh được chọn
    setAvtIndex = (index) => {
        this.setState({ avtIndex: index });
    };


    // hàm đổi chiều dài ngôn ngữ sau này gộp 
    // fn: hàm rút gọn tên sản phẩm
    reduceProductName = (name, length = 64) => {
        let result = name;
        if (name && name.length >= length) {
            result = name.slice(0, length) + ' ...';
        }
        return result;
    };

    // fn: tính tỉ lệ sao của sản phẩm [1,2,3,4,5]
    calStar = (rates) => {
        const total = rates.reduce((a, b) => a + b, 0);
        if (total === 0) return 0;
        let rateTotal = 0;
        for (let i = 0; i < 5; ++i) {
            rateTotal += rates[i] * (i + 1);
        }
        return rateTotal / total;
    };

    // fn: hàm format giá sản phẩm
    formatProductPrice = (price) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    render() {
        const { dataProduct } = this.props;
        const { avtIndex, numOfProduct } = this.state;
        const {
            _id,
            avt,
            name,
            brand,
            code,
            price,
            rate,
            discount,
            stock,
        } = dataProduct.product;

        const { catalogs, ...productRest } = dataProduct.detail;
        const imgList = [avt, ...catalogs];
        // const rateTotal = rate.reduce((a, b) => a + b, 0);
        const priceBefore = price + (price * discount) / 100;

        // const rateAvg = helpers.calStar(rate);

        // const carts = useSelector((state) => state.carts);
        // const currentStock = stock - this.countItemInCart(code, carts);

        return (
            <Row
                // className="Product-Overview bg-white p-16"
                className="Product-Overview"
            >
                {/* Hình ảnh và thông số cơ bản sản phẩm */}
                <Col span={24} md={8}>
                    <div
                        style={{ height: 200, width: 300 }}
                        className='img-avt d-flex align-i-center justify-content-center'>
                        <Image
                            style={{ height: 150, width: 150 }}
                            fallback={ImgLoadFailed}
                            src={imgList[avtIndex]}
                        />
                    </div>

                    <div
                        className="d-flex w-100 bg-white p-b-16 p-t-8"
                    // className="img-list"
                    >
                        {this.showCatalogs(imgList)}
                    </div>
                    <div className="p-l-16 p-t-16 product-info">
                        {this.showOverviewInfo(productRest)}
                    </div>
                </Col>

                {/* Tên và thông tin cơ bản */}
                <Col span={24} md={16} className="p-l-16">
                    {/* Tên sp */}
                    <h2 className="font-size-24px ">
                        {() => this.reduceProductName(name, 140)}
                    </h2>

                    {/* Đánh giá sản phẩm */}
                    <div className="p-tb-8">
                        <Rate disabled defaultValue={this.rateAvg} allowHalf />
                        <a href="#evaluation" className="m-l-8">
                            (Có {this.rateTotal} đánh giá)
                        </a>
                    </div>

                    {/* Mã, thương hiệu */}
                    <div
                        className="font-size-16px font-weight-400"
                        style={{ color: '#aaa' }}>
                        Thương hiệu:
                        <span className="product-brand font-weight-500">&nbsp;{brand}</span>
                        &nbsp; | &nbsp;<span>{code}</span>
                    </div>

                    {/* Giá */}
                    <h1 className="product-price font-weight-700 p-tb-8">
                        {price === 0 ? 'Liên hệ' : this.formatProductPrice(priceBefore)}
                    </h1>
                    {discount > 0 && price > 0 && (
                        <>
                            <h3 className="font-weight-700" style={{ color: '#333' }}>
                                Bạn có 1 mã giảm giá {discount}% cho sản phẩm này
                            </h3>
                            <div className="d-flex flex-direction-column m-t-8 m-b-16 p-tb-8 p-lr-16 discount">
                                <span className="discount-price font-size-16px font-weight-700">
                                    Giá: {this.formatProductPrice(price)}
                                </span>
                                <span>
                                    Đã giảm thêm: {this.formatProductPrice(priceBefore - price)}
                                    &nbsp;
                                    <span className="discount-decr"></span>
                                </span>
                                <div className="discount-mark"></div>
                                <CheckOutlined className="discount-mark-icon" />
                            </div>
                        </>
                    )}

                    {/* Chọn số lượng */}
                    {/* <div className="p-t-12 option">
                        {currentStock === 0 ? (
                            <h3 className="m-r-8 m-t-8 font-size-18px" style={{ color: 'red' }}>
                                <i>Sản phẩm hiện đang hết hàng !</i>
                            </h3>
                        ) : (
                            <>
                                <h3 className="m-r-8 m-t-8 font-size-16px">Chọn số lượng: </h3>
                                <InputNumber
                                    name="numOfProduct"
                                    size="middle"
                                    value={numOfProduct}
                                    min={1}
                                    max={currentStock}
                                    onChange={(value) => this.setNumberOfProduct(value)}
                                />
                            </>
                        )}
                    </div> */}

                    {/* Button*/}
                    {/* {price > 0 && currentStock > 0 ? (
                        <div className="btn-group p-tb-16 d-flex justify-content-around">
                            <Button
                                onClick={addCart}
                                disabled={stock ? false : true}
                                size="large"
                                className="m-r-16 w-100 btn-group-item"
                                style={{ backgroundColor: '#3555c5' }}>
                                THÊM GIỎ HÀNG
                            </Button>

                            <Button
                                onClick={addCart}
                                disabled={stock ? false : true}
                                size="large"
                                className="w-100 btn-group-item"
                                style={{ backgroundColor: '#39B3D7' }}>
                                <Link to={constants.ROUTES.PAYMENT}> MUA NGAY LUÔN</Link>
                            </Button>
                        </div>
                    ) : (
                        <Button
                            size="large"
                            className="m-tb-16 w-100 btn-group-item"
                            style={{ backgroundColor: '#3555c5' }}>
                            <a href="https://fb.com/TuanNguyen250400" target="blank">
                                <PhoneOutlined style={{ fontSize: 18 }} className="m-r-8" /> LIÊN
                                HỆ
                            </a>
                        </Button>
                    )} */}
                </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductOverview));
