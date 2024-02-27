import React, { Component } from 'react';
import { connect } from 'react-redux';

class WebManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userRedux: [],
        };
    }

    componentDidMount() {
        // this.props.fetchAllUserStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listUsers !== this.props.listUsers) {
        //     this.setState({
        //         userRedux: this.props.listUsers,
        //     });
        // }
    }

    render() {
        return (
            <>
                <div>Trang quản lý trang web</div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        // deleteAUserStart: (idUser) => dispatch(actions.deleteAUserStart(idUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebManage);
