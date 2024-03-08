import React, { Component } from 'react';
import {
    ExclamationCircleOutlined,
    InfoCircleOutlined,
    MinusCircleOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Row,
    Select,
    Space,
    Tooltip,
    Upload,
} from 'antd';
import { connect } from 'react-redux';
import Compressor from 'compressorjs';

// các component
import Disk from './Disk/index.js';
import Display from './Display/index.js';
import Headphone from './Headphone/index.js';
import Keyboard from './Keyboard/index.js';
import Laptop from './Laptop/index.js';
import MainBoard from './Mainboard/index.js';
import Monitor from './Monitor/index.js';
import Mouse from './Mouse/index.js';
import ProductDetail from './ProductDetailModal/index.js';
import Ram from './Ram/index.js';
import Router from './Router/index.js';
import Speaker from './Speaker/index.js';

class ProductAddForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,
            isTypeSelected: false,
            typeSelected: -1,
            productDecs: null,
            avtFileList: [],
            avatar: null,
            fileList: [],
            fileCompressedList: [],
        };

        this.formRef = React.createRef();

        this.PRODUCT_TYPES = [
            { type: 0, label: 'Laptop' },
            { type: 1, label: 'Ổ cứng' },
            { type: 2, label: 'Card màn hình' },
            { type: 3, label: 'Main board' },
            { type: 4, label: 'RAM' },
            { type: 5, label: 'Điện thoại' },
            { type: 6, label: 'Sạc dự phòng' },
            { type: 7, label: 'Tai nghe' },
            { type: 8, label: 'Bàn phím' },
            { type: 9, label: 'Màn hình' },
            { type: 10, label: 'Chuột' },
            { type: 11, label: 'Router Wifi' },
            { type: 12, label: 'Loa' },
            { type: 13, label: 'Máy ảnh' },
            { type: 14, label: 'Webcam' },
        ];
    };

    onRenderProduct = (value) => {
        switch (value) {
            case 0:
                return <Laptop />;
            case 1:
                return <Disk />;
            case 2:
                return <Display />;
            case 3:
                return <MainBoard />;
            case 4:
                return <Ram />;
            case 5:
                //   return <Mobile />;
                return;
            case 6:
                //   return <BackupCharger />;
                return
            case 7:
                return <Headphone />;
            case 8:
                return <Keyboard />;
            case 9:
                return <Monitor />;
            case 10:
                return <Mouse />;
            case 11:
                return <Router />;
            case 12:
                return <Speaker />;
            case 13:
                //   return <Camera />;
                return
            case 14:
                //   return <Webcam />;
                return;
            default:
                break;
        }
    };

    // render file
    onCompressFile = async (file, type = 0) => {
        new Compressor(file, {
            // quality: constants.COMPRESSION_RADIO,
            // convertSize: constants.COMPRESSION_RADIO_PNG,
            quality: 0.6,
            convertSize: 2000000,
            success: (fileCompressed) => {
                const reader = new FileReader();
                reader.readAsDataURL(fileCompressed);
                reader.onloadend = async () => {
                    if (type === 0) this.setState({ avatar: reader.result });
                    else if (this.fileCompressedList.length < 10) {
                        this.fileCompressedList.push({
                            data: reader.result,
                            uid: file.uid,
                        });
                    }
                };
            },
            error: (err) => {
                message.error('Lỗi: ', err);
            },
        });
    };

    // chuyển dữ liệu 
    onProductTypeChange = (value) => {
        if (!this.state.isTypeSelected) this.setState({ isTypeSelected: true });
        this.setState({ typeSelected: value });
    };

    onGetDetailDesc = (data) => {
        this.setState({ productDecs: data });
    };

    onResetForm = () => {
        this.formRef.current.resetFields();
        this.fileCompressedList = [];
        this.setState({
            avtFileList: [],
            avatar: null,
            fileList: [],
        });
    };

    onValBeforeSubmit = async (data) => {
        try {
            if (!this.state.avatar) {
                message.error('Thêm avatar !', 2);
                return;
            }
            if (this.state.productDecs === null) {
                Modal.confirm({
                    title: 'Bạn có chắc muốn submit ?',
                    content: 'Chưa có BÀI VIẾT MÔ TẢ cho sản phẩm này !',
                    icon: <ExclamationCircleOutlined />,
                    okButtonProps: true,
                    onCancel: () => { },
                    onOk: () => {
                        this.onSubmit(data);
                    },
                });
            } else if (this.fileCompressedList.length === 0) {
                Modal.confirm({
                    title: 'Bạn có chắc muốn submit ?',
                    content: 'Chưa có HÌNH ẢNH MÔ TẢ cho sản phẩm này !',
                    icon: <ExclamationCircleOutlined />,
                    okButtonProps: true,
                    onCancel: () => { },
                    onOk: () => {
                        this.onSubmit(data);
                    },
                });
            } else {
                this.onSubmit(data);
            }
        } catch (error) {
            message.error('Có lỗi. Thử lại !');
        }
    };

    onSubmit = async (data) => {
        try {
            this.setState({ isSubmitting: true });
            const {
                code,
                name,
                price,
                discount,
                stock,
                brand,
                otherInfo,
                ...rest
            } = data;
            const product = {
                type: this.state.typeSelected,
                discount,
                code,
                name,
                price,
                brand,
                stock,
                otherInfo,
                avatar: this.state.avatar,
            };
            const catalogs = this.fileCompressedList.map((item) => item.data);
            const details = {
                ...rest,
                catalogs,
            };
            const dataSend = { product, details, desc: this.state.productDecs };
            const response = await adminApi.postAddProduct(dataSend);
            if (response.status === 200) {
                this.setState({ isSubmitting: false });
                message.success('Thêm sản phẩm thành công');
            }
        } catch (error) {
            this.setState({ isSubmitting: false });
            if (error.response) {
                message.error(error.response.data.message);
            } else {
                message.error('Thêm sản phẩm thất bại. Thử lại');
            }
        }
    };

    render() {
        const { isTypeSelected, avtFileList, fileList, isSubmitting } = this.state;

        return (
            <div className="Admin-Product-Page">
                <h1 className="t-center p-t-20">
                    <b>Thêm sản phẩm</b>
                </h1>
                <Select
                    className="m-l-20"
                    size="large"
                    style={{ width: 250 }}
                    onChange={this.onProductTypeChange}
                    placeholder="Chọn loại sản phẩm *">
                    {constants.PRODUCT_TYPES.map((item, index) => (
                        <Select.Option value={item.type} key={index}>
                            {item.label}
                        </Select.Option>
                    ))}
                </Select>
                {isTypeSelected && (
                    <div className="p-20">
                        <Form
                            name="form"
                            ref={this.formRef}
                            onFinish={this.onValBeforeSubmit}
                            onFinishFailed={() => message.error('Lỗi. Kiểm tra lại form')}>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <h2>Thông tin cơ bản sản phẩm</h2>
                                </Col>
                                <Col span={12} md={8} xl={6} xxl={4}>
                                    <Form.Item
                                        name="code"
                                        rules={[
                                            { required: true, message: 'Bắt buộc', whitespace: true },
                                        ]}>
                                        <Input
                                            size="large"
                                            placeholder="Mã sản phẩm *"
                                            suffix={
                                                <Tooltip title="SKU200500854">
                                                    <InfoCircleOutlined style={{ color: suffixColor }} />
                                                </Tooltip>
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                {/* ... (other form items) ... */}
                                <Col span={24}>
                                    <h2 className="m-b-10">
                                        Thông tin chi tiết cho&nbsp;
                                        <b>{constants.PRODUCT_TYPES[this.state.typeSelected].label}</b>
                                    </h2>
                                    {this.onRenderProduct(this.state.typeSelected)}
                                </Col>
                                {/* ... (other form items) ... */}
                                <Col span={24}>
                                    <h2 className="m-b-10">
                                        Hình ảnh của sản phẩm (Tối đa 10 sản phẩm)
                                    </h2>
                                    <Upload
                                        listType="picture-card"
                                        multiple={true}
                                        onRemove={(file) => {
                                            this.fileCompressedList = this.fileCompressedList.filter(
                                                (item) => item.uid !== file.uid,
                                            );
                                        }}
                                        fileList={fileList}
                                        onChange={({ fileList }) => this.setState({ fileList })}
                                        beforeUpload={(file) => {
                                            this.onCompressFile(file, 1);
                                            return false;
                                        }}>
                                        {fileList.length < 10 && '+ Thêm ảnh'}
                                    </Upload>
                                </Col>
                                <Col span={24} className="d-flex justify-content-end">
                                    <Button
                                        className="m-r-20"
                                        size="large"
                                        danger
                                        type="primary"
                                        onClick={this.onResetForm}>
                                        Reset Form
                                    </Button>
                                    <Button
                                        loading={isSubmitting}
                                        size="large"
                                        type="primary"
                                        htmlType="submit">
                                        Thêm sản phẩm
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                )}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        // language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddForm);
