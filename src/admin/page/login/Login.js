import { Button, Form, Input } from "antd";
import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { loginAdmin } from "../../../redux/apiRequest";
const Login = () => {
    const [form] = Form.useForm();
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        loginAdmin(values, dispatch, navigate, Swal)
    };
    return (
        <div className="layoutLogin">
            <div className="mainLogin">
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
            </div>
        </div>
    );
};

export default Login;
