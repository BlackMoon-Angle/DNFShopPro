import React, { Component } from 'react';
import './index.scss'
import http from '../../utils/Http'
import { withRouter } from 'react-router-dom'
//可显隐式商品导航组件
import NavData from '../../utils/NavData'
// 商品请求Api
import { List_data } from '../../api/GoodsApi'
class List extends Component {
    constructor() {
        super();
        this.state = {
            list_goodsData: [],//用于存储请求的列表页商品数据
            NavBoxStyle: false,//用于导航盒子的显示和隐藏
            i_color: 'default'
        }
        this.NavBoxStyle = this.NavBoxStyle.bind(this)
        this.List_li_Id = this.List_li_Id.bind(this)
    }
    //进入页面立刻渲染数据
    async componentDidMount() {
        this.setState({
            list_goodsData: await List_data()
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
    // 升序价格
    ascending() {
        let data = this.state.list_goodsData;
        data.sort((a, b) => {
            //排序基于的数据
            return b.price - a.price;
        });
        this.setState({
            list_goodsData: data,
            i_color: 'ascending'
        })
    }
    // 降序价格
    descending() {
        let data = this.state.list_goodsData;
        data.sort((a, b) => {
            //排序基于的数据
            return a.price - b.price;
        });
        this.setState({
            list_goodsData: data,
            i_color: 'descending'
        })
    }
    //默认排序
    async default_data() {
        this.setState({
            list_goodsData: await List_data(),
            i_color: 'default'
        })
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
                            <div>
                                <i
                                    onClick={() => this.default_data()}
                                    className={this.state.i_color == 'default' ? "i_color" : ""}
                                >默认</i>
                            </div>
                            <div>
                                <i
                                    onClick={() => this.ascending()}
                                    className={this.state.i_color == 'ascending' ? "i_color" : ""}
                                >↑价格</i>
                            </div>
                            <div>
                                <i
                                    onClick={() => this.descending()}
                                    className={this.state.i_color == 'descending' ? "i_color" : ""}
                                >↓价格</i>
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