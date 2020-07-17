import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import './index.scss';

//引入外部图片
import home from '../../../public/img/home/home.png'
import home_color from '../../../public/img/home/home_color.png'
import list from '../../../public/img/list/list.png'
import list_color from '../../../public/img/list/list_color.png'
import cart from '../../../public/img/cart/cart.png'
import cart_color from '../../../public/img/cart/cart_color.png'
import user from '../../../public/img/user/user.png'
import user_color from '../../../public/img/user/user_color.png'

class TabBarExample extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTab: '',
            hidden: false,
        };
    }
    //监听路由变化，防止刷新页面时的路由高光不正确
    componentDidMount() {
        this.setState({
            selectedTab: this.props.history.location.pathname
        });
    }
    renderContent(pageText) {
        return (
            <div></div>
        );
    }
    render() {
        return (
            <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#ef524b"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="/home"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(' + home + ') center center /  22px 22px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(' + home_color + ') center center /  22px 22px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === '/home'}
                        // badge={1}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/home',
                            });
                            this.props.history.push('/home')
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent('Life')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + list + ') center center /  22px 22px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + list_color + ') center center /  22px 22px no-repeat'
                            }}
                            />
                        }
                        title="精选"
                        key="/list"
                        // badge={'new'}
                        selected={this.state.selectedTab === '/list'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/list',
                            });
                            this.props.history.push('/list')
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('Koubei')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + cart + ') center center /  22px 22px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + cart_color + ') center center /  22px 22px no-repeat'
                            }}
                            />
                        }
                        title="购物车"
                        key="/shopcart"
                        // dot
                        selected={this.state.selectedTab === '/shopcart'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/shopcart',
                            });
                            this.props.history.push('/shopcart')
                        }}
                    >
                        {this.renderContent('Friend')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: '' + user + '' }}
                        selectedIcon={{ uri: '' + user_color + '' }}
                        title="我的"
                        key="/user"
                        selected={this.state.selectedTab === '/user'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/user',
                            });
                            this.props.history.push('/user')
                        }}
                    >
                        {this.renderContent('My')}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default withRouter(TabBarExample);