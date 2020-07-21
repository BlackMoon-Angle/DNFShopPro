import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import '../public/css/common.css';


//标签栏组件
import 'antd-mobile/dist/antd-mobile.css';
import TabBarExample from './utils/TabBar';

// 引入页面组件
import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import ShopCart from './pages/ShopCart'
import User from './pages/User'
import Login from './pages/Login'
import Register from './pages/Register'
import Modify from './pages/ModifyPaw'


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
      title: '列表页',
      path: '/detail/:id',
      icon: <Detail />,
      component: Detail,
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
    },
    {
      title: '登录',
      path: '/login',
      icon: <Login />,
      component: Login,
    },
    {
      title: '注册',
      path: '/register',
      icon: <Register />,
      component: Register,
    },
    {
      title: '修改密码',
      path: '/modify',
      icon: <Modify />,
      component: Modify,
    }],
    route_pathname: true
  }
  componentDidMount() {
    //判断刷新后，页面是否停留在详细页
    if (this.props.history.location.pathname.split('/')[1] == 'detail') {
      this.setState({
        route_pathname: false,
      })
    }
    else {
      this.setState({
        route_pathname: true,
      })
    }
    //监听路由变化
    this.props.history.listen(route => {
      if (route.pathname.split('/')[1] == 'detail') {
        this.setState({
          route_pathname: false,
        })
      }
      else {
        this.setState({
          route_pathname: true,
        })
      }
    })
  }
  render() {
    return (
      <div className="App">
        <Switch>
          {/* 打开页面默认打开首页 */}

          {/* 路由 */}
          <Route exact strict path='/home' component={Home} />
          <Route exact strict path='/list' component={List} />
          <Route exact strict path='/detail/:id' component={Detail} />
          <Route exact strict path='/shopcart' component={ShopCart} />
          <Route exact strict path='/user' component={User} />
          <Route exact strict path='/login' component={Login} />
          <Route exact strict path='/register' component={Register} />
          <Route exact strict path='/modify' component={Modify} />
          <Redirect from='/' to='/home' exact strict />
        </Switch>
        <div style={this.state.route_pathname == true ? { display: 'block' } : { display: 'none' }}><TabBarExample /></div>
      </div>
    )
  }
}

export default withRouter(App);
