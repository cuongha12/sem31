import React from 'react';
import { Button, Form, Input } from "antd";
import  '../login/loginCustomer.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import { RegisterApi } from "../../../redux/apiRequest";
const Register = () => {
	const [form] = Form.useForm();
	let navigate = useNavigate()
	const dispatch = useDispatch()
	const onFinish =  (values) => {

		RegisterApi(values, dispatch, navigate, Swal)
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
						  name: '',
						  email: '',
						  password: ''
					  }}
				>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message:'Vui lòng không để trống'
							},
						]}
					>
						<Input placeholder="Họ và tên" />
					</Form.Item>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message:'Vui lòng không để trống'
							},
							{
								type:'email',
								message:'Email chưa đúng định dạng'
							}
						]}
					>
						<Input placeholder="Tài khoản" />
					</Form.Item>

					<Form.Item
						label=""
						name="password"
						rules={[
							{
								required: true,
								message:'Vui lòng không để trống'
							},
						]}
					>
						<Input.Password placeholder="Mật khẩu" />
					</Form.Item>
					<Form.Item
						name="confirm"

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
									return Promise.reject(new Error('Mật khẩu không chính xác'));
								},
							}),
						]}
					>
						<Input.Password placeholder="Nhập lại mật khẩu"/>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className={"submitLogin"}
						>Đăng nhập</Button>
					</Form.Item>
				</Form>
				<p className={'loginTitle'}>Bạn đã có tài khoản?
					<NavLink to={'/login'}>
						Đăng nhập
					</NavLink>
				</p>
			</div>
		</div>
	);
};

export default Register;