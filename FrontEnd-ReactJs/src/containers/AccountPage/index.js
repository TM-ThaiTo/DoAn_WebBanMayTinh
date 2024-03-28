import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
<<<<<<< HEAD
  CompassOutlined,
  NotificationOutlined,
  ReconciliationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Result, Row , Col } from 'antd';
=======
    CompassOutlined,
    NotificationOutlined,
    ReconciliationOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Result, Row, Col } from 'antd';
>>>>>>> main
import constants from '../../constants/index';
import './index.scss';
import UpdateAccountForm from './UpdateForm';
import userLogo from '../../assets/icon/user_32px.png';

class AccountPage extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '',
    };
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    const activeKey = pathname.replace(`${constants.ROUTES.ACCOUNT}/`, '');
    this.setState({ activeKey });
  }

  renderComponent = (key = '') => {
    switch (key) {
      case '':
        return (
          <>
            <h2 className="m-b-12">Thông tin tài khoản</h2>
            <UpdateAccountForm />
          </>
        );
      case 'orders':
        return (
          <>
            <h2 className="m-b-12">Các đơn hàng của bạn</h2>
            {/* <OrderList /> */}
          </>
        );
      case 'addresses':
        return (
          <>
            <h2 className="m-b-12">Danh sách địa chỉ giao hàng của bạn</h2>
            {/* <AddressUserList /> */}
          </>
        );
      case 'notifications':
        return (
          <>
            <h2 className="m-b-12">Thông báo</h2>
            <Result
              icon={<NotificationOutlined />}
              title="Hiện tại, không có thông báo nào"
            />
            ,
          </>
        );
      default:
        <>
          <h2 className="m-b-12">Thông tin tài khoản</h2>
          <UpdateAccountForm />
        </>;
    }
  };

  handleMenuClick = (key) => {
    this.setState({ activeKey: key });
  };

  render() {
    const { activeKey } = this.state;
    const { isAuth } = this.props; // Assume isAuth is passed as props

  //   if (!isAuth) {
  //     return (
  //       <div style={{ minHeight: '82vh' }}>
  //         <Result
  //           title="Đăng nhập để xem thông tin"
  //           extra={[
  //             <Button type="primary" key="signup" className="btn-secondary">
  //               <Link to={constants.ROUTES.SIGNUP}>Đăng ký</Link>
  //             </Button>,
  //             <Button type="primary" key="login">
  //               <Link to={constants.ROUTES.LOGIN}>Đăng nhập</Link>
  //             </Button>,
  //           ]}
  //         />
  //       </div>
  //     );
  //   }

    const menu = [
      {
        Icon: <UserOutlined className="icon m-r-12 font-size-30px" />,
        title: 'Thông tin tài khoản',
        key: '',
      },
      {
        Icon: (
          <ReconciliationOutlined className="icon m-r-12 font-size-24px" />
        ),
        title: 'Quản lý đơn hàng',
        key: 'orders',
      },
      {
        Icon: <CompassOutlined className="icon m-r-12 font-size-24px" />,
        title: 'Địa chỉ giao hàng',
        key: 'addresses',
      },
      {
        Icon: (
          <NotificationOutlined className="icon m-r-12 font-size-24px" />
        ),
        title: 'Thông báo',
        key: 'notifications',
      },
    ];

    return (
      <Row className="account-page container m-tb-32">
        <Col className="p-r-16" span={24} md={6}>
          {/* giới thiệu */}
          <div className="d-flex p-b-4 m-b-12 intro">
            <img src={userLogo} width={32} height={32} className="m-r-12" />
            <div>
              <span className="m-b-0 font-size-16px">Tài khoản của</span>
              <h3>
                {/* <b className="name">{this.props.user.fullName}</b> */}
              </h3>
            </div>
          </div>

          {/* menu */}
          <ul className="account-page-menu m-t-20">
            {menu.map((item, index) => (
              <li
                key={index}
                className={`account-page-menu-item p-b-20 ${
                  item.key === activeKey ? 'active' : ''
                }`}
                onClick={() => this.handleMenuClick(item.key)}>
                {item.Icon}
                <span className="font-size-20px">{item.title}</span>
              </li>
            ))}
          </ul>
        </Col>

        <Col className="p-lr-8" span={24} md={18}>
          {this.renderComponent(activeKey)}
        </Col>
      </Row>
    );
  }
