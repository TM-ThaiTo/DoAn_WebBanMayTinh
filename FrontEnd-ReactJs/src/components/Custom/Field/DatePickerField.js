import React from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';

class DatePickerField extends React.Component {
  componentDidMount() {
    const { field } = this.props;
    this.handleOnChange(new Date(), field.value);
  }

  handleOnChange = (date, dateString) => {
    const { field, form } = this.props;
    const { name } = field;
    form.setFieldValue(name, dateString);
  };

  render() {
    const { field, form, className, placeholder, size } = this.props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
      <>
        <DatePicker
          className={showError ? className + ' error-input' : className}
          name={name}
          placeholder={placeholder}
          onChange={this.handleOnChange}
          size={size}
        />
        {showError && <div className="show-error-input">{errors[name]}</div>}
      </>
    );
  }
}

DatePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
};

export default DatePickerField;
