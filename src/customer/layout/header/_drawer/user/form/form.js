import { FacebookFilled, FacebookOutlined, GoogleOutlined, GoogleSquareFilled, RightCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Carousel, Divider, Input } from "antd";
import clsx from "clsx";
import { useRef } from "react";
import style from "./form.module.scss"
function FormDrawer() {
    const _carousel = useRef()
    function prevC() {
        return _carousel.current.prev()
    }
    function nextC() {
        return _carousel.current.next()
    }
    return (
        <>
            <div className={clsx(style.form)}>
                <div className={clsx(style.header)}>
                    <div className={clsx(style.item)} onClick={prevC}>
                        <span>Sign In</span> <RightCircleOutlined style={{ color: "#daa174" }} />
                    </div>
                    <div className={clsx(style.item)} onClick={nextC}>
                        <UserAddOutlined style={{ color: "#daa174" }} /> <span>Register</span>
                    </div>
                </div>
                <Divider style={{ margin: "12px 0", height: "1px", backgroundColor: "#e2e2e2" }}></Divider>
                <Carousel adaptiveHeight={true} infinite={false} ref={_carousel} dots={false}>
                    <div className={clsx(style.carousel_item, style.login)}>
                        <form>
                            <label>Username or email *</label>
                            <Input className={clsx(style._input)} placeholder="Username or email" />
                            <label>Password *</label>
                            <Input.Password className={clsx(style._input)} placeholder="Password" />
                            <div className="form-check" style={{ padding: "16px 21px" }}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label style={{ padding: "0", opacity: '0.6' }} className="form-check-label" for="flexCheckChecked">
                                    Remember me
                                </label>
                            </div>
                            <button type="submit" className={style.submit} >Login</button>
                            <p >Lost your password?</p>
                        </form>

                    </div>
                    <div className={clsx(style.carousel_item, style.register)}>
                        <form>
                            <label>Username *</label>
                            <Input className={clsx(style._input)} placeholder="Username" />
                            <label>Email *</label>
                            <Input className={clsx(style._input)} placeholder="Email" />
                            <label>Password *</label>
                            <Input.Password className={clsx(style._input)} placeholder="Password" />
                            <div className="form-check" style={{ padding: "16px 21px" }}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label style={{ padding: "0", opacity: '0.6' }} className="form-check-label" for="flexCheckChecked">
                                    Remember me
                                </label>
                            </div>
                            <button type="submit" className={style.submit} >Register</button>
                            {/* <p>Lost your password?</p> */}
                        </form>
                    </div>
                </Carousel>


                <div className={clsx(style.social)}>
                    <div className={clsx(style.item)}>
                        <FacebookFilled /> <span>Continue with <b>Facebook</b></span>
                    </div>
                    <div className={clsx(style.item)}>
                        <GoogleSquareFilled /> <span>Continue with <b>Google</b></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormDrawer;