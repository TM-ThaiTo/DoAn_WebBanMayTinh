import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { message, Pagination, Spin, Table, Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';

import EditProductModal from './EditProductModal';

import { getAPIProductList } from "../../../../services/adminService";

class SeeProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editModal: { visible: false, product: null },
            modalDel: { visible: false, _id: '' },
            isLoading: false,
            setIsLoading: false,
            list: [],
            setList: [],
        };

        this.isSubscribe = true;
        this.setEditModal = this.setEditModal.bind(this);
    }

    // Cột của bảng
    columns = [
        {
            title: 'Mã',
            key: 'code',
            dataIndex: 'code',
            render: (code, data) => (
                <a target="blank" href={`/product/${data._id}`}>
                    {code}
                </a>
            ),
        },
        {
            title: 'Tên',
            key: 'name',
            dataIndex: 'name',
            render: (name) => (
                <Tooltip title={name}>{this.reduceProductName(name, 40)}</Tooltip>
            ),
        },
        {
            title: 'Giá',
            key: 'price',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            render: (price) => (
                <h5 style={{ color: '#4F55C5' }}>
                    {price ? this.formatProductPrice(price) : 'Liên hệ'}
                </h5>
            ),
        },
        {
            title: 'Loại',
            key: 'type',
            dataIndex: 'type',
            // filters: generateFilterType(),
            // onFilter: (value, record) => record.type === value,
            // render: (type) => this.convertProductType(type),
        },
        {
            title: 'Thương hiệu',
            key: 'brand',
            dataIndex: 'brand',
            sorter: (a, b) => {
                if (a.brand < b.brand) return -1;
                if (a.brand > b.brand) return 1;
                return 0;
            },
            render: (brand) => (
                <Tooltip title={brand}>{this.reduceProductName(brand, 40)}</Tooltip>
            ),
        },
        {
            title: 'Tồn kho',
            key: 'stock',
            dataIndex: 'stock',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.stock - b.stock,
        },
        {
            title: 'Mức giảm giá',
            key: 'discount',
            dataIndex: 'discount',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.discount - b.discount,
            render: (discount) => `${discount} %`,
        },
        {
            title: 'Đánh giá',
            key: 'rate',
            dataIndex: 'rate',
            // render: (rate) => this.calStar(rate).toFixed(1),
        },
        {
            title: 'Hành động',
            key: 'actions',
            fixed: 'right',
            width: 100,
            render: (text) => (
                <>
                    <DeleteOutlined
                        // onClick={() => setModalDel({ visible: true, _id: text._id })}
                        className="m-r-8 action-btn-product"
                        style={{ color: 'red' }}
                    />
                    <Tooltip title="Chỉnh sửa" placement="left">
                        <EditOutlined
                            onClick={() => {
                                this.setEditModal({ visible: true, product: { ...text } });
                            }}
                            className="m-r-8 action-btn-product"
                            style={{ color: '#444' }}
                        />
                    </Tooltip>

                    <Tooltip title="Xem chi tiết" placement="left">
                        <a target="blank" href={`/product/${text._id}`}>
                            <EyeOutlined
                                className="action-btn-product"
                                style={{ color: '#444' }}
                            />
                        </a>
                    </Tooltip>
                </>
            ),
        },
    ];

    // modal edit 
    setEditModal = (modalData) => {
        this.setState({
            editModal: {
                ...this.state.editModal,
                ...modalData,
            },
        });
    }

    // fn: hàm rút gọn tên sản phẩm
    reduceProductName = (name, length = 64) => {
        let result = name;
        if (name && name.length >= length) {
            result = name.slice(0, length) + ' ...';
        }
        return result;
    };

    // fn: hàm format giá sản phẩm
    formatProductPrice = (price) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
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

    // Event: delete product
    onDelete = async (_id) => {
        // try {
        //   const response = await adminApi.removeProduct(_id);
        //   if (response && response.status === 200) {
        //     message.success('Xoá thành công.');
        //     const newList = this.state.list.filter((item) => item._id !== _id);
        //     this.setState({ list: newList });
        //     // Assuming total is defined somewhere in your code
        //     // this.setTotal(total - 1);
        //   }
        // } catch (error) {
        //   message.error('Xoá thất bại, thử lại !');
        // }
        alert.message("On delete");
    };

    // Event: close edit modal
    onCloseEditModal = (newProduct) => {
        const newList = this.state.list.map((item) =>
            item._id !== newProduct._id ? item : { ...item, ...newProduct },
        );
        this.setState({
            list: newList,
            editModal: { visible: false }
        });
    };

    // Event: get all products
    componentDidMount = () => {
        this.getProductList();
    }

    componentWillUnmount() {
        this.isSubscribe = false;
    }

    getProductList = async () => {
        try {
            this.setState({ isLoading: true });
            const response = await getAPIProductList();

            if (response && response.data && response.code === 0) {
                const data = response.data;

                const newList = data.map((item) => {
                    return {
                        key: item.id_product,
                        code: item.code,
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        brand: item.brand,
                        stock: item.stock,
                        discount: item.discount,
                        rate: item.rate,
                    };
                });

                this.setState({ list: newList, isLoading: false });

                // const list = data.map((item) => ({ ...item, key: item.id_product }));
                // this.setState({ list, isLoading: false });
            } else {
                message.error('Lấy danh sách Sản phẩm thất bại');
                this.setState({ isLoading: false });
            }
        } catch (error) {
            if (this.isSubscribe) {
                this.setState({ isLoading: false });
                console.log("check error: ", error, this.isSubscribe);
                message.error('Lỗi try-catch lấy sản phẩm.');
            }
        }
    }

    render() {
        // JSX
        const { list, isLoading } = this.state;
        const { visible, product } = this.state.editModal;

        return (
            <div className="pos-relative p-8">

                {/* Rest of your code */}

                <Table
                    pagination={{
                        position: ['bottomCenter'],
                        showLessItems: true,
                    }}
                    className="admin-see-product"
                    columns={this.columns}
                    dataSource={list} // Updated this line
                />

                {/* edit product modal */}
                <EditProductModal
                    visible={visible}
                    onClose={(value) => this.onCloseEditModal(value)}
                    product={product}
                />
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


export default connect(mapStateToProps, mapDispatchToProps)(SeeProduct);
