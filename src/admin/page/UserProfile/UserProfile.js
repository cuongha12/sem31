import { Badge, Button, Descriptions, Space, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import ChangeProfile from './ChangeProfile'

const UserProfile = () => {
    const { axiosJWT, user, } = useContext(AppContext)
    const [userProfile, setUserProfile] = useState({})
    const getUser = async () => {
        const res = await axiosJWT.get('/profile', {
            headers: {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            }
        })
        if (res.data.status === 404) {
            message.error(`${res.data.mess}`)
        } else {
            setUserProfile(res.data.data)
        }
    }

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = async (type, data) => {
        if (type === 'update') {
            const res = await axiosJWT.post('/change-profile', data, {
                headers: {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                }
            })
            if (res.data.status === 404) {
                message.error(`${res.data.mess}`)
            } else {
                setOpen(false);
                getUser()
                message.success(`${res.data.mess}`)
            }
        } else {
            setOpen(false);
        }
    };

    useEffect(() => {
        getUser()
    }, [])
    return (
        <>
            <Descriptions title="Thông tin cá nhân" extra={<Button onClick={showDrawer} type="primary">Thay đổi</Button>}>
                <Descriptions.Item label="Tên">{userProfile?.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{userProfile?.email}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái"><Badge status={userProfile?.status === false ? 'success' : 'error'} text={userProfile?.status === false ? 'Hoạt động' : 'Khoá'} /></Descriptions.Item>
                <Descriptions.Item label="Vai trò">{userProfile?.role === 'admin' ? 'Quản trị viên' : 'Admin'}</Descriptions.Item>
            </Descriptions>
            {
                open && <ChangeProfile open={open} onClose={onClose} record={userProfile} />
            }
        </>

    )
}

export default UserProfile
