
import React, { Component } from 'react';
import { connect } from 'react-redux';


const mainColor = '#141428';

class Ram extends Component {

    render() {
        return (
            <>
                Trang thêm Ram
            </>
        )
    }
}

// Map state từ Redux store vào props của component
const mapStateToProps = state => {
    return {
        // isLoggedIn: state.auth.isLoggedIn,
        // adminName: state.auth.adminName
    };
};

// Map các action creators để dispatch vào props của component
const mapDispatchToProps = dispatch => {
    return {
        // Ví dụ: loginAction: (name) => dispatch(actions.login(name)),
        // logoutAction: () => dispatch(actions.logout())
    };
};

// Kết nối component với Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Ram);
