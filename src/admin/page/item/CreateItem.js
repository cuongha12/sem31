import { Button, Drawer, Form, Input, Select, Space, Switch, message } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../../Context/AppContext'

const CreateItem = ({ open, setOpen, title, record }) => {
    const { axiosJWT, user, getItem } = useContext(AppContext)
    const onClose = async (type, data) => {
        if (type === 'add') {
            try {
                const res = await axiosJWT.post('/item/create', data, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })
                if (res.data.status === 201) {
                    message.success(`${res.data.mess}`)
                    getItem()
                    setOpen(false)
                } else {
                    message.error(`${res.data.mess}`)
                }
            } catch (error) {
                message.error(`Lỗi server`)
            }
        } else if (type === 'edit') {
            try {
                const res = await axiosJWT.put(`/item/update/${record?.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                })
                if (res.data.status === 201) {
                    message.success(`${res.data.mess}`)
                    getItem()
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
                        onFinish={value => onClose(title === "Thêm đồ" ? "add" : "edit", value)}
                        initialValues={{
                            remember: true,
                            name: title === "Thêm đồ" ? '' : record?.name,
                            status: title === "Thêm đồ" ? '' : record?.status,
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

                        <Form.Item valuePropName="checked" name="status" label={"Trạng thái"}>
                            <Switch />
                        </Form.Item>

                    </Form>
                </Space>
            </Drawer>
        </div>
    )
}

export default CreateItem
