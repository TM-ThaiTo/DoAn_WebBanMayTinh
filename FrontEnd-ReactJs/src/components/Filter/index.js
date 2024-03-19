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

  // event: hiển thị chi tiết filter menu
  onShowDetails = (key) => {
    const list = constants.FILTER_OPTION_LIST.find((item) => item.key === key);
    if (list)
      this.setState({ filterDetails: { visible: true, list: list.data, root: list.root } });
    else this.setState({ filterDetails: { visible: false, list: [], root: '' } });
  };

  // event: tắt chi tiết filter menu
  onCloseDetails = () => {
    this.setState({ filterDetails: { visible: false, list: [], root: '' } });
  };

  render() {
    const { filterDetails } = this.state;

    return (
      <Row className="Filter" onMouseLeave={this.onCloseDetails}>
        <Col span={2} sm={4} md={8} xl={6}>
          <MenuFilter onShow={this.onShowDetails} />
        </Col>
        <Col span={22} sm={20} md={16} xl={18}>
          <DetailFilter
            visible={filterDetails.visible}
            list={filterDetails.list}
            root={filterDetails.root}
          />
        </Col>
      </Row>
    );
  }
}

export default Filter;
