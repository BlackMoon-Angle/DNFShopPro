import React, { Component } from 'react';
import './index.scss'
import http from '../../utils/Http'
import { withRouter } from 'react-router-dom'
import home_back from '../../../public/img/back/back.png'
import cart from '../../../public/img/cart/cart.png'
//轮播图组件
import Swiper from '../../utils/Swiper'
// 轻提示组件
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

import backHome from '../../../public/img/home/home.png'
import collect from '../../../public/img/collect/collect.png'

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            detailData: [],
            swiper_data: {
                //轮播图的图片，用于传递给swiper组件
                swiper_img: ['https://img.dnfcity.qq.com/goodsImages/mall2015/1799/da4.jpg'],
                swiperImg_height: '91.8vw'//轮播图的高度，用于传递给swiper组件
            },
            name: '',//商品的名称
            price: '',//商品的价格
            describe: '',//商品的介绍
            stock: ''//库存
        }
        this.add_cart = this.add_cart.bind(this)
        // this.swiper_data = this.swiper_data.bind(this)
    }
    // async componentWillMount() {
    //     let id = this.props.match.params.id;//获取路由传过来的id
    //     const data = await http.get('/good/detail')
    //     let detail_data = data.filter(item => item.id == id)
    //     // console.log(detail_data[0].detail[0].swiperImg)
    //     this.setState({
    //         swiper_data: {
    //             swiper_img: detail_data[0].detail[0].swiperImg
    //         },
    //         name: detail_data[0].detail[0].name,
    //         price: detail_data[0].detail[0].price,
    //         describe: detail_data[0].detail[0].describe
    //     })
    // }
    async componentDidMount() {
        let id = this.props.match.params.id;//获取路由传过来的id
        const data = await http.get('/good/detail')
        let detail_data = data.filter(item => item.id == id)
        const arr = detail_data[0].detail[0]
        this.setState({
            detailData: detail_data[0].detail,
            swiper_data: {
                swiper_img: arr.swiperImg
            },
            name: arr.name,
            price: arr.price,
            describe: arr.describe,
            stock: arr.stock
        })
    }
    //加入购物车事件
    async add_cart() {
        let id = this.props.match.params.id;//获取路由传过来的id
        const data = await http.post('/good/addCart', {
            id: id,
            detailData: JSON.stringify(this.state.detailData)
        })
        if (data.flag) {
            Toast.success('添加购物车成功！', 1.5);
        }
        else {
            Toast.fail('添加购物车失败，购物车中已存在该商品！', 1.5);
        }
    }
    render() {
        return (
            <div className="detail_box" >
                {/* 顶部导航 */}
                < div className="detail_head" >
                    <div className="head_box">
                        {/* 返回按钮 */}
                        <div className="head_back">
                            <a onClick={() => { this.props.history.push('/list') }}>
                                <img src={home_back}></img>
                            </a>
                        </div>
                        {/* 导航 */}
                        <div className="head_nav">
                            <div className="detail_nav_box">
                                <div className="nav">
                                    商品
                                    <span className="span_color"></span>
                                </div>
                                <div className="nav nav_color">
                                    评价
                                    <span></span>
                                </div>
                                <div className="nav nav_color">
                                    详情
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        {/* 购物车图标 */}
                        <div className="detail_cart">
                            <a onClick={() => { this.props.history.push('/shopcart') }}>
                                <img src={cart}></img>
                                <span>0</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* 商品详细主体 */}
                < div className="detail_warp" >
                    <div className="info_box">
                        {/* 商品图片——轮播图 */}
                        <Swiper data={this.state.swiper_data} />
                        {/* 商品名称以及介绍 */}
                        <div className="info_name">
                            <div className="name_box">
                                <h4>{this.state.name}</h4>
                                <p>{this.state.describe}</p>
                            </div>
                        </div>
                        {/* 价格 */}
                        <div className="info_price">
                            <div className="price_box">
                                <font>¥ {this.state.price}</font>
                            </div>
                            {/* 库存显示 */}
                            <div className="stock">库存：{this.state.stock}</div>
                        </div>
                    </div>
                </ div >
                {/* 底部购物导航 */}
                <div className="detail_nav">
                    <div className="nav_div">
                        {/* 首页与收藏 */}
                        <div className="nav_backHome">
                            <div className="backHome">
                                <a onClick={() => { this.props.history.push('/home') }}>
                                    <img src={backHome}></img>
                                    <span>首页</span>
                                </a>
                            </div>
                            <div className="backHome">
                                <a>
                                    <img src={collect}></img>
                                    <span>收藏</span>
                                </a>
                            </div>
                        </div>
                        {/* 购买按钮 */}
                        <div className="buy_div">立即购买</div>
                        {/* 加入购物车按钮 */}
                        <div className="join_cart" onClick={this.add_cart}>加入购物车</div>
                    </div>
                </div>
            </div >
        )
    }
}
export default withRouter(Detail);