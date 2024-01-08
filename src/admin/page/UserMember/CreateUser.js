import { Button, Drawer, Form, Input, Select, Space, Switch, message } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../../Context/AppContext'
import Password from 'antd/es/input/Password'

const CreateUser = ({ open, setOpen, title, record }) => {
    const { axiosJWT, user, getUserMember } = useContext(AppContext)
    const onClose = async (type, data) => {
        if (type === 'add') {
            try {
                const res = await axiosJWT.post('/create', data, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })
                if (res.data.status === 201) {
                    message.success(`${res.data.mess}`)
                    getUserMember()
                    setOpen(false)
                }else {
                    message.error(`${res.data.mess}`)
                }

            } catch (error) {
                message.error(`Lỗi server`)
            }

        } else if (type === 'edit') {
            try {
                const res = await axiosJWT.put(`/update/${record?.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })

                if (res.data.status === 201) {
                    message.success(`${res.data.mess}`)
                    getUserMember()
                    setOpen(false)
                }
                else {
                    message.error(`${res.data.mess}`)
                }
            } catch (error) {
                message.error(`Lỗi server`)
            }
        } else if (type === 'change') {
            try {
                const res = await axiosJWT.put(`/change-password/${record?.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })
                if (res.data.status === 201) {
                    message.success(`${res.data.mess}`)
                    getUserMember()
                    setOpen(false)
                }
                else {
                    message.error(`${res.data.mess}`)
                }
            } catch (error) {
                message.error(`Lỗi server`)
            }
        }
        else {
            setOpen(false)
        }
    }
    return (
        <div>
            <Drawer
                title={title}
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
                        onFinish={value => onClose(title === "Thêm tài khoản" ? "add" : title === "Đổi mật khẩu" ? "change" : "edit", value)}
                        initialValues={{
                            remember: true,
                            name: title === "Thêm tài khoản" ? '' : record?.name,
                            email: title === "Thêm tài khoản" ? '' : record?.email,
                            role: title === "Thêm tài khoản" ? '' : record?.role,
                            status: title === "Thêm tài khoản" ? '' : record?.status,
                        }}
                    >
                        {
                            title === "Đổi mật khẩu" ? <>
                                <Form.Item
                                    label="Mật khẩu mới"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mật khẩu không được để trống',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="oldPassword"
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
                            </> : (<>
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
                                {
                                    title === "Thêm tài khoản" && <Form.Item
                                        label="Mật khẩu"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Mật khẩu không được để rooxngF',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                }
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
                                </Form.Item></>)
                        }
                    </Form>
                </Space>
            </Drawer>
        </div>
    )
}

export default CreateUser
