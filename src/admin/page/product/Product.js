import { Badge, Button, Space, Switch, Table, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'
import CreateProduct from './CreateProduct';
import axios from 'axios';


const Product = () => {
    const { axiosJWT, user, product, getProduct } = useContext(AppContext)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [record, setRecord] = useState({});
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        product,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const handleOpen = (type, data) => {
        if (type === 'add') {
            setOpen(true)
            setTitle('Thêm sản phẩm')
        }
        else {
            setOpen(true)
            setTitle('Sửa sản phẩm')
            setRecord(data)
        }
    }
    const deleteMany = async () => {
        try {
            const formData = new FormData();
            formData.append('ids', JSON.stringify(selectedRowKeys))
            const res = await axiosJWT.post(`/product/delete`, formData, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            })
            if (res.data.status === 201) {
                getProduct()
                message.success(`${res.data.mess}`)
            } else if (res.data.status === 203) {
                message.error(`${res.data.mess}`)
            }
            else {
                message.error(`${res.data.mess}`)
            }
        } catch (error) {
            message.error(`Lỗi server`)
        }
    };
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
        },
        {
            title: 'Ảnh',
            render: (e) => (
                <span>
                    <img style={{
                        width: '100px',
                        height: '100px'
                    }} src={`/uploads/${e.image.length > 0 ? e.image[0].image : ''}`} alt="" />
                </span>
            ),
            key: 'name',
            width: '10%',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (value) => (
                <span className="total">
                    {(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}₫
                </span>
            ),
            width: '5%',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'sale',
            key: 'sale',
            render: (value) => (
                <span className="total">
                    {value}%
                </span>
            ),
            width: '5%',
        },
        {
            title: 'Sản phẩm nổi bật',
            render: (e) => (
                <Badge status={e.hot === false ? 'error' : 'success'} text={e.hot === false ? 'Không' : 'Có'} />
            ),
            key: 'hot',
            width: '10%',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (e) => (
                <Badge status={e.status === false ? 'success' : 'error'} text={e.status === false ? 'Hoạt động' : 'Khoá'} />
            ),
            width: '10%',
        },
        {
            title: 'Khởi tạo',
            render: (e) => (
                <span>{dayjs(e.createdAt).locale('vi').format('dddd, D/M/YYYY h:mm A')}</span>
            ),
            key: 'createdAt',
            width: '15%',
        },
        {
            title: 'Cập nhật',
            render: (e) => (
                <span>{dayjs(e.updatedAt).locale('vi').format('dddd, D/M/YYYY h:mm A')}</span>
            ),
            key: 'updatedAt',
            width: '15%',
        },
        {
            title: 'Chặn',
            width: '5%',
            key: 'blocked',
            render: (e) => (
                <Switch defaultChecked={e.status} onChange={async (vale) => {
                    try {
                        const res = await axiosJWT.put(`/product/update/action/${e?.id}`, {
                            status: vale
                        }, {
                            headers: {
                                Authorization: `Bearer ${user?.accessToken}`
                            }
                        })
                        if (res.data.status === 201) {
                            getProduct()
                            message.success(`${res.data.mess}`)
                        } else {
                            message.error(`${res.data.mess}`)
                        }
                    } catch (error) {
                        message.error(`Lỗi server`)
                    }
                }} />
            )
        },
        {
            title: 'Nổi bật',
            key: 'click',
            width: '5%',
            render: (e) => (
                <Switch defaultChecked={e.hot} onChange={async (vale) => {
                    try {
                        const res = await axiosJWT.put(`/product/update/action/${e?.id}`, {
                            hot: vale
                        }, {
                            headers: {
                                Authorization: `Bearer ${user?.accessToken}`
                            }
                        })
                        if (res.data.status === 201) {
                            getProduct()
                            message.success(`${res.data.mess}`)
                        } else {
                            message.error(`${res.data.mess}`)
                        }
                    } catch (error) {
                        message.error(`Lỗi server`)
                    }
                }} />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '5%',
            render: (e) => (
                <Space>
                    <Button onClick={() => handleOpen('edit', e)} icon={<EditOutlined />} size={'middle'} type="primary">
                    </Button>
                    <Button icon={<DeleteOutlined />} danger size={'middle'} type="primary" onClick={async () => {
                        try {
                            const res = await axiosJWT.delete(`/product/delete/${e?.id}`, {
                                headers: {
                                    Authorization: `Bearer ${user?.accessToken}`
                                }
                            })
                            if (res.data.status === 201) {
                                getProduct()
                                message.success(`${res.data.mess}`)
                            } else if (res.data.status === 203) {
                                message.error(`${res.data.mess}`)
                            }
                            else {
                                message.error(`${res.data.mess}`)
                            }
                        } catch (error) {
                            message.error(`Lỗi server`)
                        }
                    }}>
                    </Button>
                </Space>
            )
        },
    ];
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <div>
            <div>
                <div
                    style={{
                        marginBottom: 16,
                    }}
                >
                    <Space>
                        <Button type="primary" onClick={deleteMany} >
                            Xoá
                        </Button>
                        <Button type="primary" onClick={() => handleOpen('add')}>
                            Thêm
                        </Button>
                    </Space>
                    <span
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                
                <Table scroll={{
                    x: 2000,
                }} rowSelection={rowSelection} rowKey={'id'} columns={columns} dataSource={product} />
                {
                    open && <CreateProduct open={open} setOpen={setOpen} record={record} title={title} />
                }
            </div>
        </div>
    )
}

export default Product
