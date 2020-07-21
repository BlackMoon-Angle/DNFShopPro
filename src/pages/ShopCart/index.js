import React, { Component } from 'react';
import './index.scss'
//可显隐式商品导航组件
import NavData from '../../utils/NavData'
//商品数据Api
import { Cart_data, Modify_cart, add_num, reduce_num, delete_data, all_checked_data } from '../../api/GoodsApi'
//复选框组件
import { List, Checkbox, Flex } from 'antd-mobile';
import Item from 'antd-mobile/lib/popover/Item';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

let ShopCartInfo = {
    getData() {
        //获取数据
        let list = localStorage.getItem("ShopCartInfo");
        if (list) {
            return JSON.parse(list);
        } else {
            return [];
        }
    },
    setData(data) {
        //保存数据
        localStorage.setItem("ShopCartInfo", JSON.stringify(data));
    }
};

class ShopCart extends Component {
    constructor() {
        super();
        this.state = {
            NavBoxStyle: false,//用于导航盒子的显示和隐藏
            cartData: [],//用于存放请求回来的购物商品数据
            Total_price: 0,//总价
            Purchase_quantity: 0,//购买数量
            all_checked: false//用于全选按钮的判断
        }
        this.NavBoxStyle = this.NavBoxStyle.bind(this)
        this.add_num = this.add_num.bind(this)
        this.reduce_num = this.reduce_num.bind(this)
        this.refresh = this.refresh.bind(this)
        this.delete = this.delete.bind(this)
        this.all_checked = this.all_checked.bind(this)
        this.refresh_checked = this.refresh_checked.bind(this)
    }
    async componentDidMount() {
        // 前端+后端操作——获取数据
        let num = 0//计数
        if (ShopCartInfo.getData().length) {
            this.refresh_checked()
            this.setState({
                cartData: ShopCartInfo.getData()
            })
            this.refresh()
        }
        else {
            ShopCartInfo.setData(await Cart_data())
            this.setState({
                cartData: ShopCartInfo.getData()
            })
        }
        // 数据库操作——获取数据
        // this.setState({
        //     cartData: await Cart_data()
        // })

    }
    //用于切换导航盒子显隐
    NavBoxStyle(boolean) {
        this.setState({
            NavBoxStyle: boolean
        })
    }
    //切换复选框操作
    async onChange(id, e_bol) {
        //前端操作——修改local中的值
        let new_local = ShopCartInfo.getData()
        new_local.forEach(item => {
            if (item[0].id == id) {
                item[0].detail.checked = !e_bol
            }
        })
        ShopCartInfo.setData(new_local)
        this.setState({
            cartData: ShopCartInfo.getData()
        })
        this.refresh_checked()
        this.refresh()
        // 数据库操作——修改数据库中的值：复选框的布尔值
        // let boolean = e_bol
        // const data = await Modify_cart(id, boolean)
        // this.setState({
        //     cartData: await Cart_data()
        // })
        // this.refresh()
    }
    //增加商品购买数量
    async add_num(id, num, stock_num) {
        // 前端操作——购买数量
        let new_local = ShopCartInfo.getData()
        new_local.forEach(item => {
            if (item[0].id == id) {
                if (num < stock_num) {
                    item[0].detail.buy_num++
                } else {
                    item[0].detail.buy_num = stock_num
                }
            }
        })
        ShopCartInfo.setData(new_local)
        this.setState({
            cartData: ShopCartInfo.getData()
        })
        this.refresh()
        // //数据库操作——修改数据库的值：购买数量
        // if (num < stock_num) {//与库存相互对比
        //     num++;
        //     const data = await add_num(id, num)
        //     this.setState({
        //         cartData: await Cart_data()
        //     })
        //     this.refresh()
        // }
        // if (num >= stock_num) {//与库存相互对比
        //     num = stock_num
        //     const data = await add_num(id, num)
        //     this.setState({
        //         cartData: await Cart_data()
        //     })
        //     this.refresh()
        // }
    }
    //减少商品购买数量
    async reduce_num(id, num) {
        // 前端操作——购买数量
        let new_local = ShopCartInfo.getData()
        new_local.forEach(item => {
            if (item[0].id == id) {
                if (num > 1) {
                    item[0].detail.buy_num--
                } else {
                    item[0].detail.buy_num = 1
                }
            }
        })
        ShopCartInfo.setData(new_local)
        this.setState({
            cartData: ShopCartInfo.getData()
        })
        this.refresh()
        // //数据库操作——修改数据库的值：购买数量
        // if (num > 1) {
        //     num--
        //     const data = await reduce_num(id, num)
        //     this.setState({
        //         cartData: await Cart_data()
        //     })
        //     this.refresh()
        // }
        // if (num <= 1) {
        //     num = 1
        //     const data = await reduce_num(id, num)
        //     this.setState({
        //         cartData: await Cart_data()
        //     })
        //     this.refresh()
        // }
    }
    //刷新，用于总价与购买数量
    refresh() {
        let all_pri = 0;
        let all_buy_num = 0;
        ShopCartInfo.getData().forEach(item => {
            if (item[0].detail.checked == true) {
                all_pri += item[0].detail.buy_num * item[0].detail.price
                all_buy_num += item[0].detail.buy_num * 1
            }
        })
        this.setState({
            Total_price: all_pri,
            Purchase_quantity: all_buy_num
        })
    }
    refresh_checked() {
        let new_local = ShopCartInfo.getData()
        let bol = new_local.every(item => {
            return item[0].detail.checked
        })
        if (bol) {
            this.setState({
                all_checked: true
            })
        }
        else {
            this.setState({
                all_checked: false
            })
        }
    }
    //删除按钮
    async delete() {
        //前端操作——删除checked的值为true的数据
        let new_local = ShopCartInfo.getData()
        let new_data = new_local.filter(item => !item[0].detail.checked)
        ShopCartInfo.setData(new_data)
        this.setState({
            cartData: ShopCartInfo.getData()
        })
        // //数据库操作——删除checked的值为true的数据
        // const data = await delete_data()
        // this.setState({
        //     cartData: await Cart_data()
        // })
        // this.refresh()
    }
    //全选按钮
    all_checked() {
        if (this.state.all_checked) {
            let new_local = ShopCartInfo.getData()
            new_local.forEach(item => {
                item[0].detail.checked = false
            })
            ShopCartInfo.setData(new_local)
            this.setState({
                cartData: ShopCartInfo.getData(),
                all_checked: false
            })
            this.refresh()
        }
        else {
            let new_local = ShopCartInfo.getData()
            new_local.forEach(item => {
                item[0].detail.checked = true
            })
            ShopCartInfo.setData(new_local)
            this.setState({
                cartData: ShopCartInfo.getData(),
                all_checked: true
            })
            this.refresh()
        }

    }
    render() {
        // 数据放在前端操作需要的模板
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
                    <a className="delete_data"
                        style={this.state.cartData.length ? { display: 'block' } : { display: 'none' }}
                        onClick={() => this.delete()}>删除</a>
                </div>
                {/* 购物车主体 */}
                <div className="cart_box">
                    {/* 存在商品时 */}
                    <div className="true_cart" style={this.state.cartData.length ? { display: 'block' } : { display: 'none' }}>
                        <div className="true_box">
                            <List>
                                {this.state.cartData.map((item, index) => (
                                    <CheckboxItem
                                        id={item[0].id} key={index}
                                        checked={item[0].detail.checked}
                                        onChange={() => this.onChange(item[0].id, item[0].detail.checked)}
                                    >
                                        {/* 图片 */}
                                        <div className="del_img">
                                            <img src={item[0].detail.swiperImg[0]}></img>
                                        </div>
                                        {/* 名称与价格 */}
                                        <div className="del_name">
                                            <h4>{item[0].detail.name}</h4>
                                            <p>单价：
                                                        <font>¥ {item[0].detail.price}</font>
                                            </p>
                                            <span>库存:
                                                        <font> {item[0].detail.stock}</font>
                                            </span>
                                        </div>
                                        {/* 增加与减少 */}
                                        <div className="del_btnNum">
                                            <a className="add_btn" onClick={() => this.reduce_num(item[0].id, item[0].detail.buy_num)}></a>
                                            <input value={item[0].detail.buy_num} onChange={this.componentDidMount} />
                                            <a className="reduce_btn" onClick={() => this.add_num(item[0].id, item[0].detail.buy_num, item[0].detail.stock)}></a>
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
                <div className="Check_out" style={this.state.cartData.length ? { display: 'block' } : { display: 'none' }}>
                    <CheckboxItem onChange={() => this.all_checked()} checked={this.state.all_checked}>
                        <p className="all_checked">全选</p>
                        {/* 总价与购买数量 */}
                        <div className="price_num">
                            <p className="total_price">共计：
                                        <font>¥ {this.state.Total_price}.00</font>
                            </p>
                            <p className="all_num">数量：
                                        <font>{this.state.Purchase_quantity}件</font>
                            </p>
                        </div>
                        {/* 结算按钮 */}
                        <div className="settlement">结算</div>
                    </CheckboxItem>
                </div>
            </div>
        )
        // // 数据库操作需要的模板
        // return (
        //     <div className="shopcart_box">
        //         {/* 头部 */}
        //         <div className="cart_head">
        //             <a className="cart_title" title="周边首页"></a>
        //             <div className="cart_nav" title="导航" onClick={() => { this.NavBoxStyle(true) }}></div>
        //             {/* 隐藏的导航盒子 */}
        //             <NavData style_boolean={[
        //                 this.state.NavBoxStyle,
        //                 this.NavBoxStyle
        //             ]} />
        //             <a className="delete_data"
        //                 style={this.state.cartData.length ? { display: 'block' } : { display: 'none' }}
        //                 onClick={() => this.delete()}>删除</a>
        //         </div>
        //         {/* 购物车主体 */}
        //         <div className="cart_box">
        //             {/* 存在商品时 */}
        //             <div className="true_cart" style={this.state.cartData.length ? { display: 'block' } : { display: 'none' }}>
        //                 <div className="true_box">
        //                     <List>
        //                         {this.state.cartData.map((item, index) => (
        //                             <CheckboxItem
        //                                 id={item.id} key={index}
        //                                 checked={item.detailData.checked}
        //                                 onChange={() => this.onChange(item.id, item.detailData.checked)}
        //                             >
        //                                 {/* 图片 */}
        //                                 <div className="del_img">
        //                                     <img src={item.detailData.swiperImg[0]}></img>
        //                                 </div>
        //                                 {/* 名称与价格 */}
        //                                 <div className="del_name">
        //                                     <h4>{item.detailData.name}</h4>
        //                                     <p>单价：
        //                                         <font>¥ {item.detailData.price}</font>
        //                                     </p>
        //                                     <span>库存:
        //                                         <font> {item.detailData.stock}</font>
        //                                     </span>
        //                                 </div>
        //                                 {/* 增加与减少 */}
        //                                 <div className="del_btnNum">
        //                                     <a className="add_btn" onClick={() => this.reduce_num(item.id, item.detailData.buy_num)}></a>
        //                                     <input value={item.detailData.buy_num} onChange={this.componentDidMount} />
        //                                     <a className="reduce_btn" onClick={() => this.add_num(item.id, item.detailData.buy_num, item.detailData.stock)}></a>
        //                                 </div>
        //                             </CheckboxItem>
        //                         ))}
        //                     </List>
        //                 </div>
        //             </div>
        //             {/* 不存在商品时 */}
        //             <div className="false_cart"
        //                 onClick={() => { this.props.history.push('/list') }}
        //                 style={this.state.cartData.length ? { display: 'none' } : { display: 'block' }}
        //             >
        //                 <img src="https://img.dnfcity.qq.com/weixin20/base/cart_no.png"></img>
        //             </div>
        //         </div>
        //         {/* 结算盒子 */}
        //         <div className="Check_out" style={this.state.cartData.length ? { display: 'block' } : { display: 'none' }}>
        //             <CheckboxItem onChange={() => this.all_checked()} checked={this.state.all_checked}>
        //                 <p className="all_checked">全选</p>
        //                 {/* 总价与购买数量 */}
        //                 <div className="price_num">
        //                     <p className="total_price">共计：
        //                         <font>¥ {this.state.Total_price}.00</font>
        //                     </p>
        //                     <p className="all_num">数量：
        //                         <font>{this.state.Purchase_quantity}件</font>
        //                     </p>
        //                 </div>
        //                 {/* 结算按钮 */}
        //                 <div className="settlement">结算</div>
        //             </CheckboxItem>
        //         </div>
        //     </div>
        // )
    }
}

export default ShopCart;