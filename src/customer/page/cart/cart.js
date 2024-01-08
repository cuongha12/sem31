import { CloseOutlined, DeleteOutlined, MinusOutlined } from '@ant-design/icons';
import { Col, Divider, Input, Row } from 'antd';
import clsx from 'clsx';
import C_product from '../../../component/carousel_product/c_product';
// import IpNumber from '../../../component/inputNumber/ipNumber';
import style from './cart.module.scss'

import { AppContext } from "../../../Context/AppContext";
import { useContext, useEffect } from "react";
import { getCart, updateProduct } from "../../../redux/apiRequest";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Cart () {
	const { userCustomer, dispatch, axiosUser } = useContext( AppContext )
	const cart = useSelector( ( e ) => e?.cart?.cart?.currentCart )
	const acTionCart = ( type, id ) => {
		updateProduct( userCustomer, dispatch, axiosUser, type, id, cart )
	}
	const totalCart = cart.reduce( ( a, b ) => a + (b.quantity * b.price), 0 ) || 0
	const shipping = 50000

	return (
		<>
			{
				cart.length > 0 ? (
					<>
						<div style={ { backgroundColor: "#f8f9fa", height: '80px' } }>
							<div className={ clsx( style.title ) } style={ { padding: "0 1rem" } }>
								<h2>Cart</h2>
								<span className={ style.redirect }>
                        Home
                        <span style={ {
							width: '5px',
							margin: '0 10px',
							height: "5px",
							borderRadius: "50%",
							backgroundColor: "#e2e2e2",
							display: "inline-block",
							verticalAlign: "middle"
						} }></span>
                        Cart
                    </span>
							</div>
						</div>
						<div className={ style.cart }>
							<Row>
								<Col lg={ 16 } span={ 24 }>
									<div className={ clsx( style.list, 'pe-lg-3 pe-0' ) }>
										{/*<div className={style.item}>*/ }
										{/*    <Row align='middle'>*/ }
										{/*        <Col sm={12} span={24}>*/ }
										{/*            <div className='d-flex align-items-center'>*/ }
										{/*                <div className={style.image}>*/ }
										{/*                    <img src='https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-83-80x80.jpeg' alt=''></img>*/ }
										{/*                </div>*/ }
										{/*                <div className={clsx(style.content, 'ps-4')}>*/ }
										{/*                    <p className={style.name}>The Air Scoop-Neck Tee</p>*/ }
										{/*                    <span style={{ color: "#7a7a7a" }}>$189.00</span>*/ }
										{/*                    <span style={{ fontSize: "20px" }}> x </span>*/ }
										{/*                    <span>1</span>*/ }
										{/*                </div>*/ }
										{/*            </div>*/ }
										{/*        </Col>*/ }
										{/*        <Col sm={12} span={24}>*/ }
										{/*            <div className='d-flex align-items-center pt-sm-0 pt-2' style={{ justifyContent: "space-between" }}>*/ }
										{/*                <div className={style.input_number}>*/ }
										{/*                    <span onClick={() => quantity('-', 1)}><MinusOutlined style={{ fontSize: "13px", verticalAlign: "middle" }} /></span>*/ }
										{/*                    <input type='number' id={'ip_number' + 1} value={1} />*/ }
										{/*                    <span onClick={() => quantity('+', 1)}>+</span>*/ }
										{/*                </div>*/ }
										{/*                <div>$189.00</div>*/ }
										{/*                <div><DeleteOutlined style={{ verticalAlign: "middle", cursor: 'pointer' }} /></div>*/ }
										{/*            </div>*/ }
										{/*        </Col>*/ }
										{/*    </Row>*/ }
										{/*</div>*/ }
										{
											cart?.map( ( e ) => (
												<div className={ style.item } key={ e.id }>
													<Row align='middle'>
														<Col sm={ 12 } span={ 24 }>
															<div className='d-flex align-items-center'>
																<div className={ style.image }>
																	<img style={ {
																		width: 100
																	} }
																		 src={ `/uploads/${ e?.variant?.product?.image?.length > 0 ? e?.variant?.product?.image[0]?.image : '' }` }
																		 alt=''></img>
																</div>
																<div className={ clsx( style.content, 'ps-4' ) }>
																	<p className={ style.name }>{ e?.variant?.product?.name }</p>
																	<span
																		style={ { color: "#7a7a7a" } }>{ e?.price?.toString()?.replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }₫</span>
																	<span style={ { fontSize: "20px" } }> x </span>
																	<span>{ e?.quantity }</span>
																</div>
																<div className={ clsx( style.content, 'ps-4' ) }>
																	<p className={ style.name }>Phân loại hàng</p>
																	<div>
																		<span
																			style={ { color: "#7a7a7a" } }>Màu :</span>
																		<span> { e?.variant?.color?.name } </span>
																	</div>
																	<div>
																		<span
																			style={ { color: "#7a7a7a" } }>Size :</span>
																		<span> { e?.variant?.size?.name } </span>
																	</div>
																</div>
															</div>
														</Col>
														<Col sm={ 12 } span={ 24 }>
															<div className='d-flex align-items-center pt-sm-0 pt-2'
																 style={ { justifyContent: "space-between" } }>
																<div className={ style.input_number }>
														<span
															onClick={ () => acTionCart( 'minus', e.id ) }><MinusOutlined
															style={ {
																fontSize: "13px",
																verticalAlign: "middle"
															} }/></span>
																	<input type='number' value={ e?.quantity }/>
																	<span
																		onClick={ () => acTionCart( 'plus', e.id ) }>+</span>
																</div>
																<div>{ (e?.price * e?.quantity).toString()?.replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }₫</div>
																<div><DeleteOutlined
																	style={ {
																		verticalAlign: "middle",
																		cursor: 'pointer'
																	} } onClick={ () => acTionCart( 'delete', e.id ) }/></div>
															</div>
														</Col>
													</Row>
												</div>

											) )
										}
										{/*<div className={style.item}>*/ }
										{/*    <Row align='middle'>*/ }
										{/*        <Col sm={12} span={24}>*/ }
										{/*            <div className='d-flex align-items-center'>*/ }
										{/*                <div className={style.image}>*/ }
										{/*                    <img src='https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-83-80x80.jpeg' alt=''></img>*/ }
										{/*                </div>*/ }
										{/*                <div className={clsx(style.content, 'ps-4')}>*/ }
										{/*                    <p className={style.name}>The Air Scoop-Neck Tee</p>*/ }
										{/*                    <span style={{ color: "#7a7a7a" }}>$189.00</span>*/ }
										{/*                    <span style={{ fontSize: "20px" }}> x </span>*/ }
										{/*                    <span>1</span>*/ }
										{/*                </div>*/ }
										{/*            </div>*/ }
										{/*        </Col>*/ }
										{/*        <Col sm={12} span={24}>*/ }
										{/*            <div className='d-flex align-items-center pt-sm-0 pt-2' style={{ justifyContent: "space-between" }}>*/ }
										{/*                <div className={style.input_number}>*/ }
										{/*                    <span onClick={() => quantity('-', 1)}><MinusOutlined style={{ fontSize: "13px", verticalAlign: "middle" }} /></span>*/ }
										{/*                    <input type='number' id={'ip_number' + 1} value={1} />*/ }
										{/*                    <span onClick={() => quantity('+', 1)}>+</span>*/ }
										{/*                </div>*/ }
										{/*                <div>$189.00</div>*/ }
										{/*                <div><DeleteOutlined style={{ verticalAlign: "middle", cursor: 'pointer' }} /></div>*/ }
										{/*            </div>*/ }
										{/*        </Col>*/ }
										{/*    </Row>*/ }
										{/*</div>*/ }
										<div className={ style.coupon }>
											<input type={ 'text' } placeholder="Coupon Code"/>
											<a name="" id="" className="btn btn-primary" href="#" role="button">Apply
												Coupon</a>
										</div>
									</div>
								</Col>

								<Col lg={ 8 } span={ 24 }>
									<div className={ clsx( style.total, 'mt-lg-0 mt-5' ) }>
										<h5>Tổng số giỏ hàng</h5>
										<div className='d-flex justify-content-between'>
											<span>Thành tiền</span>
											<b>{ totalCart.toString()?.replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }₫</b>

										</div>
										<div style={ {
											backgroundColor: '#f8f9fa',
											padding: ' 8px',
											marginBottom: '8px'
										} }>
											{/*<div className='d-flex justify-content-between'>*/ }
											{/*	<span>Shipping</span><b></b>*/ }
											{/*</div>*/ }
											<div className='d-flex justify-content-between'>
												<span>Phí vận chuyển:</span><b>{ shipping.toString()?.replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }₫</b>
											</div>
											{/*<div className=''>*/ }
											{/*	<span>Shiping to </span><b>NY</b>*/ }
											{/*</div>*/ }
											{/*<div className=''>*/ }
											{/*	<span>Change Address</span><b></b>*/ }
											{/*</div>*/ }
										</div>
										<div className='d-flex justify-content-between'>
											<span>Tổng thanh toán</span>
											<b>{ (totalCart + shipping).toString()?.replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }₫</b>
										</div>
										<a name="" id="" className={ clsx( style.btn_checkout, 'btn' ) } href="#"
										   role="button">Process
											To Checkout</a>
									</div>
								</Col>
							</Row>

						</div>
					</>
				) : (
					<div className={style.contentPage}>
						<div className='container'>
							<div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
								<div className={style.cartEmpty}>
									<img src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/empty-cart.png?1661616129384" alt={''} className="img-responsive center-block" />
									<div className={style.btnCartEmpty}>
										<NavLink className={style.buttondefault} title="Tiếp tục mua sắm" to={'/shop'}>
											Tiếp tục mua sắm
										</NavLink>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}


		</>
	);
}

export default Cart;