import React, {Component} from 'react';
import '../../css/LoginDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

import $ from 'jquery';

window.jQuery = $;
require('semantic-ui/dist/semantic.min.css');
require('semantic-ui/dist/semantic.min.js');

export default class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'signIn',//默认进入登录界面
            formData: {
                email: '',
                username: '',
                password: '',
            },
            status_code: {
                1: '请不要往同一个邮件地址发送太多邮件！',
                125: '电子邮箱地址无效',
                202: '用户名已经被占用!',
                203: '电子邮箱地址已经被占用!',
                204: '没有提供电子邮箱地址！',
                205: '找不到电子邮箱地址对应的用户',
                210: '用户名和密码不匹配!',
                211: '找不到用户!',
                219: '登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码!',
                unknown: '请求失败，请稍后再试!'
            },
            error_record: ''
        }
    }

    //插入 dom 之后调用
    componentDidMount() {
        this.check(".ui.large.form");
    }


    //重新渲染后调用
    componentWillUpdate() {
        this.check(".ui.large.form");
    }

    /*注册*/
    signUp(e) {
        e.preventDefault();// 阻止打开打开一个新页面
        let {email, username, password} = this.state.formData;
        let success = (user) => {
            this.props.onSignUp.call(null, user)
        };
        let error = (error) => {
            console.log(error);
            this.getErrorMessage(error.code);
            $('.ui.basic.modal').modal('show');
        };
        if (!username || !password || !email) {
            return false;
        }
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
            return false;
        }
        if (!/^\w{6,}$/.test(password)) {
            return false;
        }
        
        /*leanCloud.js*/
        signUp(email, username, password, success, error);
    }

    /*登录*/
    signIn(e) {
        e.preventDefault();
        let {username, password} = this.state.formData;
        let success = (user) => {
            this.props.onSignIn.call(null, user);
        };
        let error = (error) => {
            console.log(error);
            this.getErrorMessage(error.code);
            $('.ui.basic.modal').modal('show');
        };
        if (!username || !password) {
            return false;
        }
        if (!/^\w{6,}$/.test(password)) {
            return false;
        }
        signIn(username, password, success, error);

    }

    //获取错误信息
    getErrorMessage(code) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.error_record = this.state.status_code[code] || this.state.status_code.unknown;
        this.setState(stateCopy);
    }

    changeFormData(key, e) {
        let stateCopy = JSON.parse(JSON.stringify(this.state)); // 用 JSON 深拷贝
        stateCopy.formData[key] = e.target.value;
        this.setState(stateCopy)
    }

    render() {
        let center = 'center';
        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <img src="http://ohggtqwxx.bkt.clouddn.com/todo.png" className="image" alt="图标"/>
                        <div className="content addFont">
                            A simple and pithy TodoList
                        </div>
                    </h2>
                    {this.state.selectedTab === 'signIn'
                        ? <SignInForm
                            formData={this.state.formData}
                            onSignIn={this.signIn.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onForgotPassword={this.showForgotPassword.bind(this)}
                            returnToSignUp={this.returnToSignUp.bind(this)}/>
                        : this.state.selectedTab === 'signUp'
                            ? <SignUpForm
                                formData={this.state.formData}
                                onChange={this.changeFormData.bind(this)}
                                onSignUp={this.signUp.bind(this)}
                                returnToSignIn={this.returnToSignIn.bind(this)}
                            />
                            : <ForgotPasswordForm
                                formData={this.state.formData}
                                onSubmit={this.resetPassword.bind(this)}
                                onChange={this.changeFormData.bind(this)}
                                returnToSignIn={this.returnToSignIn.bind(this)}/>
                    }


                    <div className="ui basic modal">
                        <div className="ui icon header">
                            <i className="remove icon"></i> 错误信息
                        </div>
                        <div className="content">
                            <div className="description">
                                <p style={{textAlign: center}}>{this.state.error_record}</p>
                            </div>
                        </div>
                        <div className="actions">
                            <div className="ui green ok inverted button">
                                知道了
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    //重置密码
    showForgotPassword() {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = 'forgotPassword';
        this.setState(stateCopy);
    }

    //返回注册
    returnToSignUp() {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = 'signUp';
        this.setState(stateCopy);
    }

    //返回登录
    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = 'signIn';
        this.setState(stateCopy);
    }

    //重置密码
    resetPassword(e) {
        e.preventDefault();
        let success = (success) => {
            alert("发送成功!")
        };
        let error = (error) => {
            console.log(error);
            this.getErrorMessage(error.code);
            $('.ui.basic.modal').modal('show');
        };
        /*邮件没有输入的时候不发出请求*/
        if (!this.state.formData.email) {
            return false;
        }
        /*邮箱格式错误不发出请求*/
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.formData.email)) {
            return false;
        }
        sendPasswordResetEmail(this.state.formData.email, success, error);
    }

    //验证输入的有效性，参数为表单容器
    check(el) {
        $(el).form({
            fields: {
                email: {
                    identifier: 'email',
                    rules: [
                        {
                            type: 'email',
                            prompt: '请输入有效的邮箱格式！'
                        }
                    ]
                },
                username: {
                    identifier: 'username',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '用户名不能为空！'
                        }
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '密码不能为空！'
                        },
                        {
                            type: 'minLength[6]',
                            prompt: '密码必须至少 {ruleValue} 位！'
                        }
                    ]
                }
            },
            inline: true,
            on: 'blur'
        });
    }
}