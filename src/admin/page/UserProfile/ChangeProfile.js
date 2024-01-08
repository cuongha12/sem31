import { Button, Drawer, Form, Input, Select, Space, Switch } from 'antd'
import React from 'react'

const ChangeProfile = ({ open, onClose, record }) => {
    return (
        <div>
            <Drawer
                title={'Sửa hồ sơ'}
                width={500}
                onClose={onClose}
                placement="right"
                open={open}
                footer={
                    <>
                        <Space>
                            <Button type="primary" htmlType="submit" danger form="profile-form">
                                Lưu lại
                            </Button>
                            <Button type="primary" onClick={() => onClose("back")}>
                                Quay lại
                            </Button>
                        </Space>
                    </>
                }
            >
                <Space>
                    <Form
                        name="profile-form"
                        layout="horizontal"
                        style={{
                            maxWidth: 600,
                        }}
                        encType="multipart/form-data"
                        onFinish={value => onClose('update', value)}
                        initialValues={{
                            remember: true,
                            name: record?.name,
                            email: record?.email,
                            role: record?.role,
                            status: record?.status
                        }}
                    >
                        <Form.Item
                            name="name"
                            label={'Tên'}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Tên không được để trống',
                                },
                            ]}                        >
                            <Input placeholder="Tên" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label={'Email'}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Email không được để trống',
                                },
                                {
                                    type: 'email',
                                    message: 'Email chưa đúng định dạng',
                                },
                            ]}                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="role" label={"Phân quyền"}>
                            <Select
                                style={{ width: '100%' }}
                                options={[
                                    {
                                        label: 'Quản trị viên',
                                        value: 'admin'
                                    },
                                    {
                                        label: 'Admin',
                                        value: 'adminpro'
                                    }
                                ]}
                            ></Select>
                        </Form.Item>
                        <Form.Item valuePropName="checked" name="status" label={"Trạng thái"}>
                            <Switch />
                        </Form.Item>

                    </Form>
                </Space>
            </Drawer>
        </div>
    )
}

export default ChangeProfile
