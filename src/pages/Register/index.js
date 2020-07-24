import React, { Component } from 'react';
//导航栏组件
import { NavBar, Icon } from 'antd-mobile';
//表单组件
import { List, InputItem } from 'antd-mobile';
//表单事件接口
import { register } from '../../api/UserApi'
//验证码
import Captcha from 'captcha-mini'
import '../Login/index.scss'
//对话框组件
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
const alert = Modal.alert;
class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            captcha: '',
            user_captcha: '',
            canvas_box: false,//控制验证码显示框的显隐
            captcha_div_text: '获取验证码'
        }
        this.registerBtn = this.registerBtn.bind(this)
        this.fn_captcha = this.fn_captcha.bind(this)
    }
    componentDidMount() {
        this.fn_captcha()
    }
    fn_captcha() {
        let captcha1 = new Captcha();
        captcha1.draw(document.querySelector('#captcha1'), val => {
            this.setState({
                captcha: val
            })
        });
    }
    Captcha_btn() {
        if (!this.state.canvas_box) {
            this.setState({
                captcha_div_text: '隐藏验证码框',
                canvas_box: !this.state.canvas_box
            })
        }
        if (this.state.canvas_box) {
            this.setState({
                captcha_div_text: '获取验证码',
                canvas_box: !this.state.canvas_box
            })
        }
    }
    async registerBtn() {
        let uPattern = /^[a-zA-Z0-9]{4,16}$/;
        let username = this.state.username
        let password = this.state.password
        let user_captcha = this.state.user_captcha
        if (username != '' && password != '') {
            if (user_captcha == this.state.captcha) {
                if (uPattern.test(username) && uPattern.test(password)) {
                    const data = await register(username, password)
                    if (data.flag) {
                        alert('注册提示', <div>注册成功！</div>, [
                            { text: '确定', onPress: () => this.props.history.push('/login') },
                        ])
                    }
                    else {
                        alert('注册提示', <div>注册失败，用户名已存在！</div>, [
                            {
                                text: '确定', onPress: () => {
                                    this.fn_captcha();
                                    this.setState({ password: '', user_captcha: '' })
                                }
                            },
                        ])
                    }
                } else {
                    alert('注册提示', <div>用户名或密码输入格式不正确！</div>, [
                        {
                            text: '确定', onPress: () => {
                                this.fn_captcha();
                                this.setState({ username: '', password: '', user_captcha: '' })
                            }
                        },
                    ])
                }
            }
            else {
                alert('注册提示', <div>验证码输入错误！</div>, [
                    {
                        text: '确定', onPress: () => {
                            this.fn_captcha();
                            this.setState({ password: '', user_captcha: '' })
                        }
                    },
                ])
            }
        }
        else {
            alert('注册提示', <div>用户名或密码不能为空！</div>, [
                { text: '确定' },
            ])
        }
    }
    render() {
        return (
            <div className="register_box">
                {/* 导航头 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.push('/login') }}
                >注册</NavBar>
                {/* 表单 */}
                <List renderHeader={() => ''}>
                    <InputItem
                        clear
                        placeholder="4到16位(字母,数字）"
                        value={this.state.username}
                        onChange={(val) => { this.setState({ username: val }) }}
                    >用户名</InputItem>
                    <InputItem
                        clear
                        placeholder="4到16位(字母,数字）"
                        value={this.state.password}
                        type={'password'}
                        onChange={(val) => { this.setState({ password: val }) }}
                    >密码</InputItem>
                    {/* 验证码框 */}
                    <div className="canvas_box" style={this.state.canvas_box == false ? { height: '0' } : { height: '45vw' }}>
                        <canvas id="captcha1"></canvas>
                    </div>
                    <InputItem
                        width={100}
                        clear
                        placeholder="请输入验证码"
                        value={this.state.user_captcha}
                        onChange={(val) => { this.setState({ user_captcha: val }) }}
                    >验证码</InputItem>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'right' }}
                            onClick={() => { this.Captcha_btn() }}
                        >{this.state.captcha_div_text}</div>
                    </List.Item>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={this.registerBtn}
                        >注册</div>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default Register;