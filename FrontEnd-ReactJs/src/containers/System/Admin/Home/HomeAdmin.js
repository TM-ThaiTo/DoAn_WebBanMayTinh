import React, { Component } from 'react';
import { connect } from 'react-redux';

// cac file css, api
// import "./HomeAdmin.scss";

// import * as actions from '../../../store/actions';
// import * as actions from '../../../../store/actions';


class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userRedux: [],
        }
    }

    componentDidMount() {
        // this.props.fetchAllUserStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listUsers != this.props.listUsers) {
        //     this.setState({
        //         userRedux: this.props.listUsers,
        //     })
        // }
    }

    render() {
        return (
            <>
                <div>Trang chủ</div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        // listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        // deleteAUserStart: (idUser) => dispatch(actions.deleteAUserStart(idUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAdmin);
