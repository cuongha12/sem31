import { DeleteOutlined, LineOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Typography } from 'antd';
// import Text from 'antd/es/input/Text';
import clsx from 'clsx';
import style from "./wishlist.module.scss"

function Wishlish_drawer() {
    const { Text, Link } = Typography;

    return (
        <>
            <div className={clsx(style.ani)}>
                <div className={clsx(style.cart_drawer)}>
                    <Divider orientation="left">Your Wishlist</Divider>
                    <div className={clsx(style.item)}>
                        <Row>
                            <Col flex="80px">
                                <img className={clsx(style.image)} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-80x80.jpeg"></img>
                            </Col>
                            <Col flex="auto">
                                <div className={clsx(style.middle)}>
                                    <h4 className={clsx(style.name)}>
                                        The Blue Chunky Beanie
                                    </h4>
                                    <div className={clsx(style.price)}>
                                        <Text delete>$24.00</Text>
                                        <LineOutlined style={{ fontSize: "10px", verticalAlign: 'middle', paddingLeft: "5px", height: "100% " }} /> $21.00 / <span style={{ color: "#daa174", fontSize: '16px' }}>In stock</span>
                                    </div>
                                    <div className={clsx(style.add)}>Add to cart</div>
                                </div>
                            </Col>
                            <Col flex="22px" style={{ textAlign: 'center' }}><DeleteOutlined style={{ fontSize: "16px", cursor: 'pointer' }} /></Col>

                        </Row>
                    </div>
                    <div className={clsx(style.item)}>
                        <Row>
                            <Col flex="80px">
                                <img className={clsx(style.image)} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-80x80.jpeg"></img>
                            </Col>
                            <Col flex="auto">
                                <div className={clsx(style.middle)}>
                                    <h4 className={clsx(style.name)}>
                                        The Blue Chunky Beanie
                                    </h4>
                                    <div className={clsx(style.price)}>
                                        <Text delete>$24.00</Text>
                                        <LineOutlined style={{ fontSize: "10px", verticalAlign: 'middle', paddingLeft: "5px", height: "100% " }} /> $21.00 / <span style={{ color: "#daa174", fontSize: '16px' }}>In stock</span>
                                    </div>
                                    <div className={clsx(style.add)}>Add to cart</div>
                                </div>
                            </Col>
                            <Col flex="22px" style={{ textAlign: 'center' }}><DeleteOutlined style={{ fontSize: "16px", cursor: 'pointer' }} /></Col>

                        </Row>
                    </div>
                    <div className={clsx(style.item)}>
                        <Row>
                            <Col flex="80px">
                                <img className={clsx(style.image)} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-80x80.jpeg"></img>
                            </Col>
                            <Col flex="auto">
                                <div className={clsx(style.middle)}>
                                    <h4 className={clsx(style.name)}>
                                        The Blue Chunky Beanie
                                    </h4>
                                    <div className={clsx(style.price)}>
                                        <Text delete>$24.00</Text>
                                        <LineOutlined style={{ fontSize: "10px", verticalAlign: 'middle', paddingLeft: "5px", height: "100% " }} /> $21.00 / <span style={{ color: "#daa174", fontSize: '16px' }}>In stock</span>
                                    </div>
                                    <div className={clsx(style.add)}>Add to cart</div>
                                </div>
                            </Col>
                            <Col flex="22px" style={{ textAlign: 'center' }}><DeleteOutlined style={{ fontSize: "16px", cursor: 'pointer' }} /></Col>

                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlish_drawer;