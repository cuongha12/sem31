import { DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'

const VariantProduct = ({ axiosJWT, id, color, size, user }) => {
    const [variant, setVariant] = useState([])
    const getVariant = async () => {
        return await axiosJWT.get(`/product/variant/${id}`).then((res) => setVariant(res.data.data))
    }
    const [check, setCheck] = useState(false)
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        getVariant()
    }, [])
    const columns = [
        {
            title: 'Màu',
            render: (value) => (
                <>
                    {
                        !check ? (<span>{value?.color?.name}</span>)
                            : (
                                <Select
                                    placeholder="Màu"
                                    defaultValue={value.color.id}
                                    onChange={(item) => {
                                        axiosJWT.put(`/product/update/variant/${value.id}`, {
                                            colorId: item
                                        }, {
                                            headers: {
                                                Authorization: `Bearer ${user?.accessToken}`
                                            }
                                        }).then((res) => {
                                            if (res.data.status === 201) {
                                                getVariant()
                                                message.success(`${res.data.mess}`)
                                            } else {
                                                message.success(`${res.data.mess}`)
                                            }

                                        })
                                    }}
                                    style={{
                                        width: 200,
                                    }}
                                    options={color.map((e) => {
                                        return {
                                            value: e.id,
                                            label: e.name
                                        }
                                    })}
                                />
                            )
                    }
                </>
            ),
            key: 'id'
        },
        {
            title: 'Size',
            render: (value) => (
                <>
                    {
                        !check ? (<span>{value?.size?.name}</span>)
                            : (
                                <Select
                                    placeholder="Size"
                                    value={value.size.id}
                                    onChange={(item) => {
                                        axiosJWT.put(`/product/update/variant/${value.id}`, {
                                            sizeId: item
                                        }, {
                                            headers: {
                                                Authorization: `Bearer ${user?.accessToken}`
                                            }
                                        }).then((res) => {
                                            if (res.data.status === 201) {
                                                getVariant()
                                                message.success(`${res.data.mess}`)
                                            } else {
                                                message.success(`${res.data.mess}`)
                                            }

                                        })
                                    }}
                                    style={{
                                        width: 200,
                                    }}
                                    options={size.map((e) => {
                                        return {
                                            value: e.id,
                                            label: e.name
                                        }
                                    })}
                                />
                            )
                    }
                </>
            ),
            key: 'id'
        },
        {
            title: 'Số lượng',
            render: (value) => {
                return (
                    <>
                        {
                            !check ? (<span>{value.quantity}</span>)
                                : (
                                    <Input type='number' defaultValue={value.quantity}
                                        onChange={(e) => {
                                            axiosJWT.put(`/product/update/variant/${value.id}`, {
                                                quantity: Number(e.target.value)
                                            }, {
                                                headers: {
                                                    Authorization: `Bearer ${user?.accessToken}`
                                                }
                                            }).then((res) => {
                                                if (res.data.status === 201) {
                                                    getVariant()
                                                    message.success(`${res.data.mess}`)
                                                } else {
                                                    message.success(`${res.data.mess}`)
                                                }

                                            })
                                        }}
                                    />
                                )
                        }
                    </>
                )
            },
            key: 'id'
        },
        {
            title: 'Action',
            render: (value) => (
                <>
                    {
                        check && <Space>
                            <Button onClick={() => {
                                axiosJWT.delete(`/product/delete/variant/${value.id}`, {
                                    headers: {
                                        Authorization: `Bearer ${user?.accessToken}`
                                    }
                                }).then((res) => {
                                    if (res.data.status === 201) {
                                        getVariant()
                                        message.success(`${res.data.mess}`)
                                    } else {
                                        message.success(`${res.data.mess}`)
                                    }

                                })
                            }} icon={<DeleteOutlined />} danger size={'middle'} type="primary">
                            </Button>
                        </Space>
                    }

                </>
            ),
            key: 'id',
            hidden: !check ? true : false
        }
    ];

    const onFinish = async (value) => {
        try {
            const result = value.variant.map((e) => {
                return {
                    ...e, productId: id
                }
            })
            const res = await axiosJWT.post(`/product/create/variant`, { variant: result }, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            })
            if (res.data.status === 201) {
                getVariant()
                message.success(`${res.data.mess}`)
                setChecked(false)
            }
        } catch (error) {
            message.error(`Lỗi server`)
        }
    }

    return (
        <div>
            <span style={{
                marginRight: 30
            }}>Biến thể sản phẩm</span>
            {
                (!check && checked === false) && (<Space>
                    <Button onClick={() => setCheck(!check)} size={'middle'} type="primary">
                        Sửa
                    </Button>
                    <Button onClick={() => setChecked(true)} size={'middle'} type="primary">
                        Thêm
                    </Button>
                </Space>)

            }
            {
                check && (
                    <Space>
                        <Button danger onClick={() => setCheck(!check)} size={'middle'} type="primary">
                            Huỷ bỏ
                        </Button>
                    </Space>)
            }
            {
                checked === true && <Form
                    name="option"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                        marginTop: 30
                    }}
                    autoComplete="off"
                >
                    <Form.List name="variant">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }, index) => (

                                    < Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'colorId']}
                                            rules={[{ required: true, message: 'Vui lòng không để trống' }]}
                                        >
                                            <Select
                                                placeholder="Màu"
                                                style={{
                                                    width: 200,
                                                }}
                                                options={color.map((e) => {

                                                    return {
                                                        value: e.id,
                                                        label: e.name
                                                    }
                                                })}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'sizeId']}
                                            rules={[{ required: true, message: 'Vui lòng không để trống' }]}
                                        >
                                            <Select
                                                placeholder="Size"
                                                style={{
                                                    width: 200,
                                                }}
                                                options={size.map((e) => {
                                                    return {
                                                        value: e.id,
                                                        label: e.name,
                                                    }
                                                })}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}

                                        >
                                            <InputNumber min={1} type='number' style={{
                                                width: 200,
                                            }} placeholder="Số lượng" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(fields.map((e) => e.name))} />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" style={{
                                        width: '100%',
                                    }} onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Space>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" form='option'>
                                    Thêm
                                </Button>
                                <Button type="primary" onClick={() => {
                                    setChecked(false)
                                }}>
                                    Huỷ bỏ
                                </Button>
                            </Space>
                        </Form.Item>
                    </Space>
                </Form>
            }
            {
                checked === false && <Table
                    columns={columns.filter((e) => e.hidden !== true)}
                    dataSource={variant}
                    pagination={false}
                    style={{
                        marginTop: 40
                    }}
                />
            }
        </div >
    )
}

export default VariantProduct