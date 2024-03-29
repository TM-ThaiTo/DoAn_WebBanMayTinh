import React, { Component } from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';

class CheckboxField extends Component {
    render() {
        const { field, className, children } = this.props;
        const { name, value } = field;

        return (
            <Checkbox className={className} name={name} {...field} checked={value}>
                {children}
            </Checkbox>
        );
    }
}

CheckboxField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    className: PropTypes.string,
    checked: PropTypes.bool,
    children: PropTypes.any,
};

export default CheckboxField;
