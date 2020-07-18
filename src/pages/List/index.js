import React, { Component } from 'react';
import './index.scss'
import http from '../../utils/Http'
import { withRouter } from 'react-router-dom'
//可显隐式商品导航组件
import NavData from '../../utils/NavData'
class List extends Component {
    constructor() {
        super();
        this.state = {
            list_goodsData: [],//用于存储请求的列表页商品数据
            NavBoxStyle: false//用于导航盒子的显示和隐藏
        }
        this.NavBoxStyle = this.NavBoxStyle.bind(this)
        this.List_li_Id = this.List_li_Id.bind(this)
    }
    //进入页面立刻渲染数据
    async componentDidMount() {
        this.setState({
            list_goodsData: await http.get('/good/listGoods')
        })
    }
    //用于切换导航盒子显隐
    NavBoxStyle(boolean) {
        this.setState({
            NavBoxStyle: boolean
        })
    }
    //点击后获取li的id
    List_li_Id(e) {
        let id = e.currentTarget.id
        this.props.history.push('/detail/' + id)
    }
    render() {
        return (
            <div className="list_wrap">
                {/* 头部 */}
                <div className="list_head">
                    <a onClick={() => { this.props.history.push('/home') }} className="back_home">
                        <i> ＜返回</i>
                    </a>
                    <h1 className="list_title">全部商品</h1>
                    <a className="list_head_search" title="搜索"></a>
                    <div className="list_goodsNav" title="导航" onClick={() => { this.NavBoxStyle(true) }}></div>
                    {/* 隐藏的导航盒子 */}
                    <NavData style_boolean={[
                        this.state.NavBoxStyle,
                        this.NavBoxStyle
                    ]} />
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
                                    return <li key={index} id={item.id} onClick={(e) => { this.List_li_Id(e) }}>
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

export default withRouter(List);