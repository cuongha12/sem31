import React, { useState } from 'react';
import { Carousel } from 'antd';
import clsx from 'clsx';
import style from "./banner.module.scss";
import { Link } from 'react-router-dom';

function Banner() {
    // const onChange = (currentSlide) => {
    //     console.log(currentSlide);
    // };
    //     const ani = (time) => {
    //         return (
    //             transform: "translateY('0')"
    //        )
    // }
    const [ic, setIc] = useState(0)
    // console.log(ic);
    const banner = [
        "https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2022/02/black-gingham-belted-mini-shirt-dress-e1639323379980.jpeg",
        "https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-2.jpeg",
        "https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-3.jpeg",

    ]
    // const im = ''
    return (<>
        <div className={clsx(style.banner)}>
            <Carousel dots={true} autoplay beforeChange={(p, n) => setIc(n)}>
                {banner.map((item, index) => {
                    return (
                        <div key={index}>
                            <div style={{ backgroundImage: `url(${item})`, }} className={clsx(style.item)}>
                                <div className={clsx(style.content, index === 0 ? style.left : style.right)}>
                                    <span className={clsx(style.title, ic === index && style.ani)}>Winter collection #2022</span>
                                    <h1 className={clsx(style.name, ic === index && style.ani)}>Modern Pastel Colors</h1>
                                    <Link to="/shop" className={clsx(style.btn_shop, ic === index && style.ani)}><span>Shop Now <i className="fa-solid fa-chevron-right"></i></span> </Link>
                                </div>
                            </div>
                        </div>

                    )
                })}

            </Carousel>
        </div>
    </>);
}

export default Banner;