import { Button, Form, Input, message } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../../Context/AppContext'

const ChangPassword = () => {
    const [form] = Form.useForm();
    const { axiosJWT, user, } = useContext(AppContext)
    const onFinish = async (value) => {
        const res = await axiosJWT.put('/change-password', value, {
            headers: {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            }
        })
        if (res.data.status === 404) {
            message.error(`${res.data.mess}`)
            form.resetFields();
        } else {
            message.success(`${res.data.mess}`)
            form.resetFields();

        }
    }
    return (
        <Form
            name="basic"
            form={form}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Mật khẩu cũ"
                name="oldPassword"
                rules={[
                    {
                        required: true,
                        message: 'Mật khẩu cũ không được để trống',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Mật khẩu mới"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Mật khẩu mới không được để trống',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="newPassword"
                label="Nhập lại mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng không để trống',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu không đúng'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Thay đổi
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ChangPassword
