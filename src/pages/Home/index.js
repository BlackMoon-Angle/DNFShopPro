import React, { Component } from 'react';
import './index.scss';
import http from '../../utils/Http'
//轮播图组件
import Swiper from '../../utils/Swiper'
//可显隐式商品导航组件
import NavData from '../../utils/NavData'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            //用于传递给swiper组件
            swiper_data: {
                //轮播图的图片，用于传递给swiper组件
                swiper_img: ['https://img.dnfcity.qq.com/goodsImages/xiaocx/bann54.jpg', 'https://img.dnfcity.qq.com/goodsImages/xiaocx/bann52.jpg'],
                swiperImg_height: '60vw'//轮播图的高度，用于传递给swiper组件
            },
            goodsData: [],//用于存储请求的首页商品数据
            nav_ul: [],//用于存储请求的首页导航数据
            goods_nav: [
                {
                    id: "goods_nav_1",
                    text: "礼包收藏"
                },
                {
                    id: "goods_nav_2",
                    text: "手办模型"
                },
                {
                    id: "goods_nav_3",
                    text: "数码电子"
                },
                {
                    id: "goods_nav_4",
                    text: "服饰日用"
                },
                {
                    id: "goods_nav_5",
                    text: "新品专区"
                }
            ],
            tabClassName: "0",//用于选项卡的样式切换
            NavBoxStyle: false//用于导航盒子的显示和隐藏

        }
        this.GoodsData = this.GoodsData.bind(this)
        this.TabClassName = this.TabClassName.bind(this)
        this.NavBoxStyle = this.NavBoxStyle.bind(this)
    }
    //进入页面立刻渲染数据
    async componentDidMount() {
        // 打开页面立即渲染第一块商品列表
        this.setState({
            goodsData: (await this.Home_data())[0].goods
        })

        //商品导航数据
        this.setState({
            nav_ul: await this.Home_Nav_data()
        })
    }
    // 首页商品列表数据请求
    Home_data() {
        return http.get('/good/homeGoods')
    }
    // 首页商品导航数据请求
    Home_Nav_data() {
        return http.get('/good/homeNav')
    }
    //点击后渲染对应数据
    async GoodsData(e, key) {
        let id = e.currentTarget.id
        this.TabClassName(key)
        let data = await this.Home_data()
        data.forEach(item => {
            if (item.id == id) {
                this.setState({
                    goodsData: item.goods
                })
            }
        })
    }
    //用于className切换(选项卡)
    TabClassName(key) {
        this.setState({
            tabClassName: key
        })
    }
    //用于切换导航盒子显隐
    NavBoxStyle(boolean) {
        this.setState({
            NavBoxStyle: boolean
        })
    }
    render() {
        return (
            <div className="home">
                {/* 顶部 */}
                <div className="home_head">
                    <a className="home_logo" title="周边首页"></a>
                    <a className="home_search" title="搜索"></a>
                    <div className="home_nav" title="导航" onClick={() => { this.NavBoxStyle(true) }}></div>
                    {/* 隐藏的导航盒子 */}
                    <NavData style_boolean={[
                        this.state.NavBoxStyle,
                        this.NavBoxStyle
                    ]} />
                </div>
                {/* 轮播图 */}
                <div className="home_swiper">
                    <Swiper data={this.state.swiper_data} />
                </div>
                {/* 商品区 */}
                <div className="home_goods">
                    {/* 标题 */}
                    <div className="home_goods_head">
                        <p className="home_goods_head_p1">-Popularity Series-</p>
                        <p className="home_goods_head_p2">人气系列</p>
                    </div>
                    {/* 商品区导航 */}
                    <div className="goods_nav">
                        {
                            this.state.goods_nav.map((item, index) => {
                                return <a
                                    key={index.toString()}
                                    onClick={(e) => { this.GoodsData(e, index.toString()) }}
                                    id={item.id}
                                    className={this.state.tabClassName === index.toString() ? "goods_nav_a goods_nav_a_router" : "goods_nav_a"}>
                                    <span>{item.text}</span>
                                </a>
                            })
                        }
                    </div>
                    {/* 首页商品列表 */}
                    <div className="home_goods_list">
                        <div className="home_goods_list_box">
                            {
                                this.state.goodsData.map((item, index) => {
                                    return <a key={index}>
                                        <div className="goods_img">
                                            <img src={item.img}></img>
                                        </div>
                                        <div className="goods_name_price">
                                            <p className="name"> {item.title}</p>
                                            <p className="price">
                                                <font>¥ {item.price}</font>
                                            </p>
                                        </div>
                                    </a>
                                })
                            }
                        </div>
                    </div>
                    {/* 查看更多——跳转到列表页 */}
                    <div onClick={() => { this.props.history.push('/list') }} className="home_router_list"></div>
                </div>
                {/* 品牌区 */}
                <div className="home_brand">
                    {/* 标题 */}
                    <div className="home_brand_head">
                        <p className="home_brand_p1">-Brand Series-</p>
                        <p className="home_brand_p2">品牌系列</p>
                    </div>
                    {/* 品牌列表 */}
                    <div className="home_brand_list">
                        <ul>
                            <li>
                                <a>
                                    <img src="https://img.dnfcity.qq.com/weixin20/base/pinpai/pinpai4.jpg"></img>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <img src="https://img.dnfcity.qq.com/weixin20/base/pinpai/pinpai3.jpg"></img>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <img src="https://img.dnfcity.qq.com/weixin20/base/pinpai/pinpai2.jpg"></img>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <img src="https://img.dnfcity.qq.com/weixin20/base/pinpai/pinpai1.jpg"></img>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;