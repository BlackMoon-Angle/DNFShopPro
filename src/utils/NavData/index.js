import React, { Component } from 'react';
import http from '../Http'
import './index.scss'

class NavData extends React.Component {
    constructor() {
        super();
        this.state = {
            nav_ul: [],//用于存储请求的首页导航数据
        }
        this.NavBoxStyle = this.NavBoxStyle.bind(this)
    }
    //立即请求商品导航数据
    async componentDidMount() {
        this.setState({
            nav_ul: await http.get('/good/homeNav'),
        })
    }
    NavBoxStyle(boolean) {

    }
    render() {
        return (
            <div className="nav_box" style={this.props.style_boolean[0] == false ? { height: '0' } : { height: '100%' }}>
                <div className="nav_box_pop">
                    <h1 className="nav_box_title">人气系列</h1>
                    <ul className="nav_ul">
                        <li>
                            {
                                this.state.nav_ul.map((item, index) => {
                                    return <a key={index}>
                                        <span>{item.title}</span>
                                        <img src={item.img}></img>
                                    </a>
                                })
                            }
                        </li>
                    </ul>
                    <div className="nav_close" onClick={() => { this.props.style_boolean[1](false) }}></div>
                </div>
            </div>
        )
    }
}

export default NavData;