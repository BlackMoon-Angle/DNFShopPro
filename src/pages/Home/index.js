import React, { Component } from 'react';
import './index.scss';
//轮播图组件
import Swiper from './swiper'

class Home extends Component {
    constructor() {
        super();
        this.state = {
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
    componentDidMount() {
        fetch('/json/homeGoods.json')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    goodsData: data[0].goods
                })
            })
        fetch('/json/homeNav.json')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    nav_ul: data
                })
            })
    }
    //点击后渲染对应数据
    GoodsData(e, key) {
        let id = e.currentTarget.id
        this.TabClassName(key)
        fetch('/json/homeGoods.json')
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    if (item.id == id) {
                        this.setState({
                            goodsData: item.goods
                        })
                    }
                })
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
                    <div className="nav_box" style={this.state.NavBoxStyle == false ? { height: '0' } : { height: '100%' }}>
                        <div className="nav_box_pop">
                            <h1 className="nav_box_title">人气系列</h1>
                            <ul className="nav_ul">
                                <li>
                                    {
                                        this.state.nav_ul.map((item, index) => {
                                            return <a key={index}>
                                                <span>{item.title}</span>
                                                <img src={item.img}></img>
                                            </a>
                                        })
                                    }
                                </li>
                            </ul>
                            <div onClick={() => { this.NavBoxStyle(false) }} className="nav_close"></div>
                        </div>
                    </div>
                </div>
                {/* 轮播图 */}
                <div className="home_swiper">
                    <Swiper />
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
                    <div onClick={() => {this.props.history.push('/list/:id')}} className="home_router_list"></div>
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