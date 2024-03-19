import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import constants from '../../../constants/index.js';

class DetailFilter extends Component {
  renderGenderDetailFilter(list, root) {
    return (
      list &&
      list.map((item, index) => (
        <div key={index} className="Filter-detail-item m-b-18">
          <span className="title">
            {item.title} <b>&#8919;</b>
          </span>
          {item.subFilters.map((sub, key) => (
            <Link
              key={key}
              to={root + '&' + item.query + sub.to}
              className="sub-filter">
              <i className="p-lr-6">&nbsp;|&nbsp;</i>
              {sub.title}
            </Link>
          ))}
        </div>
      ))
    );
  }

  render() {
    const { list, visible, root } = this.props;

    return (
      <>
        {visible && (
          <div className="Filter-detail bor-rad-8 p-tb-16 p-lr-32 w-100 h-100 m-l-16 d-flex flex-direction-column">
            {this.renderGenderDetailFilter(list, root)}
          </div>
        )}
      </>
    );
  }
}

DetailFilter.defaultProps = {
  visible: false,
  list: [],
  root: constants.ROUTES.FILTER,
};

DetailFilter.propTypes = {
  list: PropTypes.array,
  visible: PropTypes.bool,
  root: PropTypes.string,
};

export default DetailFilter;
