import {
	LaptopOutlined,
	UsergroupDeleteOutlined,
	UserOutlined,
	ShoppingOutlined,
	UsergroupAddOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, Space, theme } from 'antd';
import React, { useContext, useEffect } from 'react';
import './css.css'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppContext from 'antd/es/app/context';
import { logOutAdmin } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';

const { Header, Content, Footer, Sider } = Layout;
// , LaptopOutlined, NotificationOutlined,
const items2 = [
	{
		id: 1,
		name: 'Thành viên',
		icon: UsergroupAddOutlined,
		path: '/admin/get'
	},
	{
		id: 2,
		name: 'Tài khoản',
		icon: UserOutlined,
		path: '/admin/user',
		children: [
			{
				id: 3,
				name: 'Hồ sơ',
				path: '/admin/profile'
			},
			{
				id: 4,
				name: 'Đổi mật khẩu',
				path: '/admin/change-password'
			}
		]
	},
	{
		id: 5,
		name: 'Danh mục',
		icon: LaptopOutlined,
		children: [
			{
				id: 6,
				name: 'Danh mục',
				path: '/admin/category'
			},
			{
				id: 7,
				name: 'Đồ',
				path: '/admin/item'
			},
			{
				id: 8,
				name: 'Màu',
				path: '/admin/color'
			},
			{
				id: 9,
				name: 'Size',
				path: '/admin/size'
			}
		]
	},
	{
		id: 10,
		name: 'Sản phẩm',
		icon: ShoppingOutlined,
		path: '/admin/product'
	},
	{
		id: 11,
		name: 'Tài khoản người dùng',
		icon: UsergroupDeleteOutlined,
		path: '/admin/usercustomer'
	}
].map( ( e ) => {
	return {
		key: e.id,
		name: e.name,
		path: e.path,
		icon: React.createElement( e.icon ),
		label: <NavLink style={ {
			textDecoration: 'none'
		} } to={ e.path }>{ e.name }</NavLink>,
		children: e?.children?.map( ( a, j ) => {
			return {
				key: a.id,
				path: a.path,
				label: <NavLink style={ {
					textDecoration: 'none',
					color: '#fff'
				} } to={ a.path }>{ a.name }</NavLink>,
			};
		} ),
	};
} );


const HeaderAdmin = () => {
	const items = [
		{
			key: '1',
			label: (
				<NavLink style={ {
					textDecoration: 'none'
				} } to={ '/admin/profile' }>
					Hồ sơ
				</NavLink>
			),
		},
		{
			key: '2',
			label: (
				<a onClick={ () => logOut() } style={ {
					textDecoration: 'none'
				} }>
					Đăng xuất
				</a>
			),
		},
	];

	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const location = useLocation()
	const user = useSelector( ( e ) => e?.auth?.login?.currentUser )
	const dispatch = useDispatch()
	let axiosJWT = createAxios( user, dispatch )
	// const { axiosJWT, dispatch } = useContext(AppContext)
	let check = []
	items2.find( ( e ) => {

		if ( e?.path === location?.pathname) {

			return check.push( e?.key?.toString() )
		} else {
			if ( e?.children?.find( ( a ) => a.path === location.pathname ) ) {
				e?.children?.find( ( a ) => {
					if ( a.path === location.pathname ) {
						return check.push( a.key?.toString() )
					}
				} )
			}
		}
	} );
	const navigate = useNavigate()
	const logOut = () => {
		logOutAdmin( user, axiosJWT, dispatch, navigate )
	}
	return (
		<Layout>
			<Header className="header">
				<Space direction="vertical">
					<Space wrap>
						<Dropdown
							menu={ {
								items,
							} }
							placement="bottom"
						>
							<Avatar style={ {
								cursor: "pointer"
							} } size="large" icon={ <UserOutlined/> }/>
						</Dropdown>
						<span style={ {
							color: '#ffff'
						} }>{ user?.data.name }</span>
					</Space>
				</Space>
			</Header>
			<Content
				style={ {
					padding: '0 20px',
					height: '1700px'
				} }
			>
				<Layout
					style={ {
						padding: '24px 0',
						margin: '16px 0',
						height: '1600px',
						background: colorBgContainer,
					} }
				>
					<Sider
						style={ {
							background: colorBgContainer,
						} }
						width={ 200 }
					>
						<Menu
							mode="inline"
							theme="dark"
							defaultSelectedKeys={ check }
							defaultOpenKeys={ check }
							style={ {
								height: '100%',

							} }
							items={ items2 }
						/>
					</Sider>

					<Content
						style={ {
							padding: 24,
							margin: 0,
							background: colorBgContainer,
							height: 1000
						} }
					>
						<Outlet/>
					</Content>
				</Layout>
			</Content>
			<Footer
				style={ {
					textAlign: 'center',
				} }
			>
				Ant Design ©2023 Created by Ant UED
			</Footer>
		</Layout>
	);
}

export default HeaderAdmin
