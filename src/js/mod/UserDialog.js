import React, {Component} from 'react';
import '../../css/UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import SignInOrSignUp from './SignInOrSignUp'
import ForgotPasswordForm from './ForgotPasswordForm'
import $ from 'jquery';
import '../../bootstrap/js/bootstrap.min.js'
import '../../bootstrap/js/bootstrapValidator.js'

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
//     componentDidMount(){
//
//         $('form').bootstrapValidator({
// //        live: 'disabled',
//                 message: 'This value is not valid',
//                 feedbackIcons: {
//                     valid: 'glyphicon glyphicon-ok',
//                     invalid: 'glyphicon glyphicon-remove',
//                     validating: 'glyphicon glyphicon-refresh'
//                 },
//                 fields: {
//                     /*
//                     firstName: {
//                         validators: {
//                             notEmpty: {
//                                 message: '姓名不能为空'
//                             }
//                         }
//                     },
//                     lastName: {
//                         validators: {
//                             notEmpty: {
//                                 message: '姓名不能为空'
//                             }
//                         }
//                     },
//                     */
//                     username: {
//                         message: '用户名无效',
//                         validators: {
//                             notEmpty: {
//                                 message: '用户名不能位空'
//                             },
//                             stringLength: {
//                                 min: 6,
//                                 max: 30,
//                                 message: '用户名必须大于6，小于30个字'
//                             },
//                             regexp: {
//                                 regexp: /^[a-zA-Z0-9_\.]+$/,
//                                 message: '用户名只能由字母、数字、点和下划线组成'
//                             },
//                             remote: {
//                                 url: '#',
//                                 message: '用户名不可用'
//                             },
//                             different: {
//                                 field: 'password',
//                                 message: '用户名和密码不能相同'
//                             }
//                         }
//                     },
//                     email: {
//                         validators: {
//                             emailAddress: {
//                                 message: '输入不是有效的电子邮件地址'
//                             }
//                         }
//                     },
//                     password: {
//                         validators: {
//                             notEmpty: {
//                                 message: '密码不能位空'
//                             },
//                             identical: {
//                                 field: 'confirmPassword',
//                                 message: '两次密码不一致'
//                             },
//                             different: {
//                                 field: 'username',
//                                 message: '用户名和密码不能相同'
//                             }
//                         }
//                     },
//                     confirmPassword: {
//                         validators: {
//                             notEmpty: {
//                                 message: '密码不能为空'
//                             },
//                             identical: {
//                                 field: 'password',
//                                 message: '两次密码不一致'
//                             },
//                             different: {
//                                 field: 'username',
//                                 message: '用户名和密码不能相同'
//                             }
//                         }
//                     }
//                 }
//             });
//
//
//     }

    /*注册*/
    signUp(e) {
        e.preventDefault();// 阻止打开打开一个新页面
        let {email,username, password} = this.state.formData;
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
        /*leanCloud.js*/
        signUp(email,username, password, success, error)
    }

    /*登录*/
    signIn(e) {
        e.preventDefault();
        let {email, username, password} = this.state.formData;
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
        signUp(email, username, password, success, error)
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
}