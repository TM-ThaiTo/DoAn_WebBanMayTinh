import React, { Component } from 'react';
import { Col, Row } from 'antd';
import constants from '../../constants/index.js';
import DetailFilter from './DetailFilter';
import './index.scss';
import MenuFilter from './MenuFilter';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterDetails: {
                visible: false,
                list: [],
                root: '',
            }
        };
    }

    onShowDetails = (key) => {
        const list = constants.FILTER_OPTION_LIST.find((item) => item.key === key);
        if (list)
            this.setState({ filterDetails: { visible: true, list: list.data, root: list.root } });
        else
            this.setState({ filterDetails: { visible: false, list: [], root: '' } });
        // this.setState({ filterDetails: { visible: true, list: list.data, root: '' } });
    };

    onCloseDetails = () => {
        this.setState({ filterDetails: { visible: false, list: [], root: '' } });
        // this.setState({ filterDetails: { visible: true, list: [], root: '' } });

    };

    render() {
        return (
            <Row className="Filter" onMouseLeave={this.onCloseDetails}>
                <Col span={2} sm={4} md={8} xl={6}>
                    <MenuFilter onShow={this.onShowDetails} />
                </Col>
                <Col span={22} sm={20} md={16} xl={18}>
                    <DetailFilter
                        visible={this.state.filterDetails.visible}
                        list={this.state.filterDetails.list}
                        root={this.state.filterDetails.root}
                    />
                </Col>
            </Row>
        );
    }
}

export default Filter;
