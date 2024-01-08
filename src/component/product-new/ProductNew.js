import {
	EyeOutlined,
	MinusOutlined,
	StarFilled,
	SyncOutlined,
	HeartOutlined,
	ShoppingOutlined,
	RightOutlined
} from "@ant-design/icons";
import { Carousel, Typography } from "antd";
import style from '../carousel_product/c_product.module.scss';
import clsx from "clsx";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const ProductNew = ( props ) => {
	const { productHome } = useContext( AppContext )
	if ( !props.number ) {
		var number = 4
	} else {
		number = props.number
	}
	const { Text, Link } = Typography;
	var settings = {
		slidesToShow: number,
		slidesToScroll: 1,
		dots: true,
		speed: 500,
		responsive: [
			{
				breakpoint: 2650,
				settings: {
					slidesToShow: number,
					slidesToScroll: 1,
					// infinite: true,
					// dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: number < 5 ? number - 1 : number - 2,
					slidesToScroll: 1,
					initialSlide: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: number < 5 ? number - 2 : number - 3,
					slidesToScroll: 1
				}
			}
		]
	};
	const navigate = useNavigate()
	const getDetailProduct = ( id ) => {
		navigate( `/detail/${ id }` )
	}

	return (
		<>
			<div dot={ true } className={ clsx( style.products ) }>
				<Carousel infinite={ false } autoplay  { ...settings }>
					{
						productHome?.slice( 0, 5 ).map( ( e ) => (
							<div key={ e.id }>
								<div className={ clsx( style.item ) }>
									<div className={ clsx( style.image ) }>
										<div
											onClick={ () => getDetailProduct( e.name.concat( " ", e.id ).split( ' ' ).join( '-' ) ) }>
											<img className={ clsx( style.img1, "card-img" ) }
												 src={ `/uploads/${ e?.image?.length > 0 ? e?.image[0]?.image : '' }` }
												 alt={ '' }></img>
											<img src={ `/uploads/${ e?.image?.length > 0 ? e?.image[1]?.image : '' }` }
												 className={ clsx( style.img2, "card-img" ) } alt="" decoding="async"
												 loading="lazy"/>
										</div>
										<div className={ clsx( style.desktop_icon, style.group_icon ) }>
											<div className={ style.icon }><EyeOutlined/></div>
											<div className={ style.icon }><SyncOutlined/></div>
											<div className={ style.icon }><HeartOutlined/></div>
											<div className={ style.icon }><ShoppingOutlined/></div>
										</div>
										{
											e.sale > 0 && <div className={ clsx( style.tags ) }>
												<span className={ clsx( style.bg ) }>Sale!</span>
												{/* <span>sale!</span> */ }
												<span>{ e.sale }%</span>
											</div>
										}


									</div>
									<div className={ clsx( style.mobile_icon, style.group_icon ) }>
										<div className={ style.icon }><EyeOutlined/></div>
										<div className={ style.icon }><SyncOutlined/></div>
										<div className={ style.icon }><HeartOutlined/></div>
										<div className={ style.icon }><ShoppingOutlined/></div>
									</div>
									<h4>{ e.name }</h4>
									<div className="d-flex justify-content-between">
										<p>
											{ e.sale > 0 && <><Text
												delete>{ e.price.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }₫
											</Text>
												<MinusOutlined style={ { width: "10px", overflow: 'hidden' } }/></> }
											{ e.sale > 0 ? ((e.sale / 100) * e.price).toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," ) : e.price }₫</p>
										<div className={ clsx( style.star ) }>
											<StarFilled/>
											<StarFilled/>
											<StarFilled/>
											<StarFilled/>
											<StarFilled/>
										</div>
									</div>
								</div>

							</div>
						) )
					}
				</Carousel>
			</div>

		</>
	)
}

export default ProductNew