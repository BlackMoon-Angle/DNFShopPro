import React, { Component } from 'react';
import './index.scss'
import http from '../../utils/Http'
//可显隐式商品导航组件
import NavData from '../../utils/NavData'
class ShopCart extends Component {
    constructor() {
        super();
        this.state = {
            NavBoxStyle: false,//用于导航盒子的显示和隐藏
            cartData: ''//用于存放请求回来的购物商品数据
        }
        this.NavBoxStyle = this.NavBoxStyle.bind(this)
    }
    async componentDidMount(){
        this.setState({
            cartData: await http.get('/good/cartData')
        })
        console.log(this.state.cartData)
        // this.state.cartData.forEach(item => {
        //     console.log(JSON.parse(item.detailData))
        // })
    }
    //用于切换导航盒子显隐
    NavBoxStyle(boolean) {
        this.setState({
            NavBoxStyle: boolean
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
                    <div className="true_cart">
                        <div className="true_box">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopCart;