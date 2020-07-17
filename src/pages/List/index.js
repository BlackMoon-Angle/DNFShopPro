import React, { Component } from 'react';
import './index.scss'

class List extends Component {
    constructor() {
        super();
        this.state = {
            list_goodsData: [],//用于存储请求的列表页商品数据
        }
    }
    //进入页面立刻渲染数据
    componentDidMount() {
        fetch('/json/listGoods.json')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    list_goodsData: data
                })
            })
    }
    render() {
        return (
            <div className="list_wrap">
                {/* 头部 */}
                <div className="list_head">
                    <a onClick={() => {this.props.history.push('/home')}} className="back_home">
                        <i> ＜返回</i>
                    </a>
                    <h1 className="list_title">全部商品</h1>
                    <a className="list_head_search" title="搜索"></a>
                    <div className="list_goodsNav"></div>
                    {/* 商品排列选项 */}
                    <div className="list_goodsOption">
                        <div className="goodsOption_box">
                            <div className="i_color">
                                <i>默认</i>
                            </div>
                            <div>
                                <i>价格</i>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 列表页商品列表 */}
                <div className="list_goods">
                    <div className="goods_data">
                        <ul>
                            {
                                this.state.list_goodsData.map((item, index) => {
                                    return <li key={index} id={item.id}>
                                        <div className="goods_img">
                                            <img src={item.img}></img>
                                        </div>
                                        <p className="goods_name">{item.title}</p>
                                        <p className="goods_price">
                                            <font>¥ {item.price}</font>
                                        </p>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default List;