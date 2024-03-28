import React, { Component } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Tooltip } from 'antd';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import DatePickerField from '../../../components/Custom/Field/DatePickerField';
import InputField from '../../../components/Custom/Field/InputField';
import SelectField from '../../../components/Custom/Field/SelectField';
import constants from '../../../constants/index';


class UpdateAccountForm extends Component {
    state = {
        isSubmitting: false,
    };

    render() {
        const { isSubmitting } = this.state;

        const user = {
            _id: 'user_id_here',
            fullName: 'Ngọc Thạch',
            email: 'thach8ahamtri@gmail.com',
            address: '117 Đình Phong Phú',
            birthday: new Date(),
            gender: 'male',
        };
        // giá trọ khởi tạo cho formik
        const initialValue = {
            email: user.email,
            fullName: user.fullName,
            address: user.address,
            gender: user.gender,
            birthday: user.birthday,
        };

        const validationSchema = Yup.object().shape({
            email: Yup.string()
                .trim()
                .required('* Vui lòng nhập email')
                .email('* Email không hợp lệ !'),
            fullName: Yup.string()
                .trim()
                .required('* Vui lòng nhập họ và tên')
                .matches(
                    /[^~!@#%\^&\*()_\+-=\|\\,\.\/\[\]{}'"`]/,
                    '* Không được chứa ký tự đặc biệt',
                )
                .max(70, '* Tối đa 70 ký tự'),
            birthday: Yup.date()
                .notRequired()
                .min(new Date(1900, 1, 1), '* Năm sinh từ năm 1900')
                .max(
                    new Date(new Date().getFullYear() - parseInt(constants.MIN_AGE), 1, 1),
                    `* Tuổi tối thiểu là ${constants.MIN_AGE}`,
                ),
            gender: Yup.boolean().required('* Vui lòng chọn giới tính'),
            address: Yup.string()
                .trim()
                .max(100, '* Tối đa 100 ký tự'),
        });

        //cho cập nhâp api tại đây
        const handleUpdate = async (value) => {
            try {
                this.setState({ isSubmitting: true });
                // Giả sử đã có logic cập nhật tại đây
                setTimeout(() => {
                    message.success('Cập nhật thành công.');
                    this.setState({ isSubmitting: false });
                }, 1000);
            } catch (error) {
                message.error('Cập nhật thất bại. Vui lòng thử lại', 2);
                this.setState({ isSubmitting: false });
            }
        };

        return (
            <>
                {user.email && (
                    <Formik
                        initialValues={initialValue}
                        validationSchema={validationSchema}
                        onSubmit={(value) => handleUpdate(value)}>
                        {(formikProps) => {
                            const suffixColor = 'rgba(0, 0, 0, 0.25)';
                            return (
                                <Form className="box-sha-home bg-white bor-rad-8">
                                    <Row className=" p-16" gutter={[32, 32]} style={{ margin: 0 }}>
                                        <Col className="p-b-0" span={24} md={12}>
                                            {/* email field */}
                                            <FastField
                                                name="email"
                                                component={InputField}
                                                disabled={true}
                                                className="input-form-common"
                                                placeholder="Email *"
                                                size="large"
                                                suffix={
                                                    <Tooltip title="Email của bạn">
                                                        <InfoCircleOutlined
                                                            style={{
                                                                color: suffixColor,
                                                            }}
                                                        />
                                                    </Tooltip>
                                                }
                                            />
                                        </Col>
                                        <Col className="p-b-0" span={24} md={12}>
                                            {/* full name field */}
                                            <FastField
                                                name="fullName"
                                                component={InputField}
                                                className="input-form-common"
                                                placeholder="Họ và tên *"
                                                size="large"
                                                suffix={
                                                    <Tooltip title="Họ và tên của bạn">
                                                        <InfoCircleOutlined style={{ color: suffixColor }} />
                                                    </Tooltip>
                                                }
                                            />
                                        </Col>
                                        <Col className="p-b-0" span={24} md={12}>
                                            {/* birthday field */}
                                            <FastField
                                                className="input-form-common"
                                                name="birthday"
                                                component={DatePickerField}
                                                placeholder="Ngày sinh *"
                                                size="large"
                                            />
                                        </Col>
                                        <Col className="p-b-0" span={24} md={12}>
                                            {/* gender field */}
                                            <FastField
                                                className="input-form-common gender-field"
                                                size="large"
                                                name="gender"
                                                component={SelectField}
                                                placeholder="Giới tính *"
                                                options={constants.GENDER_OPTIONS}
                                            />
                                        </Col>
                                        <Col className="p-b-0" span={24} md={12}>
                                            {/* address field */}
                                            <FastField
                                                name="address"
                                                component={InputField}
                                                className="input-form-common"
                                                placeholder="Địa chỉ"
                                                size="large"
                                                suffix={
                                                    <Tooltip title="Địa chỉ của bạn">
                                                        <InfoCircleOutlined style={{ color: suffixColor }} />
                                                    </Tooltip>
                                                }
                                            />
                                        </Col>
                                        {/* Button submit */}
                                        <Col className="p-tb-16 t-left" span={24}>
                                            <Button
                                                className="w-30"
                                                size="large"
                                                type="primary"
                                                loading={isSubmitting}
                                                htmlType="submit">
                                                {isSubmitting ? 'Đang cập nhật ...' : 'Cập nhật'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </>
        );
    }
}

export default UpdateAccountForm;
