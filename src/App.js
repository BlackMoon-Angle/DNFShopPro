import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import '../public/css/common.css';


//标签栏组件
import 'antd-mobile/dist/antd-mobile.css';
import TabBarExample from './pages/TabBar';

// 引入页面组件
import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import ShopCart from './pages/ShopCart'
import User from './pages/User'
import Login from './pages/Login'
import Register from './pages/Register'


class App extends React.Component {
  state = {
    // current: '/home',
    menu: [{
      title: '首页',
      path: '/home',
      icon: <Home />,
      component: Home,
    },
    {
      title: '列表页',
      path: '/list',
      icon: <List />,
      component: List,
    },
    {
      title: '购物车',
      path: '/shopcart',
      icon: <ShopCart />,
      component: ShopCart,
    },
    {
      title: '我的',
      path: '/user',
      icon: <User />,
      component: User,
    }]
  }
  render() {
    return (
      <div className="App">
        <Switch>
          {/* 打开页面默认打开首页 */}
          
          {/* 路由 */}
          <Route exact strict path='/home' component={Home} />
          <Route exact strict path='/list/:id' component={List} />
          <Route exact strict path='/shopcart' component={ShopCart} />
          <Route exact strict path='/user' component={User} />
          <Redirect from='/' to='/home' exact strict />
        </Switch>
        <TabBarExample />
      </div>
    )
  }
}

export default App;
