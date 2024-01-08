import React from 'react';
import { Button, Form, Input } from "antd";
import  './loginCustomer.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  loginUser } from "../../../redux/apiRequest";
import Swal from "sweetalert2";
const LoginCustomer = () => {
	const [form] = Form.useForm();
	let navigate = useNavigate()
	const dispatch = useDispatch()
	const onFinish = async (values) => {
		loginUser(values, dispatch, navigate, Swal)
	};
	return (
		<div className="layoutLoginUser">
			<div className="mainLoginUser">
				<Form name="basic"
					  form={form}
					  autoComplete="off"
					  layout="horizontal"
					  labelAlign="left"
					  onFinish={onFinish}
					  initialValues={{
						  remember: true,
						  email: '',
						  password: ''
					  }}
				>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input placeholder="Tài khoản" />
					</Form.Item>

					<Form.Item
						label=""
						name="password"
						rules={[]}
					>
						<Input.Password placeholder="Mật khẩu" />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className={"submitLogin"}
						>Đăng nhập</Button>
					</Form.Item>
				</Form>
				<p className={'loginTitle'}>Bạn có tài khoản chưa?
					<NavLink to={'/register'}>
						Đăng kí
					</NavLink>
				</p>
			</div>
		</div>
	);
};

export default LoginCustomer;