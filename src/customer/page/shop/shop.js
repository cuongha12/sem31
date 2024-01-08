import clsx from "clsx";
import style from "./shop.module.scss";
import { EyeOutlined, MinusOutlined, StarFilled, SyncOutlined, HeartOutlined, ShoppingOutlined, RightOutlined, ControlOutlined, FilterOutlined, SearchOutlined, FilterFilled } from "@ant-design/icons";
import { Button, Checkbox, Col, Collapse, Drawer, Pagination, Radio, Row, Select, Slider, Typography } from "antd";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Btn_x from "../../../component/btn/btn_x";
import { AppContext } from "../../../Context/AppContext";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function Shop() {
    const { category, item } = useContext(AppContext)
    const { Panel } = Collapse;
    const { Text, Link } = Typography;
    const [openFilter, setOpenFilter] = useState(false);
    const [product, setProduct] = useState([])
    const [limit, setLimit] = useState(5)
    const [total, setTotal] = useState(0)
    const [option, setOption] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [params, setParams] = useState({})
    const categories = searchParams.get('category')
    const items = searchParams.get('item')
    const pages = searchParams.get('page')
    const order = searchParams.get('order')

    // const 
    const showFilter = () => {
        const filter = document.getElementById('detail_filter')
        const show = document.getElementById('show')
        const hidden = document.getElementById('hidden')
        const content = document.getElementsByClassName(style.item_filter)
        let data = []
        Array.from(content).forEach((item) => {
            data.push(item.scrollHeight)
        })
        let maxHeight = Math.max(...data)

        // console.log(content[0].clientHeight);
        show.style.display = 'none'
        hidden.style.display = 'none'
        if (filter.clientHeight) {
            filter.style.height = 0
            hidden.style.display = 'inline-block'
        } else {
            // filter.style.height = filter.scrollHeight + 'px'
            filter.style.height = maxHeight + 'px'
            show.style.display = 'inline-block'
        }
    }
    const [price, setPrice] = useState([0, 100])
    const onCheck = (e) => {
        setSearchParams({ ...params, order: e })
        setParams({ ...params, order: e })
        setOption(e)
        // // console.log('onChange: ', value);
        // setPrice(value)
    };
    const onChange = (value) => {
        // console.log('onChange: ', value);
        setPrice(value)
    };
    const onAfterChange = (value) => {
        console.log('onAfterChange: ', value);
    };
    const navigate = useNavigate()
    const getDetailProduct = (id) => {
        navigate(`/detail/${id}`)
    }
    useEffect(() => {
        const getProduct = async () => {
            return await axios.get(`/shop?category=${categories === null ? '' : categories}&item=${items === null ? '' : items}&page=${pages === null ? 1 : pages}&limit=${limit}&order=${order === null ? '' : order}`)
                .then((res) => {
                    setProduct(res.data.data.rows)
                    setTotal(res.data.data.count)
                })
        }
        getProduct()
    }, [categories, items, pages, limit, order])
    return (
        <>

            <div style={{ backgroundColor: "#f8f9fa", height: '80px' }}>
                <div className={clsx(style.title)} style={{ padding: "0 1rem" }}>
                    <h2>Shop</h2>
                    <span className={style.redirect}>
                        Home
                        <span style={{ width: '5px', height: "5px", borderRadius: "50%", backgroundColor: "#e2e2e2", display: "inline-block", verticalAlign: "middle" }}></span>
                        Product
                    </span>
                </div>
            </div>
            <div className={style.products} >
                <div className={style.head}>
                    <div className={clsx('d-flex pb-3 mt-5 justify-content-between')}>
                        <div className={clsx('d-none d-sm-block')}>
                            Showing 1–15 of 22 results
                        </div>
                        <div className={clsx('d-flex justify-content-end col-12 col-sm-6')}>
                            <span className="d-lg-block d-none">
                                <Button type="text" danger onClick={() => {
                                    setSearchParams({})
                                    setParams({})
                                }}>
                                    Xoá bộ lọc
                                </Button>
                            </span>
                            <span className="d-lg-block d-none" onClick={showFilter} style={{ cursor: 'pointer' }}>
                                Bộ lọc <FilterOutlined id="hidden" style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    // transform: 'rotage(90deg)',
                                    paddingTop: '5px'

                                }} />

                                <FilterFilled id="show" style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    // transform: 'rotage(90deg)',
                                    color: "#e49e6c",
                                    paddingTop: '5px',
                                    display: 'none'
                                }} />
                            </span>
                            <span className="d-lg-none d-block" onClick={() => setOpenFilter(true)} style={{ cursor: 'pointer' }}>
                                Bộ lọc <FilterOutlined id="hidden" style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    // transform: 'rotage(90deg)',
                                    paddingTop: '5px'

                                }} />
                                <FilterFilled id="show" style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    // transform: 'rotage(90deg)',
                                    color: "#e49e6c",
                                    paddingTop: '5px',
                                    display: 'none'
                                }} />
                            </span>

                            <Select
                                value={order === null ? '' : order}
                                style={{ width: 200 }}
                                onChange={onCheck}

                                // loading={true}\
                                // size={'large'}
                                dropdownStyle={{
                                    borderRadius: "0",
                                }}
                                bordered={false}
                                options={[
                                    {
                                        value: 'desc',
                                        label: 'Giá cao đến thấp',
                                    },
                                    {
                                        value: 'asc',
                                        label: 'Giá thấp đến cao',
                                    },
                                    {
                                        value: '',
                                        label: 'Sắp xếp theo',
                                    },
                                ]}
                            />
                            <SearchOutlined
                                style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    transform: 'rotage(90deg)',
                                    paddingTop: '5px',
                                    cursor: "pointer",
                                    paddingLeft: "8px"
                                }} />
                        </div>
                    </div>
                </div>
                <div id="detail_filter" className={style.detail_filter} >
                    <div className={clsx(style.item_filter, style.price)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Filter By Price</h5>} key="1">
                                <div className="p-2">
                                    <Slider
                                        // style={{ width: "96%" }}
                                        range
                                        step={10}
                                        defaultValue={[1, 100]}
                                        onChange={onChange}
                                        onAfterChange={onAfterChange}
                                        trackStyle={{ backgroundColor: "#daa174" }}
                                    // handleStyle={{ backgroundColor: "red" ,  }}
                                    />
                                    <Row style={{ marginTop: "1rem" }} justify="space-between" align={'middle'} >
                                        <Col>
                                            <a name="" id="" className="btn btn-primary" href="#" role="button">Filter</a>
                                        </Col>
                                        <Col><span>Price: ${price[0]} - ${price[1]}</span> </Col>
                                    </Row>
                                </div>

                            </Panel>
                        </Collapse>
                    </div>
                    <div className={clsx(style.item_filter, style.color)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Filter By Color</h5>} key="1">
                                {/* <div className={clsx()}> */}
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#000" }}></span> Black
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#23d6ea" }}></span> Blue
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#a87323" }}></span> Brown
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#82c43c" }}></span> Green
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#fff", border: "1px solid #000" }}></span> White
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#eeee22" }}></span> Yellow
                                    </span>
                                    <span>7</span>
                                </div>
                                {/* </div> */}
                            </Panel>

                        </Collapse>
                    </div>
                    <div className={clsx(style.item_filter, style.category)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Product Categories</h5>} key="1">
                                {/* {
                                    category.filter((e) => e.status === false).map((e) => (
                                        <div className="pb-2" key={e.id}>
                                            <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>{e.name}</Checkbox>
                                        </div>
                                    ))
                                } */}
                                <Radio.Group value={categories === null ? '' : categories}
                                    onChange={(e) => {
                                        setSearchParams({ ...params, category: e.target.value, page: 1 });
                                        setParams({ ...params, category: e.target.value, page: 1 });
                                    }}>
                                    {
                                        category.filter((e) => e.status === false).map((e) => (
                                            <Radio key={e.id} value={e.name}>{e.name}</Radio>
                                        ))
                                    }
                                </Radio.Group>
                                {/* <div className="pb-2">
                                    <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Men</Checkbox>
                                </div>
                                <div>
                                    <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Women</Checkbox>
                                </div> */}
                            </Panel>

                        </Collapse>
                    </div>
                    <div className={clsx(style.item_filter, style.status)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Product Item</h5>} key="1">
                                <Radio.Group value={items === null ? '' : items}
                                    onChange={(e) => {
                                        setSearchParams({ ...params, item: e.target.value, page: 1 });
                                        setParams({ ...params, item: e.target.value, page: 1 });

                                    }}
                                >
                                    {
                                        item.filter((e) => e.status === false).map((e) => (
                                            <Radio key={e.id} value={e.name}>{e.name}</Radio>
                                        ))
                                    }
                                </Radio.Group>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className={clsx(style.item_filter, style.size)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Filter By Sizes</h5>} key="1">
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        s                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        m                                 </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        l                                 </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        XL                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        Xs                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        xXL                                    </span>
                                    <span>7</span>
                                </div>
                            </Panel>

                        </Collapse>
                    </div>
                </div>
                <Row gutter={[16, 16]}>
                    {
                        product.map((e) => (
                            <Col xxl={4} xl={6} sm={8} span={12} key={e.id}>
                                <div className={clsx(style.item)} >
                                    <div className={clsx(style.image)} >
                                        <div onClick={() => getDetailProduct(e.name.concat(" ", e.id).split(' ').join('-'))}>
                                            <img className={clsx(style.img1, "card-img")} src={`/uploads/${e?.image?.length > 0 ? e?.image[0]?.image : ''}`}></img>
                                            <img src={`/uploads/${e?.image?.length > 0 ? e?.image[1]?.image : ''}`} className={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                        </div>
                                        <div className={clsx(style.desktop_icon, style.group_icon)}>
                                            <div className={style.icon}><EyeOutlined /></div>
                                            <div className={style.icon}><SyncOutlined /></div>
                                            <div className={style.icon}><HeartOutlined /></div>
                                            <div className={style.icon}><ShoppingOutlined /></div>
                                        </div>
                                        {
                                            e.sale > 0 && <div className={clsx(style.tags)}>
                                                <span className={clsx(style.bg)}>Sale!</span>
                                                {/* <span>sale!</span> */}
                                                <span>{e.sale}%</span>
                                            </div>
                                        }

                                    </div>
                                    <div className={clsx(style.mobile_icon, style.group_icon)}>
                                        <div className={style.icon}><EyeOutlined /></div>
                                        <div className={style.icon}><SyncOutlined /></div>
                                        <div className={style.icon}><HeartOutlined /></div>
                                        <div className={style.icon}><ShoppingOutlined /></div>
                                    </div>
                                    <h6>{e.name}</h6>
                                
                                    <div className="d-flex justify-content-between">
                                        <p>       {e.sale > 0 && <><Text delete>{e.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₫
                                        </Text>
                                            <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /></>}
                                            {e.sale > 0 ? ((e.sale / 100) * e.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : e.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₫</p>
                                        <div className={clsx(style.star)}>
                                            <StarFilled />
                                            <StarFilled />
                                            <StarFilled />
                                            <StarFilled />
                                            <StarFilled />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
                <Pagination style={{
                    alignItems: 'center',
                    textAlign: 'center',
                }} current={pages === null ? 1 : Number(pages)} onChange={(size) => {
                    setSearchParams({ ...params, page: size })
                    setParams({ ...params, page: size })
                }} total={(total / 5) * 10} />
            </div >
            <Drawer
                placement={"left"}
                width={window.innerWidth > 460 ? 460 : '100%'}
                closable={false}
                onClose={() => {
                    setOpenFilter(false)
                    return openFilter
                }}
                open={openFilter}
                maskStyle={{ backgroundColor: "#d5d5d573" }}
                bodyStyle={{ overflowX: "hidden", overflowY: 'scroll', padding: `${window.innerWidth > 460 ? '24px' : '16px'}` }}
            >
                <div className={clsx(style.mobile_filter)}>
                    <div className="d-flex justify-content-end ">
                        <div className={style.btn_x}>
                            <p onClick={() => setOpenFilter(false)} >
                                <Btn_x></Btn_x>
                            </p>
                        </div>
                    </div>

                    <div id="detail_filter" className={style.detail_filter} >
                        <div className={clsx(style.item_filter, style.price)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Filter By Price</h5>} key="1">
                                    <div className="p-2">
                                        <Slider
                                            // style={{ width: "96%" }}
                                            range
                                            step={10}
                                            defaultValue={[1, 100]}
                                            onChange={onChange}
                                            onAfterChange={onAfterChange}
                                            trackStyle={{ backgroundColor: "#daa174" }}
                                        // handleStyle={{ backgroundColor: "red" ,  }}
                                        />
                                        <Row style={{ marginTop: "1rem" }} justify="space-between" align={'middle'} >
                                            <Col>
                                                <a name="" id="" className="btn btn-primary" href="#" role="button">Filter</a>
                                            </Col>
                                            <Col><span>Price: ${price[0]} - ${price[1]}</span> </Col>
                                        </Row>
                                    </div>

                                </Panel>
                            </Collapse>
                        </div>
                        <div className={clsx(style.item_filter, style.color)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Filter By Color</h5>} key="1">
                                    {/* <div className={clsx()}> */}
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#000" }}></span> Black
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#23d6ea" }}></span> Blue
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#a87323" }}></span> Brown
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#82c43c" }}></span> Green
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#fff", border: "1px solid #000" }}></span> White
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#eeee22" }}></span> Yellow
                                        </span>
                                        <span>7</span>
                                    </div>
                                    {/* </div> */}
                                </Panel>

                            </Collapse>
                        </div>
                        <div className={clsx(style.item_filter, style.category)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Product Categories</h5>} key="1">
                                    <div className="pb-2">
                                        <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Men</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Women</Checkbox>
                                    </div>
                                </Panel>

                            </Collapse>
                        </div>
                        <div className={clsx(style.item_filter, style.status)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Product Status</h5>} key="1">
                                    <div className="pb-2">
                                        <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>In stock</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Out stock</Checkbox>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                        <div className={clsx(style.item_filter, style.size)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Filter By Sizes</h5>} key="1">
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            s                                    </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            m                                 </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            l                                 </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            XL                                    </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            Xs                                    </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            xXL                                    </span>
                                        <span>7</span>
                                    </div>
                                </Panel>

                            </Collapse>
                        </div>
                    </div>
                </div>

            </Drawer>
        </>
    );
}

export default Shop;