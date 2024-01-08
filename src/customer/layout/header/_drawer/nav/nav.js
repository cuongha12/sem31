import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import style from "./nav.module.scss"
function NavDrawer() {
    return (
        <>
            <div className={clsx(style.nav_drawer)}>
                <div className={clsx('text-center')}>
                    <Link to={"/"} className={clsx(style.logo)}>
                        styler
                    </Link>
                </div>
                <Divider style={{ height: "1px", backgroundColor: "#e2e2e2" }}></Divider>
                <div className={clsx(style.content)}>
                    <ul>
                        <li>
                            <Link to="/shop" >Shop <i className="fa-solid fa-angle-down"></i></Link>
                        </li>
                        <li>
                            <Link to="/shop" >Category <i className="fa-solid fa-angle-down"></i></Link>
                        </li>
                        <li>
                            <Link to="/shop" >About US <i className="fa-solid fa-angle-down"></i></Link>

                        </li>
                        <li>
                            <Link to="/shop" >Contact <i className="fa-solid fa-angle-down"></i></Link>

                        </li>
                        <Divider style={{ margin: "12px 0", height: "1px", backgroundColor: "#e2e2e2" }}></Divider>
                        <li>
                            <Link  >Language <i className="fa-solid fa-angle-down"></i></Link>
                        </li>
                        <li>
                            <Link  >Currency <i className="fa-solid fa-angle-down"></i></Link>
                        </li>

                    </ul>

                </div>

                <div className={clsx(style.social)}>
                    <div className={clsx(style.social_item)}>
                        <FacebookOutlined />
                    </div>
                    <div className={clsx(style.social_item)}>
                        <TwitterOutlined />
                    </div>
                    <div className={clsx(style.social_item)}>
                        <InstagramOutlined />
                    </div>
                    <div className={clsx(style.social_item)}>
                        <YoutubeOutlined />
                    </div>
                </div>
            </div>


        </>
    );
}

export default NavDrawer;