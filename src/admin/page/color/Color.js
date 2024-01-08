import { Badge, Button, Space, Switch, Table, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'
import CreateColor from './CreateColor';

const Color = () => {
    const { color, axiosJWT, user, getColor } = useContext(AppContext)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [record, setRecord] = useState({});
    // const start = () => {
    //     setLoading(true);
    //     // ajax request after empty completing
    //     setTimeout(() => {
    //         setSelectedRowKeys([]);
    //         setLoading(false);
    //     }, 1000);
    // };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const handleOpen = (type, data) => {
        if (type === 'add') {
            setOpen(true)
            setTitle('Thêm danh mục')
        }
        else {
            setOpen(true)
            setTitle('Sửa danh mục')
            setRecord(data)
        }
    }
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (e) => (
                <Badge status={e.status === false ? 'success' : 'error'} text={e.status === false ? 'Hoạt động' : 'Khoá'} />
            )
        },
        {
            title: 'Khởi tạo',
            render: (e) => (
                <span>{dayjs(e.createdAt).locale('vi').format('dddd, D/M/YYYY h:mm A')}</span>
            ),
            key: 'createdAt'
        },
        {
            title: 'Cập nhật',
            render: (e) => (
                <span>{dayjs(e.updatedAt).locale('vi').format('dddd, D/M/YYYY h:mm A')}</span>
            ),
            key: 'updatedAt'
        },
        {
            title: 'Chặn',
            key: 'blocked',
            render: (e) => (
                <Switch defaultChecked={e.status} onChange={async (vale) => {
                    try {
                        const res = await axiosJWT.put(`/color/update/${e?.id}`, {
                            status: vale
                        }, {
                            headers: {
                                Authorization: `Bearer ${user?.accessToken}`
                            }
                        })
                        if (res.data.status === 201) {
                            getColor()
                            message.success(`${res.data.mess}`)
                            setOpen(false)
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
            render: (e) => (
                <Space>
                    <Button onClick={() => handleOpen('edit', e)} icon={<EditOutlined />} size={'middle'} type="primary">
                    </Button>
                    <Button icon={<DeleteOutlined />} danger size={'middle'} type="primary" onClick={async () => {
                        try {
                            const res = await axiosJWT.delete(`/color/delete/${e?.id}`, {
                                headers: {
                                    Authorization: `Bearer ${user?.accessToken}`
                                }
                            })
                            if (res.data.status === 201) {
                                getColor()
                                message.success(`${res.data.mess}`)
                                setOpen(false)
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
    return (
        <div>
            <div>
                <div
                    style={{
                        marginBottom: 16,
                    }}
                >
                    <Space>
                        {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button> */}
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
                    x: 1300,
                }} rowSelection={rowSelection} columns={columns} dataSource={color} />
                {
                    open && <CreateColor open={open} setOpen={setOpen} record={record} title={title} />
                }
            </div>
        </div>
    )
}

export default Color
