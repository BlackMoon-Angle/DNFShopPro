import React, { Component } from 'react';
import './index.scss'
class ShopCart extends Component{
    render(){
        return(
            <div className="shopcart_box">
                {/* 头部 */}
                <div className="cart_head">
                    <a className="cart_title" title="周边首页"></a>
                    <div className="cart_nav" title="导航"></div>
                </div>
                {/* 购物车主体 */}
                <div className="cart_box"></div>
            </div>
        )
    }
}

export default ShopCart;