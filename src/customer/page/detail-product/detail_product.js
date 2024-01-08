import { LeftOutlined } from "@ant-design/icons";
import {
	AppstoreOutlined,
	CalendarOutlined,
	FacebookFilled,
	FieldTimeOutlined,
	MinusOutlined,
	QuestionCircleOutlined,
	RightOutlined,
	SmileOutlined
} from "@ant-design/icons/lib/icons";
import {
	Breadcrumb,
	Button,
	Carousel,
	Col,
	Collapse,
	Image,
	Input,
	Progress,
	Radio,
	Rate,
	Row,
	Select,
	Space,
	Tooltip,
	Typography,
	message
} from "antd";
import clsx from "clsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import C_product from "../../../component/carousel_product/c_product";
import RateInput from "../../../component/rate/rate";
import style from './detail_product.module.scss';
import './custome.scss'
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import { AppContext } from "../../../Context/AppContext";
import { addProduct } from "../../../redux/apiRequest";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CartSuccess } from "../../../redux/CartSilce";

function DetailProduct () {
	const { userCustomer, dispatch, axiosUser } = useContext( AppContext )
	const { Text, Link } = Typography;
	const { Panel } = Collapse;
	const [ product, setProduct ] = useState( {} )
	const [ color, setColor ] = useState( [] )
	const [ size, setSize ] = useState( [] )
	const [ total, setTotal ] = useState( Number )
	const { id } = useParams()
	const [ count, setCount ] = useState( 1 )
	const [ variant, setVariant ] = useState( { colorId: '', sizeId: '' } )

	const getSize = async( idColor ) => {
		const idCheck = idColor.toString().concat( " ", product.id.toString() )
		setVariant( { ...variant, colorId: idColor } )
		return await axios.get( `/shop/size/${ idCheck }` )
			.then( ( res ) => {
				if ( res.data.status === 200 ) {
					setSize( res.data.data )
					setCount( 1 )
				} else {
					message.error( `${ res.data.mess }` )
				}
			} )
	}
	const getQuantity = ( value ) => {
		setVariant( { ...variant, sizeId: value } )
		size?.find( ( size ) => {
			if ( size.sizeId === value ) {
				setTotal( size.quantity )
				setCount( 1 )
			}
		} )
	}
	const updateCount = useCallback( ( type ) => {
		if ( type === '+' ) {
			if ( count === total ) {
				return
			}
			setCount( count + 1 )
		} else {
			if ( count === 1 ) {
				return
			}
			setCount( count - 1 )
		}
	}, [ count ] )
	const cart = useSelector( ( e ) => e?.cart?.cart?.currentCart )
	const navigate = useNavigate()
	const addToCart = () => {
		if ( !userCustomer ) {
			Swal.fire( {
				text: 'Vui lòng đăng nhập trước khi mua hàng',
				cancelButtonText: 'Không',
				showCancelButton: true,
				confirmButtonText: 'Có',
				confirmButtonColor: '#000',
				cancelButtonColor: 'red'
			} ).then( async( result ) => {
				/* Read more about isConfirmed, isDenied below */
				if ( result.isConfirmed ) {
					navigate( '/login' )
				}
			} )
		} else {
			if ( !variant.colorId || !variant.sizeId ) {
				message.error( 'Vui lòng chọn Phân loại hàng' )
			} else {
				const addCart = size.find( ( e ) => e.colorId === variant.colorId && e.sizeId === variant.sizeId )
				const newVariant = { ...addCart, product: product }

				const uniqueCart = {
					price: product?.sale > 0 ? ((product?.sale / 100) * product?.price) : product?.price,
					quantity: count,
					variantId: addCart?.id
				}
				addProduct( userCustomer, dispatch, axiosUser, uniqueCart, cart, newVariant )
				message.success( 'Thêm sản phẩm thành công' )
			}

		}
	}

	useEffect( () => {
		const getProduct = async() => {
			return await axios.get( `/shop/${ id }` )
				.then( ( res ) => {
					if ( res.data.status === 200 ) {
						setProduct( res.data.data )
						setTotal( res.data.sum )
					} else {
						message.error( `${ res.data.mess }` )
					}
				} )
		}
		getProduct()
		const getColor = async() => {
			return await axios.get( `/shop/color/${ id }` )
				.then( ( res ) => {
					if ( res.data.status === 200 ) {
						setColor( res.data.data )
					} else {
						message.error( `${ res.data.mess }` )
					}
				} )
		}
		getColor()
	}, [ id ] )
	const social = [
		{
			name: 'facebook-f',
			color: "#3b5998"
		},
		{
			name: 'twitter',
			color: "#1da1f2"
		},
		{
			name: 'pinterest',
			color: "#e60023"
		},
		{
			name: 'whatsapp',
			color: "#25d366"
		},
		{
			name: 'telegram',
			color: "#08c"
		},
		{
			name: 'viber',
			color: "#7360f2"
		},
		{
			name: 'vk',
			color: "#4c75a3"
		},
	]

	// Zoom image
	function onZoom ( e ) {
		// const img_df = document.getElementById("img_df")
		// const img_zoom = document.getElementById("img_zoom")
		// const offset = img_df.offsetParent.offsetParent.offsetParent.offsetParent

		// let x = `${((e.pageX + 1 - offset.offsetLeft) / img_df.clientWidth) * 100}%`;
		// let y = `${((e.pageY + 1 - offset.offsetTop) / img_df.clientHeight) * 100}%`;
		// img_zoom.style.backgroundPosition = `${x} ${y}`
		// console.log(x, y);
		// document.getElementById('preview').click()
		const img_df = document.querySelectorAll( "#img_df" )
		const img_zoom = document.querySelectorAll( "#img_zoom" )
		for ( let i = 0; i < img_df.length; i++ ) {
			const offset = img_df[i].offsetParent.offsetParent.offsetParent.offsetParent

			let x = `${ ((e.pageX + 1 - offset.offsetLeft) / img_df[i].clientWidth) * 100 }%`;
			let y = `${ ((e.pageY + 1 - offset.offsetTop) / img_df[i].clientHeight) * 100 }%`;
			img_zoom[i].style.backgroundPosition = `${ x } ${ y }`
		}

		// console.log(e);
		// console.log(`${((e.pageX + 1 - offset.offsetLeft) / img_df.clientWidth) * 100}%`, `${((e.pageY + 1 - offset.offsetTop) / img_df.clientHeight) * 100}%`,);
	}

	// End Zoom image
	return (
		<>
			<div className={ style.head }>
				<div className={ style.breadcrumb }>
					<Breadcrumb separator=">">
						<Breadcrumb.Item>
							<Link to='' style={ { textDecoration: 'none' } }>Home</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<Link to='' style={ { textDecoration: 'none' } }>Product</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<Link to='' style={ { textDecoration: 'none' } }>Name</Link>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className={ style.product_nav }>
					<div className={ style.icon }>
						<LeftOutlined/>
						<div className={ style.product_show }>
							<img
								src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-46.jpeg"
								alt="" width={ 40 }></img>
							<p>The Oversized Alpaca Crew</p>
						</div>
					</div>
					<div className={ style.icon }>
						<AppstoreOutlined/>
					</div>
					<div className={ style.icon }>
						<RightOutlined/>
						<div className={ style.product_show }>
							<img
								src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-46.jpeg"
								alt="" width={ 40 }></img>
							<p>The Oversized Alpaca Crew</p>
						</div>
					</div>

				</div>
			</div>
			<div className={ style.detail_product }>
				<div className={ style.content_modal }>
					<Row>
						<Col xl={ 12 } md={ 12 } sm={ 12 } xs={ 24 }>
							<div className={ clsx( style.image ) }>
								<Carousel arrows={ true } dots={ true }>
									{
										product?.image?.map( ( e ) => (
											<div key={ e.id }>
												{/* <div onMouseMove={onZoom} id={'img_df'} className={style.image_main}>
                                                    <img className="card-img" src={`/uploads/${e.image}`} />
                                                    <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: `url(/uploads/${e.image})` }}></div>
                                                </div> */ }
												<div onMouseMove={ onZoom } id={ 'img_df' }
													 className={ style.image_main }>
													<img className="card-img" src={ `/uploads/${ e.image }` }/>
													<div id="img_zoom" className={ clsx( style.image_zoom ) }
														 style={ { backgroundImage: `url(/uploads/${ e.image })` } }></div>
													<Image
														width={ 100 }
														preview={ true }
														id='preview'
														style={ {
															opacity: 0,
															position: "absolute",
															zIndex: '-100',
															display: "none"
														} }
														src={ `/uploads/${ e.image }` }
													/>
												</div>
											</div>
										) )
									}
									{/* <div>
                                        <div onMouseMove={onZoom} id={'img_df'} className={style.image_main}>
                                            <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
                                            <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: "url(https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg)" }}></div>
                                            <Image
                                                width={100}
                                                preview={true}
                                                id='preview'
                                                style={{ opacity: 0, position: "absolute", zIndex: '-100', display: "none" }}
                                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div onMouseMove={onZoom} id={'img_df'} className={style.image_main}>
                                            <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-125.jpeg" />
                                            <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: "url(https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-125.jpeg)" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div onMouseMove={onZoom} id={'img_df'} className={style.image_main}>
                                            <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
                                            <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: "url(https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg)" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div onMouseMove={onZoom} id={'img_df'} className={style.image_main}>
                                            <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
                                            <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: "url(https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg)" }}></div>
                                        </div>
                                    </div> */ }

								</Carousel>
							</div>
						</Col>
						<Col xl={ 12 } md={ 12 } sm={ 12 } xs={ 24 }>
							<div className={ clsx( style.text ) }>
								<h3 className={ style.name }>{ product?.name }</h3>
								<div className={ style.price }>
                                    <span>{ product?.sale > 0 && <>
										<Text
											delete>{ product?.price?.toString()?.replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }₫</Text><MinusOutlined
										style={ { width: "10px", overflow: 'hidden' } }/></> }

                                    </span>
									{ product?.sale > 0 ? ((product?.sale / 100) * product?.price)?.toString()?.replace( /\B(?=(\d{3})+(?!\d))/g, "," ) : product?.price?.toString()?.replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }₫
								</div>
								<p className={ style.desc }>Safer For The Environment: Our denim factory partner
									recycles 98% of their water using reverse osmosis filtration and keeps byproducts
									out of the environment by mixing them with concrete to create building
									materials.</p>
								<div className={ clsx( style.select ) }>
									<b>Color:</b>
									{/* <div className={style.item}>Blue</div>
                                    <div className={style.item}>Brown</div> */ }
									<Radio.Group
										style={ {
											marginLeft: 10
										} }
										onChange={ ( e ) => getSize( e.target.value ) }
									>
										{
											color?.map( ( e ) => (
												<Radio.Button style={ {
													marginRight: 10
												} } key={ e.id } value={ e.color.id }>{ e.color.name }</Radio.Button>
											) )
										}
									</Radio.Group>
								</div>
								<div className={ clsx( style.select ) }>
									<b>Sizes:</b>
									{/* <div className={style.item}>XL</div>
                                    <div className={style.item}>SM</div> */ }
									<Radio.Group style={ {
										marginLeft: 10
									} }
												 onChange={ ( e ) => getQuantity( e.target.value ) }
									>
										{
											size?.map( ( e ) => (
												<Radio.Button style={ {
													marginRight: 10
												} } key={ e.id } value={ e.size.id }>{ e.size.name }</Radio.Button>
											) )
										}
									</Radio.Group>
								</div>
								<div className='d-flex align-items-center pt-sm-0 pt-2'
									 style={ { justifyContent: "space-between" } }>
									<b>Số lượng</b>
									<div className={ style.input_number }>
										<span onClick={ () => updateCount( '-' ) }><MinusOutlined
											style={ { fontSize: "13px", verticalAlign: "middle" } }/></span>
										{/* <input type='number' id={'ip_number' + 1} value={1} /> */ }
										<Input className={ style.input }
											   type='number'
											   value={ count }
											   onChange={ ( e ) => {
												   if ( Number( e.target.value ) === total || Number( e.target.value ) > total ) {
													   setCount( total )
												   } else {
													   setCount( Number( e.target.value ) )
												   }

											   } }
										/>

										<span onClick={ () => updateCount( '+' ) }>+</span>
									</div>
									<div>{ total } sản phẩm có sẵn</div>
									{/* <div><DeleteOutlined style={{ verticalAlign: "middle", cursor: 'pointer' }} /></div> */ }
								</div>
								{ count === total &&
									<Text type="danger">Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này</Text> }
								<a href={ false } className={ clsx( style.btn_shop ) } onClick={ addToCart }><span>Add To Cart</span>
								</a>
								<Collapse defaultActiveKey={ [ '1' ] }
										  expandIconPosition="right"
										  style={ {
											  backgroundColor: "#fff",
											  borderRadius: "0",
											  borderBottom: "1px solid #e9e9e9"
										  } }
										  bordered={ false }
										  expandIcon={ ( { isActive } ) => <RightOutlined
											  rotate={ isActive ? '-90' : '90' }/> }
								>
									<Panel header={ <p className={ style.desc_title }>Description</p> }
										   style={ { border: "1px solid #e9e9e9", borderBottom: "none" } } key="1">
										A dog is a type of domesticated animal.
										Known for its loyalty and faithfulness,
										it can be found as a welcome guest in many households across the world.
									</Panel>
									<Panel header={ <p className={ style.desc_title }>Additional information</p> }
										   style={ { border: "1px solid #e9e9e9", borderBottom: "none" } } key="2">
										A dog is a type of domesticated animal.
										Known for its loyalty and faithfulness,
										it can be found as a welcome guest in many households across the world.
									</Panel>
									<Panel header={ <p className={ style.desc_title }>Q & A</p> }
										   style={ { border: "1px solid #e9e9e9", borderBottom: "none" } } key="3">
										A dog is a type of domesticated animal.
										Known for its loyalty and faithfulness,
										it can be found as a welcome guest in many households across the world.
									</Panel>
									<Panel header={ <p className={ style.desc_title }>Unlimited Tabs</p> }
										   style={ { border: "1px solid #e9e9e9", borderBottom: "none" } } key="4">
										A dog is a type of domesticated animal.
										Known for its loyalty and faithfulness,
										it can be found as a welcome guest in many households across the world.
									</Panel>
								</Collapse>
								<div className={ style.summary }>
									<div className={ style.item_summary }>
										<FieldTimeOutlined/> <p>Delivery & Return</p>
									</div>
									<div className={ style.item_summary }>
										<QuestionCircleOutlined/> <p>Size Guide</p>
									</div>
									<div className={ style.item_summary }>
										<CalendarOutlined/> <p>Estimated Delivery: Jan 24 Jan 28</p>
									</div>
									<div className={ style.item_summary }>
										<SmileOutlined/> <p>45 people are viewing this right now</p>
									</div>
								</div>
								<div className={ style.category }>
									<div className={ style.item }>
										<b>Categories: </b>
										<span>Denim, </span>
										<span>Men, </span>
										<span>Shirts </span>
									</div>
									<div className={ style.item }>
										<b>Tags: </b>
										<span>Bestseller, </span>
										<span>Trend </span>
									</div>
									<div className={ style.item }>
										<b>Brands: </b>
										<span>Adidas, </span>
										<span>Loft, </span>
										<span>Nike </span>

									</div>
									<div className={ clsx( style.item, 'mt-4' ) }>
										<b>Share: </b>
										{ social.map( ( item, index ) => {
											return (<Tooltip key={ index } style={ { borderRadius: "0" } }
															 title={ item.name }>
												<div className={ style.social }
													 style={ { backgroundColor: item.color } }>
													<div className={ style.social_item }>
														<i className={ `fa-brands fa-${ item.name }` }></i>
													</div>
												</div>
											</Tooltip>)
										} )
										}

									</div>
								</div>

							</div>
						</Col>
					</Row>


				</div>
				<div className={ style.suggest_product }>
					<h4>You May Also Like</h4>
					<C_product number={ 5 }></C_product>
				</div>
				<div className={ style.suggest_product }>
					<h4>Viewers Also Liked</h4>
					<C_product number={ 5 }></C_product>
				</div>
			</div>
			<div className={ style.rating }>
				<h4>2 reviews for The Blue Chunky Beanie</h4>
				<div className={ style.comment }>
					<Row gutter={ 16 } align="middle">
						<Col sm={ 12 } span={ 24 }>
							<div className={ style.avg_rate }>
								<h3 className={ style.point }>5.0</h3>
								<Rate disabled defaultValue={ 5 } className={ style.star }/>
								<p>Based on 2 reviews</p>
							</div>
						</Col>
						<Col sm={ 12 } span={ 24 }>
							<div className={ style.list_rate }>
								<ul>
									<li>
										<p className="w-25">5 star</p>
										<div className="w-75">
											<RateInput num={ 30 }/>
										</div>
										<p className="w-25 text-end">30%</p>

									</li>
									<li>
										<p className="w-25">5 star</p>
										<div className="w-75">
											<RateInput num={ 30 }/>
										</div>
										<p className="w-25 text-end">30%</p>

									</li>
									<li>
										<p className="w-25">5 star</p>
										<div className="w-75">
											<RateInput num={ 30 }/>
										</div>
										<p className="w-25 text-end">30%</p>

									</li>
									<li>
										<p className="w-25">5 star</p>
										<div className="w-75">
											<RateInput num={ 30 }/>
										</div>
										<p className="w-25 text-end">30%</p>

									</li>
									<li>
										<p className="w-25">5 star</p>
										<div className="w-75">
											<RateInput num={ 30 }/>
										</div>
										<p className="w-25 text-end">30%</p>

									</li>
								</ul>
							</div>
						</Col>
					</Row>


				</div>
				<div className={ style.show_comment }>
					<div className="d-flex justify-content-between">
						<Select
							bordered={ false }
							defaultValue="lucy"
							style={ {
								width: 120,
							} }
							// onChange={handleChange}
							options={ [
								{
									value: 'jack',
									label: 'Jack',
								},
								{
									value: 'lucy',
									label: 'Lucy',
								},
								{
									value: 'Yiminghe',
									label: 'yiminghe',
								},

							] }
						/>
						<a name="" id="" class="btn btn-primary" className={ style.add } href="#" role="button">Add a
							review</a>
					</div>
					<div className={ style.item_comment }>

					</div>
				</div>
			</div>
		</>
	);
}

export default DetailProduct;