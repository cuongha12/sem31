
import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import { Badge, Button, message, Space, Switch, Table } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined, ToolOutlined } from "@ant-design/icons";
import axios from "axios";

const UserCustomer = () => {
	const { userGroup,getUserCustomer} = useContext(AppContext)
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const onSelectChange = (newSelectedRowKeys) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const hasSelected = selectedRowKeys.length > 0;
	const columns = [
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
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
				<Switch defaultChecked={e.status}
						onChange={async (vale) => {
					try {
						const res = await axios.put(`/user/block/${e?.id}`)
						if (res.data.status === 201) {
							message.success(`${res.data.mess}`)
							getUserCustomer()
						} else {
							message.error(`${res.data.mess}`)
						}
					} catch (error) {
						message.error(`Lỗi server`)
					}
				}}
				/>
			)
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (e) => (
				<Space>

					<Button icon={<DeleteOutlined />} danger size={'middle'} type="primary"
					onClick={async ()=>{
						try {
							const res = await axios.delete(`/user/delete/${e?.id}`)
							if (res.data.status === 201) {
								message.success(`${res.data.mess}`)
								getUserCustomer()
							} else {
								message.error(`${res.data.mess}`)
							}
						} catch (error) {
							message.error(`Lỗi server`)
						}
					}}
					>

					</Button>

				</Space>
			)
		},
	];
	return (
		<div>
			<div
				style={{
					marginBottom: 16,
				}}
			>
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
			}} rowSelection={rowSelection} columns={columns} dataSource={userGroup} />

		</div>
	);
};

export default UserCustomer;