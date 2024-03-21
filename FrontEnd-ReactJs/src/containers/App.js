import React, { Component, Fragment, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
// import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
// import { PATH } from '../utils'
// import ConfirmModal from '../components/ConfirmModal';
// import CustomScrollbars from '../components/CustomScrollbars.js';

// cac route
import routesConfig from '../config/routeApp.js';

// các giao diện
import NotFound from '../components/NotFound/NotFound.js';
import GlobalLoading from '../components/Loading/Global/index.js';
// import Header_Top from './Home_User/Header/Header_Top/Header_HomePage_User.js';
// import Header_Logo from './Home_User/Header/Header_Logo/Header_Logo.js';


import HeaderView from '../components/HeaderView/index.js';
import ScrollTo from '../components/ScrollTo/index.js';
import CustomScrollbars from '../components/Custom/ScrollBar/index.js';
import Footer from './Home_User/Footer/Footer.js';
class App extends Component {
    state = {
        isAdminLoggedIn: false // Khởi tạo trạng thái mặc định là chưa đăng nhập
    };

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        const { renderRoutes, routes } = routesConfig;
        return (
            <Fragment>
                {/* <Router history={history}> */}
                <BrowserRouter>
                    <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                        <Suspense fallback={<GlobalLoading />}>
                            {/* <ConfirmModal /> */}
                            <HeaderView />
                            <ScrollTo />
                            <Switch>
                                {renderRoutes(routes)};
                                <Route>
                                    <NotFound />
                                </Route>
                            </Switch>
                        </Suspense>
                        <Footer />
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </CustomScrollbars>
                    {/* </Router> */}
                </BrowserRouter>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);