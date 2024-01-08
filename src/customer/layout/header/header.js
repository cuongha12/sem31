import {
	DownOutlined,
	FileSearchOutlined,
	HeartOutlined,
	HomeOutlined,
	MenuUnfoldOutlined,
	SearchOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	SyncOutlined,
	UserOutlined
} from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Col, Drawer, Dropdown, Row, Space } from "antd";
import clsx from "clsx";
import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Btn_x from "../../../component/btn/btn_x";
import style from "./header.module.scss";
import CartDrawer from "./_drawer/cart/cart";
import CategoryDrawer from "./_drawer/category/category";
import Compare_drawer from "./_drawer/compare/compare";
import NavDrawer from "./_drawer/nav/nav";
import UserDrawer from "./_drawer/user/user";
import Wishlish_drawer from "./_drawer/wishlist/wishlist";
import { useSelector } from "react-redux";
import { AppContext } from "../../../Context/AppContext";
import { logOutAdmin, logOutUser } from "../../../redux/apiRequest";


function Header () {
	const [ openNav, setOpenNav ] = useState( false );
	const [ openCart, setOpenCart ] = useState( false );
	// const user = useSelector( ( e ) => e?.user?.login?.currentUser )
	let navigate = useNavigate()
	const { userCustomer, dispatch,axiosUser } = useContext( AppContext )
	const showDrawerNav = () => {
		setOpenNav( true );
	};

	const onCloseNav = () => {
		setOpenNav( false );
	};
	const showDrawerCart = ( tab ) => {
		navigate('/cart')
		// setTab_right( tab )
		// setOpenCart( true );
	};

	const onCloseCart = () => {
		setOpenCart( false );
	};

	const logOut = () => {
		logOutUser(userCustomer, axiosUser, dispatch, navigate)
	}
	const [ tab_right, setTab_right ] = useState( false )
	const [ tab_left, setTab_left ] = useState( false )
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
				<a style={ {
					textDecoration: 'none'
				} } onClick={logOut}>
					Đăng xuất
				</a>
			),
		}, ]
	const cart = useSelector( ( e ) => e?.cart?.cart?.currentCart )
	useEffect(()=>{

	},[cart])

	return (
		<>
			<div className={ clsx( style.header ) }>
				<div className={ clsx( "container-xxl", style.container_styler ) }>
					<Row justify="space-between" align='middle'>
						<Row align={ "middle" } style={ { padding: '0 1rem' } }>
							<MenuUnfoldOutlined onClick={ showDrawerNav }
												style={ { fontSize: "22px", cursor: "pointer" } }/>
							<Link to={ "/" } className={ clsx( style.logo ) }>
								styler
							</Link>
						</Row>

						<Row className={ clsx( style.menu, 'd-xl-flex', 'd-none' ) }>
							<div className={ clsx( style.item ) }>
								<Link to="/shop">Shop</Link>
							</div>
							<div className={ clsx( style.item ) }>
								<Link to="/shop">Category <i className="fa-solid fa-angle-down"></i></Link>
								<div className={ clsx( style.drop_menu ) }>
									<Row style={ { maxWidth: '1440px', margin: "0 auto" } }>
										<Col span={ 7 }>
											<div className={ clsx( style.left ) }>
												<h5 className={ clsx( style.title ) }>All Categories</h5>
												<p className={ clsx( style.item_cate ) }>Children</p>
												<p className={ clsx( style.item_cate ) }>Children</p>
												<p className={ clsx( style.item_cate ) }>Children</p>
												<p className={ clsx( style.item_cate ) }>Children</p>
												<p className={ clsx( style.item_cate ) }>Children</p>
												<p className={ clsx( style.item_cate ) }>Children</p>
												<Link to="/shop"
													  className={ clsx( style.btn_shop ) }><span>All Products <i
													className="fa-solid fa-chevron-right"></i></span> </Link>

											</div>
										</Col>
										<Col span={ 17 }>
											<Row gutter={ [ 15, 15 ] }>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>
												<Col md={ 6 } lg={ 4 } xl={ 4 }>
													<div className={ clsx( style.card ) }>
														<div className={ clsx( style.image ) }>
															<img
																src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-36-300x300.jpeg"
																alt=""/>
														</div>
														<div className={ clsx( style.card_title ) }>Women</div>
													</div>
												</Col>

											</Row>
										</Col>
									</Row>
								</div>
							</div>

							<div className={ clsx( style.item ) }>About Us</div>
							<div className={ clsx( style.item ) }>Contact</div>
						</Row>
						<div className={ clsx( style.header_right ) }>
							<Space>
								<div className={ clsx( style.header_icon, 'd-sm-flex', 'd-none' ) }><SearchOutlined/>
								</div>
								<Badge style={ { backgroundColor: '#daa174' } } count={cart?.length}>
									<div onClick={ () => showDrawerCart( 'cart' ) }
										 className={ clsx( style.header_icon ) }><ShoppingOutlined/></div>
								</Badge>
								<Badge style={ { backgroundColor: '#daa174' } } count="0">
									<div onClick={ () => showDrawerCart( 'wish' ) }
										 className={ clsx( style.header_icon ) }><HeartOutlined/></div>
								</Badge>
								<Badge style={ { backgroundColor: '#daa174' } } count="0">
									<div onClick={ () => showDrawerCart( 'compare' ) }
										 className={ clsx( style.header_icon ) }><SyncOutlined/></div>
								</Badge>
								{
									!userCustomer ? (<Badge className={ clsx( 'd-sm-flex', 'd-none' ) }
															style={ { backgroundColor: '#daa174' } } count="0">
										<div className={ clsx( style.header_icon ) }><UserOutlined/></div>
									</Badge>) : (<Dropdown
										menu={ {
											items,
										} }
										placement="bottom"
									>
										<Badge className={ clsx( 'd-sm-flex', 'd-none' ) }
											   style={ { backgroundColor: '#daa174' } } count="0">
											<div className={ clsx( style.header_icon ) }><UserOutlined/></div>
										</Badge>
									</Dropdown>)
								}
							</Space>
						</div>

					</Row>
				</div>
			</div>
			<div className={ clsx( style.nav_bottom, "d-xl-none", "d-flex" ) }>

				<div className={ clsx( style.item_bottom ) }>
					<HomeOutlined style={ { fontSize: "18px" } }/>
					<p>Home</p>
				</div>
				<div className={ clsx( style.item_bottom ) }>
					<ShopOutlined style={ { fontSize: "18px" } }/>
					<p>Store</p>
				</div>
				<div className={ clsx( style.item_bottom ) }>
					<FileSearchOutlined style={ { fontSize: "18px" } }/>
					<p>Categories</p>
				</div>
				<div className={ clsx( style.item_bottom ) }>
					<Badge className={ clsx( style.count ) } size={ 'small' } style={ { backgroundColor: '#daa174' } }
						   count="2">
						<ShoppingOutlined style={ { fontSize: "18px" } }/>
					</Badge>

					<p>Cart</p>
				</div>
				<div className={ clsx( style.item_bottom ) }>
					<SearchOutlined style={ { fontSize: "18px" } }/>
					<p>Search</p>
				</div>
				<div className={ clsx( style.item_bottom ) }>

					<UserOutlined style={ { fontSize: "18px" } }/>
					<p>Account</p>
				</div>


			</div>
			<Drawer
				// title="Drawer with extra actions"
				placement={ "left" }
				width={ window.innerWidth > 530 ? 530 : '100%' }
				onClose={ onCloseNav }
				closable={ false }
				open={ openNav }
				bodyStyle={ { padding: '0' } }
				maskStyle={ { backgroundColor: "#d5d5d573" } }
				// extra={
				//     <Space>
				//         <Button onClick={onCloseNav}>Cancel</Button>
				//         <Button type="primary" onClick={onCloseNav}>
				//             OK
				//         </Button>
				//     </Space>
				// }
			>

				<Row className={ clsx( style.nav ) }>
					<Col flex={ window.innerWidth >= 576 ? "80px" : "100%" }
						 className={ clsx( style.left_nav, 'd-sm-block', 'd-flex' ) }>
						<div className={ style.btn_x }>
							<p onClick={ onCloseNav }>
								<Btn_x></Btn_x>
							</p>
						</div>
						<div className={ clsx( style.icon_group, 'd-sm-block', 'd-flex', 'pt-sm-3', 'p-0' ) }>

							<div className={ clsx( style.nav_icon ) }>
								<Badge offset={ [ 0, 10 ] } style={ { backgroundColor: '#daa174' } } count="2">
									<div onClick={ () => setTab_left( ( t ) => t !== 'cart' ? 'cart' : false ) }
										 className={ clsx( style.item_icon ) }
										 style={ tab_left === 'cart' ? { backgroundColor: "#fff" } : {} }>
										<ShoppingOutlined/></div>
								</Badge>
							</div>
							<div className={ clsx( style.nav_icon ) }>
								<Badge offset={ [ 0, 10 ] } style={ { backgroundColor: '#daa174' } } count="0">
									<div onClick={ () => setTab_left( ( t ) => t !== 'wish' ? 'wish' : false ) }
										 className={ clsx( style.item_icon ) }
										 style={ tab_left === 'wish' ? { backgroundColor: "#fff" } : {} }>
										<HeartOutlined/></div>
								</Badge>
							</div>
							<div className={ clsx( style.nav_icon ) }>
								<Badge offset={ [ 0, 10 ] } style={ { backgroundColor: '#daa174' } } count="0">
									<div onClick={ () => setTab_left( ( t ) => t !== 'compare' ? 'compare' : false ) }
										 className={ clsx( style.item_icon ) }
										 style={ tab_left === 'compare' ? { backgroundColor: "#fff" } : {} }>
										<SyncOutlined/></div>
								</Badge>
							</div>
							<div className={ clsx( style.nav_icon ) }>
								<Badge offset={ [ 0, 10 ] } style={ { backgroundColor: '#daa174' } } count="0">
									<div onClick={ () => setTab_left( ( t ) => t !== 'category' ? 'category' : false ) }
										 className={ clsx( style.item_icon ) }
										 style={ tab_left === 'category' ? { backgroundColor: "#fff" } : {} }>
										<FileSearchOutlined/></div>
								</Badge>
							</div>
							<div className={ clsx( style.nav_icon ) }>

								<Badge offset={ [ 0, 10 ] } style={ { backgroundColor: '#daa174' } } count="0">
									<div
										onClick={ () => setTab_left( ( t ) =>
											t !== 'user' ? 'user' : false ) }
										className={ clsx( style.item_icon ) }
										style={ tab_left === 'user' ? { backgroundColor: "#fff" } : {} }>
										<UserOutlined/>
									</div>
								</Badge>
							</div>
						</div>
					</Col>
					<Col flex="auto" className={ clsx( style.right_nav ) }>
						{/* <div style={{ overflow: 'auto' }}> */ }
						<div className={ clsx( style.content_item, style.left_a, tab_left === 'cart' && style.show ) }>
							<CartDrawer/>
						</div>
						<div className={ clsx( style.content_item, style.left_a, tab_left === 'wish' && style.show ) }>
							<Wishlish_drawer/>
						</div>
						<div
							className={ clsx( style.content_item, style.left_a, tab_left === 'compare' && style.show ) }>
							<Compare_drawer/>
						</div>
						<div
							className={ clsx( style.content_item, style.left_a, tab_left === 'category' && style.show ) }>
							<CategoryDrawer/>
						</div>
						<div className={ clsx( style.content_item, style.left_a, tab_left === 'user' && style.show ) }>
							<UserDrawer/>
						</div>
						<div className={ clsx( style.content_item, style.left_a, tab_left === false && style.show ) }>
							<NavDrawer/>
						</div>

						{/* </div> */ }
					</Col>
				</Row>

			</Drawer>
			<Drawer
				placement={ "right" }
				width={ window.innerWidth > 460 ? 460 : '100%' }
				closable={ false }
				onClose={ onCloseCart }
				open={ openCart }
				maskStyle={ { backgroundColor: "#d5d5d573" } }
				bodyStyle={ {
					overflowX: "hidden",
					overflowY: 'scroll',
					padding: `${ window.innerWidth > 460 ? '24px' : '16px' }`
				} }
			>
				<div className={ clsx( style.drawer_right ) }>
					<div className={ clsx( style.drawer_rt ) }>

						<div className={ style.btn_x }>
							<p onClick={ onCloseCart }>
								<Btn_x></Btn_x>
							</p>
						</div>
						<div className={ clsx( style.icon_drawer_group ) }>
							<Badge offset={ [ -12, 4 ] } style={ { backgroundColor: '#daa174' } } count="2">
								<div onClick={ () => setTab_right( 'cart' ) }
									 style={ tab_right === 'cart' ? { backgroundColor: "#e9ecee" } : {} }
									 className={ clsx( style.icon_drawer ) }><ShoppingOutlined/></div>
							</Badge>
							<Badge offset={ [ -12, 4 ] } style={ { backgroundColor: '#daa174' } } count="2">
								<div onClick={ () => setTab_right( 'wish' ) }
									 style={ tab_right === 'wish' ? { backgroundColor: "#e9ecee" } : {} }
									 className={ clsx( style.icon_drawer ) }><HeartOutlined/></div>
							</Badge>
							<Badge offset={ [ -12, 4 ] } style={ { backgroundColor: '#daa174' } } count="0">
								<div onClick={ () => setTab_right( 'compare' ) }
									 style={ tab_right === 'compare' ? { backgroundColor: "#e9ecee" } : {} }
									 className={ clsx( style.icon_drawer ) }><SyncOutlined/></div>
							</Badge>

						</div>

					</div>
					<div className={ clsx( style.content_item, style.right_a, tab_right === 'cart' && style.show ) }>
						<CartDrawer/>
					</div>
					<div className={ clsx( style.content_item, style.right_a, tab_right === 'wish' && style.show ) }>
						<Wishlish_drawer/>
					</div>
					<div className={ clsx( style.content_item, style.right_a, tab_right === 'compare' && style.show ) }>
						<Compare_drawer/>
					</div>
				</div>

			</Drawer>

		</>
	);
}

export default Header;