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
//token验证接口
import { token_verify } from '../../api/UserApi'
//对话框组件
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
const alert = Modal.alert;

let LoginInfo = {
    getData() {
        //获取数据
        let list = localStorage.getItem("LoginToken");
        if (list) {
            return JSON.parse(list);
        } else {
            return [];
        }
    },
    setData(data) {
        //保存数据
        localStorage.setItem("LoginToken", JSON.stringify(data));
    }
};
class User extends Component {
    constructor() {
        super();
        this.state = {
            user_box: false,//用于判断用户是否登录
            username: ''//登录成功后，显示用户名在页面
        }
        this.login_out_Btn = this.login_out_Btn.bind(this)
        this.login_out = this.login_out.bind(this)
    }
    async componentDidMount() {
        const token = LoginInfo.getData();
        const data = await token_verify(token)
        if (data.flag) {
            this.setState({
                user_box: true,
                username: data.username
            })
        }
        else {
            this.setState({
                user_box: false
            })
        }
    }
    //退出登录提示
    login_out_Btn() {
        alert('退出登录提示', '确认退出登录？', [
            { text: '取消' },
            { text: '确认', onPress: () => this.login_out() },
        ])
    }
    //退出登录事件
    login_out() {
        localStorage.removeItem('LoginToken');
        window.location.reload()
    }
    render() {
        return (
            <div className="user_box">
                {/* 顶部消息 */}
                <div className="user_head">
                    <div className="user_img">
                        <img src="https://dnfcity.qq.com/mobile/imgjs/img/user/top_img.png"></img>
                    </div>
                    <div className="user_name" style={this.state.user_box == true ? { display: 'block' } : { display: 'none' }}>
                        玩家昵称(
                        <span className="username">{this.state.username}</span>
                        )
                    </div>
                    <div className="user_name"
                        onClick={() => { this.props.history.push('/login') }}
                        style={this.state.user_box == false ? { display: 'block' } : { display: 'none' }}
                    >
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
                        {/* 退出登录按钮 */}
                        <a className="order_a login_out" style={this.state.user_box == true ? { display: 'block' } : { display: 'none' }}>
                            <div className="order_box login_out_box">
                                <p onClick={() => this.login_out_Btn()}>退出登录</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;