=======
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '',
        };
    }

    componentDidMount() {
        const { pathname } = this.props.location;
        const activeKey = pathname.replace(`${constants.ROUTES.ACCOUNT}/`, '');
        this.setState({ activeKey });
    }

    renderComponent = (key = '') => {
        switch (key) {
            case '':
                return (
                    <>
                        <h2 className="m-b-12">Thông tin tài khoản</h2>
                        <UpdateAccountForm />
                    </>
                );
            case 'orders':
                return (
                    <>
                        <h2 className="m-b-12">Các đơn hàng của bạn</h2>
                        {/* <OrderList /> */}
                    </>
                );
            case 'addresses':
                return (
                    <>
                        <h2 className="m-b-12">Danh sách địa chỉ giao hàng của bạn</h2>
                        {/* <AddressUserList /> */}
                    </>
                );
            case 'notifications':
                return (
                    <>
                        <h2 className="m-b-12">Thông báo</h2>
                        <Result
                            icon={<NotificationOutlined />}
                            title="Hiện tại, không có thông báo nào"
                        />
                        ,
                    </>
                );
            default:
                <>
                    <h2 className="m-b-12">Thông tin tài khoản</h2>
                    <UpdateAccountForm />
                </>;
        }
    };

    handleMenuClick = (key) => {
        this.setState({ activeKey: key });
    };

    render() {
        const { activeKey } = this.state;
        const { isAuth } = this.props; // Assume isAuth is passed as props

        //   if (!isAuth) {
        //     return (
        //       <div style={{ minHeight: '82vh' }}>
        //         <Result
        //           title="Đăng nhập để xem thông tin"
        //           extra={[
        //             <Button type="primary" key="signup" className="btn-secondary">
        //               <Link to={constants.ROUTES.SIGNUP}>Đăng ký</Link>
        //             </Button>,
        //             <Button type="primary" key="login">
        //               <Link to={constants.ROUTES.LOGIN}>Đăng nhập</Link>
        //             </Button>,
        //           ]}
        //         />
        //       </div>
        //     );
        //   }

        const menu = [
            {
                Icon: <UserOutlined className="menu1 icon m-r-12 font-size-30px" />,
                title: 'Thông tin tài khoản',
                key: '',
            },
            {
                Icon: (
                    <ReconciliationOutlined className="menu1 icon m-r-12 font-size-24px" />
                ),
                title: 'Quản lý đơn hàng',
                key: 'orders',
            },
            {
                Icon: <CompassOutlined className="menu1 icon m-r-12 font-size-24px" />,
                title: 'Địa chỉ giao hàng',
                key: 'addresses',
            },
            {
                Icon: (
                    <NotificationOutlined className="menu1 icon m-r-12 font-size-24px" />
                ),
                title: 'Thông báo',
                key: 'notifications',
            },
        ];

        return (
            <Row className="account-page container m-tb-32">
                <Col className="p-r-16" span={24} md={6}>
                    {/* giới thiệu */}
                    <div className="d-flex p-b-4 m-b-12 intro">
                        <img src={userLogo} width={32} height={32} className="m-r-12" />
                        <div>
                            <span className="m-b-0 font-size-16px">Tài khoản của</span>
                            <h3>
                                {/* <b className="name">{this.props.user.fullName}</b> */}
                            </h3>
                        </div>
                    </div>

                    {/* menu */}
                    <ul className="account-page-menu m-t-20">
                        {menu.map((item, index) => (
                            <li
                                key={index}
                                className={`account-page-menu-item p-b-20 ${item.key === activeKey ? 'active' : ''
                                    }`}
                                onClick={() => this.handleMenuClick(item.key)}>
                                {item.Icon}
                                <span className="font-size-20px">{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </Col>

                <Col className="p-lr-8" span={24} md={18}>
                    {this.renderComponent(activeKey)}
                </Col>
            </Row>
        );
    }
>>>>>>> main
}

export default withRouter(AccountPage);
