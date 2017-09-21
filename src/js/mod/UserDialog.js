import React, {Component} from 'react';
import '../../css/UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import SignInOrSignUp from './SignInOrSignUp'
import ForgotPasswordForm from './ForgotPasswordForm'
import '../../bootstrap/css/bootstrap.min.css'
import '../../bootstrap/css/bootstrapValidator.css'
import $ from 'jquery';

window.jQuery = $;
require('bootstrap/dist/js/bootstrap.min.js');
require('../../bootstrap/js/bootstrapValidator.js');


export default class UserDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: '',
            }
        }
    }

    //插入 dom 之后调用
    componentDidMount() {
        this.check("#defaultForm");
    }
    /*注册*/
    signUp(e) {
        e.preventDefault();// 阻止打开打开一个新页面
        let {email, username, password} = this.state.formData;
        let success = (user) => {
            this.props.onSignUp.call(null, user)
        };
        let error = (error) => {
            switch (error.code) {
                case 202:
                    alert('用户名已被占用');
                    break;
                default:
                    alert(error);
                    break;
            }
        };
        if (!this.state.formData.username || !this.state.formData.password || !this.state.formData.email) {
            return false;
        }
        /*leanCloud.js*/
        signUp(email, username, password, success, error)
    }

    /*登录*/
    signIn(e) {
        e.preventDefault();
        let {username, password} = this.state.formData;
        let success = (user) => {
            this.props.onSignIn.call(null, user)
        };
        let error = (error) => {
            switch (error.code) {
                case 210:
                    alert('用户名与密码不匹配');
                    break;
                default:
                    alert(error);
                    break;
            }
        };
        if (!this.state.formData.username || !this.state.formData.password) {
            return false;
        }
        signIn(username, password, success, error)
    }

    changeFormData(key, e) {
        let stateCopy = JSON.parse(JSON.stringify(this.state)); // 用 JSON 深拷贝
        stateCopy.formData[key] = e.target.value;
        this.setState(stateCopy)
    }

    render() {
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp'
                        ? <SignInOrSignUp
                            formData={this.state.formData}
                            onSignIn={this.signIn.bind(this)}
                            onSignUp={this.signUp.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onForgotPassword={this.showForgotPassword.bind(this)}/>
                        : <ForgotPasswordForm
                            formData={this.state.formData}
                            onSubmit={this.resetPassword.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onSignIn={this.returnToSignIn.bind(this)}/>}
                </div>
            </div>
        )
    }

    showForgotPassword() {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = 'forgotPassword';
        this.setState(stateCopy);
    }

    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = 'signInOrSignUp';
        this.setState(stateCopy);
    }

    //重置密码
    resetPassword(e) {
        e.preventDefault();
        sendPasswordResetEmail(this.state.formData.email);
    }

    /*验证表单正确性
    * 参数：1.表单容器元素 el  2. 提交按钮元素 btn
    * */
    check(el) {
        $(el).bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                username: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        stringLength: {
                            min: 4,
                            max: 18,
                            message: '用户名长度必须在4到18位之间'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]+$/,
                            message: '用户名只能包含大写、小写、数字和下划线'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: '邮箱不能为空'
                        },
                        emailAddress: {
                            message: '输入不是有效的电子邮件地址'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 18,
                            message: '密码长度必须在6到18位之间'
                        }
                    }
                }
            }
        });
        // $(btn).click(function () {
        //     $(el).bootstrapValidator('validate');
        // });
    }
}