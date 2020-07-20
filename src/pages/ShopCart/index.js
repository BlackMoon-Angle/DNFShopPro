import React, { Component } from 'react';
import './index.scss'
import http from '../../utils/Http'
//可显隐式商品导航组件
import NavData from '../../utils/NavData'
//复选框组件
import { List, Checkbox, Flex } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
class ShopCart extends Component {
    constructor() {
        super();
        this.state = {
            NavBoxStyle: false,//用于导航盒子的显示和隐藏
            cartData: [],//用于存放请求回来的购物商品数据
            val: 3,
            val1: 2,
        }
        this.NavBoxStyle = this.NavBoxStyle.bind(this)
    }
    async componentDidMount() {
        this.setState({
            cartData: await http.get('/good/cartData')
        })
    }
    //用于切换导航盒子显隐
    NavBoxStyle(boolean) {
        this.setState({
            NavBoxStyle: boolean
        })
    }
    async onChange(id, e_bol) {
        let boolean = e_bol
        const data = await http.put('/good/modifycart', {
            id: id,
            id_bol: boolean
        })
        this.setState({
            cartData: await http.get('/good/cartData')
        })
    }
    render() {
        return (
            <div className="shopcart_box">
                {/* 头部 */}
                <div className="cart_head">
                    <a className="cart_title" title="周边首页"></a>
                    <div className="cart_nav" title="导航" onClick={() => { this.NavBoxStyle(true) }}></div>
                    {/* 隐藏的导航盒子 */}
                    <NavData style_boolean={[
                        this.state.NavBoxStyle,
                        this.NavBoxStyle
                    ]} />
                </div>
                {/* 购物车主体 */}
                <div className="cart_box">
                    {/* 存在商品时 */}
                    <div className="true_cart" style={this.state.cartData.length ? { display: 'block' } : { display: 'none' }}>
                        <div className="true_box">
                            <List>
                                {this.state.cartData.map((item, index) => (
                                    <CheckboxItem
                                        id={item.id} key={index}
                                        checked={item.detailData.checked}
                                        onChange={() => this.onChange(item.id, item.detailData.checked)}
                                    >
                                        {/* 图片 */}
                                        <div className="del_img">
                                            <img src={item.detailData.swiperImg[0]}></img>
                                        </div>
                                        {/* 名称与价格 */}
                                        <div className="del_name">
                                            <h4>{item.detailData.name}</h4>
                                            <p>单价：
                                                <font>¥ {item.detailData.price}</font>
                                            </p>
                                            <span>库存:
                                                <font> {item.detailData.stock}</font>
                                            </span>
                                        </div>
                                        {/* 增加与减少 */}
                                        <div className="del_btnNum">
                                            <a className="add_btn"></a>
                                            <input defaultValue={item.detailData.buy_num} />
                                            <a className="reduce_btn"></a>
                                        </div>
                                    </CheckboxItem>
                                ))}
                            </List>
                        </div>
                    </div>
                    {/* 不存在商品时 */}
                    <div className="false_cart"
                        onClick={() => { this.props.history.push('/list') }}
                        style={this.state.cartData.length ? { display: 'none' } : { display: 'block' }}
                    >
                        <img src="https://img.dnfcity.qq.com/weixin20/base/cart_no.png"></img>
                    </div>
                </div>
                {/* 结算盒子 */}
                <div className="Check_out">
                    <CheckboxItem>
                        <p className="all_checked">全选</p>
                        {/* 总价与购买数量 */}
                        <div className="price_num">
                            <p className="total_price">共计：
                                <font>¥ 0.00</font>
                            </p>
                            <p className="all_num">数量：
                                <font>0件</font>
                            </p>
                        </div>
                        {/* 结算按钮 */}
                        <div className="settlement" style={this.state.cartData.length ? { display: 'block' } : { display: 'none' }}>结算</div>
                    </CheckboxItem>
                </div>
            </div>
        )
    }
}

export default ShopCart;