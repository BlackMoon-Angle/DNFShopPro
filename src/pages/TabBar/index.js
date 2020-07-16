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
            selectedTab: 'home',
            hidden: false,
        };
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
                        key="home"
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
                        selected={this.state.selectedTab === 'home'}
                        // badge={1}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'home',
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
                        key="list"
                        // badge={'new'}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                            this.props.history.push('/list/:id')
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
                        key="cart"
                        // dot
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
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
                        key="user"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
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