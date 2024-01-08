import Banner from "./banner/banner";
import style from './home.module.scss';
import clsx from "clsx";
import { Button, Carousel, Col, Divider, Modal, Row, Tabs, Typography } from "antd";
import C_product from "../../../component/carousel_product/c_product";
import Footer from "../../layout/footer/footer";
import { useState } from "react";
import Btn_x from "../../../component/btn/btn_x";
import { MinusOutlined } from "@ant-design/icons";
import ProductNew from "../../../component/product-new/ProductNew";
import ProductSale from "../../../component/productsale/ProductSale";
function Home() {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { Text, Link } = Typography;

    var settings_articles = {
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 2650,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    var settings_insta = {
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 2650,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <Banner />
            <div style={{ maxWidth: "1580px", margin: "0 auto" }}>
                <Row className={clsx(style.trends)}>
                    <Col lg={6} md={12} className={clsx(style.item, style.text)}>
                        <div>
                            <span>2022 winter trends</span>
                            <h3>Check New Trends</h3>
                            <p>Cardigan helvetica sriracha, portland celiac truffaut woke artisan succulents cred art party slow-carb pinterest. Migas humblebrag chicharrones everyday carry four loko der panth overlay...</p>
                        </div>

                    </Col>
                    <Col lg={6} sm={12} xs={24} span={24}>
                        <div className={clsx(style.item, style.image)}>
                            <img className={'card-img'} src='https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/09/banner-name-5-e1631633509950-500x500.jpeg'></img>
                            <div className={clsx(style.content)}>
                                <span>Women</span>
                                <h4>New Women Shoes</h4>
                                <p>16 Products</p>
                            </div>
                        </div>

                    </Col>
                    <Col lg={6} sm={12} xs={24} span={24}>
                        <div className={clsx(style.item, style.image)}>
                            <img className={'card-img'} src='https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/09/banner-name-4-e1631633328983-500x500.jpeg'></img>
                            <div className={clsx(style.content)}>
                                <span>Women</span>
                                <h4>New Women Shoes</h4>
                                <p>16 Products</p>
                            </div>
                        </div>

                    </Col>
                    <Col lg={6} sm={12} xs={24} span={24}>
                        <div className={clsx(style.item, style.image)}>
                            <img className={'card-img'} src='https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/09/slide-name-4-500x500.jpg'></img>
                            <div className={clsx(style.content)}>
                                <span>Women</span>
                                <h4>New Women Shoes</h4>
                                <p>16 Products</p>
                            </div>
                        </div>

                    </Col>
                </Row>
                <Divider></Divider>

                <div className={style.collections}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>Sản phẩm nổi bật</h3>
                        {/* <p>Cardigan helvetica sriracha, portland celiac truffaut</p> */}
                    </div>
                    <C_product></C_product>
                </div>
                <Divider></Divider>

                <div className={style.collections} style={{ marginTop: "120px" }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>Sản phẩm mới nhất</h3>
                        {/* <p>Cardigan helvetica sriracha, portland celiac truffaut</p> */}
                    </div>
                    <ProductNew number={5}></ProductNew>
                </div>
                <Divider></Divider>

                <div className={style.collections} style={{ minHeight: "440px" }} >
                    <div style={{ textAlign: 'center' }}>
                        <h3>Sản phẩm giảm giá</h3>
                        {/* <p>Cardigan helvetica sriracha, portland celiac truffaut</p> */}

                    </div>
                    <ProductSale number={5}></ProductSale>
                    {/* <Tabs
                        defaultActiveKey="1"
                        centered
                        tabBarStyle={{ fontSize: '16px' }}
                        // size={'large'}
                        items={
                            [
                                {
                                    label: `Men`,
                                    key: 1,
                                    children: <C_product number={5}></C_product>,
                                },
                                {
                                    label: `Women`,
                                    key: 2,
                                    children: <C_product number={5}></C_product>,
                                },
                            ]

                        }
                    /> */}

                </div>

            </div>
            <div className={style.comment}>
                <div className={style.c_comment}>
                    <Carousel autoplay style={{ padding: "60px 0" }}>
                        <div>
                            <p>This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. Duis aute lorem ipsum is simply free text irure dolor in reprehenderit </p>
                            <Row className={style.author} justify="center" align="middle">
                                <Col >
                                    <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/avatar-3-80x80.jpg"></img>
                                </Col>
                                <Col style={{ verticalAlign: "middle" }} className="d-flex align-items-center">

                                    <div>
                                        <h4>Jessica Brown</h4>
                                        <small>Customer</small>
                                    </div>

                                </Col>

                            </Row>

                        </div>
                        <div>
                            <p>This is due to their excellent service, competitive pricing and customer support. It’s throughly refresing to get such a personal touch. Duis aute lorem ipsum is simply free text irure dolor in reprehenderit </p>
                            <Row className={style.author} justify="center" align="middle">
                                <Col >
                                    <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/avatar-3-80x80.jpg"></img>
                                </Col>
                                <Col style={{ verticalAlign: "middle" }} className="d-flex align-items-center">

                                    <div>
                                        <h4>Jessica Brown</h4>
                                        <small>Customer</small>
                                    </div>

                                </Col>

                            </Row>

                        </div>
                    </Carousel>
                </div>
            </div>
            {/* <div style={{ maxWidth: "1580px", margin: "0 auto" }}>
                <div className={style.collections}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>Trend Products Of The Week</h3>
                        <p>Cardigan helvetica sriracha, portland celiac truffaut</p>
                    </div>
                    <C_product number={5}></C_product>
                </div>
            </div> */}
            {/* <div className={style.articles}>
                <div style={{ maxWidth: "1580px", margin: "0 auto", padding: "32px 0" }}>

                    <div className={style.collections}>
                        <div style={{ textAlign: 'center' }}>
                            <h3>Current Articles From Styler</h3>
                            <p>Cardigan helvetica sriracha, portland celiac truffaut</p>
                        </div>
                        <Carousel
                            autoplay
                            style={{ padding: "60px 0" }}
                            {...settings_articles}
                        >
                            <div>
                                <div className={style.item}>
                                    <div className={style.image}>
                                        <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/09/slide-name-3-370x370.jpg"></img>
                                    </div>
                                    <div style={{ padding: "20px" }}>
                                        <small className="text-uppercase">
                                            <span> Admin</span> september 9, 2021
                                        </small>
                                        <h4>Winter dark mode women modern shoes</h4>
                                        <small>Take all negative words out of your mental dictionary and focus on the solutions with…</small>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={style.item}>
                                    <div className={style.image}>
                                        <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/09/slide-name-3-370x370.jpg"></img>
                                    </div>
                                    <div style={{ padding: "20px" }}>
                                        <small className="text-uppercase">
                                            <span> Admin</span> september 9, 2021
                                        </small>
                                        <h4>Winter dark mode women modern shoes</h4>
                                        <small>Take all negative words out of your mental dictionary and focus on the solutions with…</small>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={style.item}>
                                    <div className={style.image}>
                                        <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/09/slide-name-3-370x370.jpg"></img>
                                    </div>
                                    <div style={{ padding: "20px" }}>
                                        <small className="text-uppercase">
                                            <span> Admin</span> september 9, 2021
                                        </small>
                                        <h4>Winter dark mode women modern shoes</h4>
                                        <small>Take all negative words out of your mental dictionary and focus on the solutions with…</small>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={style.item}>
                                    <div className={style.image}>
                                        <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/09/slide-name-3-370x370.jpg"></img>
                                    </div>
                                    <div style={{ padding: "20px" }}>
                                        <small className="text-uppercase">
                                            <span> Admin</span> september 9, 2021
                                        </small>
                                        <h4>Winter dark mode women modern shoes</h4>
                                        <small>Take all negative words out of your mental dictionary and focus on the solutions with…</small>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={style.item}>
                                    <div className={style.image}>
                                        <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/09/slide-name-3-370x370.jpg"></img>
                                    </div>
                                    <div style={{ padding: "20px" }}>
                                        <small className="text-uppercase">
                                            <span> Admin</span> september 9, 2021
                                        </small>
                                        <h4>Winter dark mode women modern shoes</h4>
                                        <small>Take all negative out of your mental dictionary and focus on the solutions with…</small>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div> */}

            {/* <div style={{ maxWidth: "1580px", margin: "0 auto", padding: "32px 0" }}>

                <div className={clsx(style.collections, style.insta)}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>Follow On Instagram</h3>
                        <p>Cardigan helvetica sriracha, portland celiac truffaut</p>
                    </div>
                    <Carousel
                        autoplay
                        style={{ padding: "40px 0" }}
                        {...settings_insta}
                    >
                        <div>
                            <div className={style.insta_item}>
                                <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/personal-img-13-370x370.jpg" />
                                <img src="https://img.icons8.com/fluency/48/null/instagram-new.png"></img>
                            </div>
                        </div>
                        <div>
                            <div className={style.insta_item}>
                                <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/personal-img-13-370x370.jpg" />
                                <img src="https://img.icons8.com/fluency/48/null/instagram-new.png"></img>
                            </div>
                        </div>
                        <div>
                            <div className={style.insta_item}>
                                <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/personal-img-13-370x370.jpg" />
                                <img src="https://img.icons8.com/fluency/48/null/instagram-new.png"></img>
                            </div>
                        </div>
                        <div>
                            <div className={style.insta_item}>
                                <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/personal-img-13-370x370.jpg" />
                                <img src="https://img.icons8.com/fluency/48/null/instagram-new.png"></img>
                            </div>
                        </div>
                        <div>
                            <div className={style.insta_item}>
                                <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/personal-img-13-370x370.jpg" />
                                <img src="https://img.icons8.com/fluency/48/null/instagram-new.png"></img>
                            </div>
                        </div>
                        <div>
                            <div className={style.insta_item}>
                                <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/personal-img-13-370x370.jpg" />
                                <img src="https://img.icons8.com/fluency/48/null/instagram-new.png"></img>
                            </div>
                        </div>
                        <div>
                            <div className={style.insta_item}>
                                <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/personal-img-13-370x370.jpg" />
                                <img src="https://img.icons8.com/fluency/48/null/instagram-new.png"></img>
                            </div>
                        </div>
                        <div>
                            <div className={style.insta_item}>
                                <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/personal-img-13-370x370.jpg" />
                                <img src="https://img.icons8.com/fluency/48/null/instagram-new.png"></img>
                            </div>
                        </div>

                    </Carousel>
                </div>
            </div> */}
            {/* <div className={style.modal_product}>
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal
                    width={window.innerWidth >= 920 ? 920 : '100%'}
                    // destroyOnClose={false}
                    closeIcon={<Btn_x />}
                    title="  "
                    footer={null}
                    onCancel={handleCancel}
                    open={isModalOpen}
                    maskStyle={{ backgroundColor: "#17171745", borderRadius: 0 }}
                bodyStyle={{ borderRadius: 0 }}
                style={{ borderRadius: 0 }}
                >

                    <div className={style.content_modal}>
                        <Row>
                            <Col xl={14} md={14} sm={14} xs={24}>
                                <div className={clsx(style.image)}>
                                    <Carousel dots={false}>
                                        <div>
                                            <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
                                        </div>
                                    </Carousel>
                                    <div className={style.list_dots}>
                                        <Row>
                                            <Col>
                                                <div className={style.item_dots}>
                                                    <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className={style.item_dots}>
                                                    <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-500x500.jpeg" />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className={style.item_dots}>
                                                    <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-500x500.jpeg" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={10} md={10} sm={10} xs={24}>
                                <div className={clsx(style.text)}>
                                    <h3 className={style.name}>The Flower Chunky Beanie </h3>
                                    <div className={style.price}><span><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /></span> $24</div>
                                    <p className={style.desc}>Safer For The Environment: Our denim factory partner recycles 98% of their water using reverse osmosis filtration and keeps byproducts out of the environment by mixing them with concrete to create building materials.</p>
                                    <Link to="/" className={clsx(style.btn_shop)}><span>Add To Cart</span> </Link>

                                    <div className={clsx(style.select)}>
                                        <b>Color:</b>
                                        <div className={style.item}>Blue</div>
                                        <div className={style.item}>Brown</div>
                                    </div>
                                    <div className={clsx(style.select)}>
                                        <b>Sizes:</b>
                                        <div className={style.item}>XL</div>
                                        <div className={style.item}>SM</div>
                                    </div>
                                    <div className={style.category}>
                                        <div className={style.item}>
                                            <b>Categories: </b>
                                            <span>Denim, </span>
                                            <span>Men, </span>
                                            <span>Shirts </span>
                                        </div>
                                        <div className={style.item}>
                                            <b>Tags: </b>
                                            <span>Bestseller, </span>
                                            <span>Trend </span>
                                        </div>
                                        <div className={style.item}>
                                            <b>Brands: </b>
                                            <span>Adidas, </span>
                                            <span>Loft, </span>
                                            <span>Nike </span>

                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>


                    </div>
                </Modal>
            </div> */}
        </>
    );
}

export default Home;

