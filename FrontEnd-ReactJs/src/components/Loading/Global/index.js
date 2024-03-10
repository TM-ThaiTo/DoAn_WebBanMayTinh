import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

class GlobalLoading extends Component {
    render() {
        const { content } = this.props;

        return (
            <Spin
                size="large"
                className="Global-Loading trans-center"
                tip={content}
            />
        );
    }
}

GlobalLoading.defaultProps = {
    content: 'TTB Store Loading...',
};

GlobalLoading.propTypes = {
    content: PropTypes.string,
};

export default GlobalLoading;
