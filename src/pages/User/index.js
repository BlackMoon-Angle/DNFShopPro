import React, { Component } from 'react';
import './index.scss'
//订单图标
import order from '../../../public/img/order/order.png'
//待付款图标
import payment from '../../../public/img/payment/payment.png'
//待发货图标
import deliver from '../../../public/img/deliver/deliver.png'
//待收货图标
import receiving from '../../../public/img/receiving/receiving.png'
//待点评图标
import comment from '../../../public/img/comment/comment.png'
//优惠券图标
import discount from '../../../public/img/discount/discount.png'
//收藏图标
import collect from '../../../public/img/collect/collect.png'
//钻石图标
import diamond from '../../../public/img/diamond/diamond.png'
//抽奖图标
import gift from '../../../public/img/gift/gift.png'
//地址图标
import address from '../../../public/img/address/address.png'
//个人资料图标
import data from '../../../public/img/data/data.png'
//售后图标
import sale from '../../../public/img/sale/sale.png'

class User extends Component {
    render() {
        return (
            <div className="user_box">
                {/* 顶部消息 */}
                <div className="user_head">
                    <div className="user_img">
                        <img src="https://dnfcity.qq.com/mobile/imgjs/img/user/top_img.png"></img>
                    </div>
                    {/* <div className="user_name">
                        玩家昵称(
                        <span className="username">老王</span>
                        )
                    </div> */}
                    <div className="user_name" onClick={() => { this.props.history.push('/login') }}>
                        <span className="username">请登录</span>
                    </div>
                </div>
                {/* 订单项 */}
                <div className="user_order">
                    <a className="order_a order_border">
                        <div className="order_box">
                            <img src={order}></img>
                            <p>全部订单</p>
                        </div>
                        <div className="order_symbol"></div>
                    </a>
                    {/* 订单导航 */}
                    <div className="order_nav">
                        <a>
                            <div className="nav_img">
                                <img src={payment}></img>
                            </div>
                            <p>待付款</p>
                        </a>
                        <a>
                            <div className="nav_img">
                                <img src={deliver}></img>
                            </div>
                            <p>待发货</p>
                        </a>
                        <a>
                            <div className="nav_img">
                                <img src={receiving}></img>
                            </div>
                            <p>待收货</p>
                        </a>
                        <a>
                            <div className="nav_img">
                                <img src={comment}></img>
                            </div>
                            <p>待点评</p>
                        </a>
                    </div>
                    {/* 菜单栏 */}
                    <div className="nav_menu">
                        <a className="order_a">
                            <div className="order_box">
                                <img src={discount}></img>
                                <p>优惠券</p>
                            </div>
                            <div className="order_symbol"></div>
                        </a>
                        <a className="order_a">
                            <div className="order_box">
                                <img src={collect}></img>
                                <p>收藏商品</p>
                            </div>
                            <div className="order_symbol"></div>
                        </a>
                        <a className="order_a">
                            <div className="order_box">
                                <img src={diamond}></img>
                                <p>游戏道具</p>
                            </div>
                            <div className="order_symbol"></div>
                        </a>
                        <a className="order_a">
                            <div className="order_box">
                                <img src={diamond}></img>
                                <p>特殊礼包</p>
                            </div>
                            <div className="order_symbol"></div>
                        </a>
                        <a className="order_a">
                            <div className="order_box">
                                <img src={diamond}></img>
                                <p>我的CDK</p>
                            </div>
                            <div className="order_symbol"></div>
                        </a>
                        <a className="order_a">
                            <div className="order_box">
                                <img src={gift}></img>
                                <p>抽奖信息</p>
                            </div>
                            <div className="order_symbol"></div>
                        </a>
                    </div>
                    <div className="nav_menu">
                        <a className="order_a">
                            <div className="order_box">
                                <img src={address}></img>
                                <p>收货地址</p>
                            </div>
                            <div className="order_symbol"></div>
                        </a>
                        <a className="order_a">
                            <div className="order_box">
                                <img src={data}></img>
                                <p>个人资料</p>
                            </div>
                            <div className="order_symbol"></div>
                        </a>
                        <a className="order_a">
                            <div className="order_box">
                                <img src={sale}></img>
                                <p>售后服务</p>
                            </div>
                            <div className="order_symbol"></div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;