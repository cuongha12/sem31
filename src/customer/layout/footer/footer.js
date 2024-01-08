import { FacebookFilled, TwitterOutlined, YoutubeFilled } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import clsx from "clsx";
import style from './footer.module.scss';

function Footer() {
    return (
        <>  <Divider style={{ backgroundColor: "#e9e9e9" }} />
            <div className={style.footer} style={{ maxWidth: "1580px", margin: "0 auto" }}>
                <Row>
                    <Col md={24} span={24} xl={16}>
                        <div className={clsx(style.left, 'd-flex justify-content-between flex-wrap')}>
                            <div className={clsx(style.item, "col-lg-3 col-6 col-sm-3")}>
                                <span>About Styler</span>
                                <a href="#">Styler Inside</a>
                                <a href="#">About Us</a>
                                <a href="#">Company</a>
                                <a href="#">Careers</a>
                                <a href="#">Brands</a>
                            </div>
                            <div className={clsx(style.item, "col-lg-3 col-6 col-sm-3")}>
                                <span>Categories</span>
                                <a href="#">Woman Denim</a>
                                <a href="#">Accessories</a>
                                <a href="#">Man Denim</a>
                                <a href="#">Clothes</a>
                                <a href="#">Shoes</a>
                            </div>
                            <div className={clsx(style.item, "col-lg-3 col-6 col-sm-3")}>
                                <span>Campaigns</span>
                                <a href="#">Winter Shoes</a>
                                <a href="#">Women T-shirts</a>
                                <a href="#">%50 Sales</a>
                                <a href="#">Outlet</a>
                                <a href="#">Pre-Sale</a>
                            </div>
                            <div className={clsx(style.item, "col-lg-3 col-6 col-sm-3")}>
                                <span>Help</span>
                                <a href="#">Order Tracking</a>
                                <a href="#">Terms & Conditions</a>
                                <a href="#">Privacy Policy</a>
                                <a href="#">Tutorials</a>
                                <a href="#">FAQ</a>
                            </div>
                        </div>
                    </Col>
                    <Col md={24} span={24} xl={8}>
                        <div className={style.right}>
                            <span>Newsletter</span>
                            <form>
                                <input placeholder="Your E-mail"></input>
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <p>Sign up to get the latest on new Products, Promotions, Design news and more</p>
                            </form>

                        </div>

                    </Col>
                </Row>

            </div>
            <div className={clsx(style.bottom, 'd-flex justify-content-between flex-wrap ')}>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <span>tel : 0980 444 45 456</span> - <span>mail : hello@demostyler.com</span>
                </div>
                <div className={clsx(style.icon, 'col-lg-4 col-md-4 col-sm-12 ')}>
                    <FacebookFilled />
                    <TwitterOutlined />
                    <YoutubeFilled />
                </div>
                <div >
                    copyright - styler.com
                </div>
            </div>
        </>
    );
}

export default Footer;