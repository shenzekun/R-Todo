import React, {Component} from 'react';

export default class ForgotPasswordForm extends Component {
    render() {
        return (
            <div>
                <form className="ui form" onSubmit={this.props.onSignIn} id="defaultForm">
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input type="text" name="username" value={this.props.formData.username}
                                       onChange={this.props.onChange.bind(null, 'username')} placeholder="用户名"/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input type="password" name="password" value={this.props.formData.password}
                                       onChange={this.props.onChange.bind(null, 'password')} placeholder="密码"/>
                            </div>
                        </div>
                        <button className="ui fluid blue submit button" type="submit">登录</button>
                    </div>

                    <div className="ui error message"></div>
                </form>
                <div className="ui message">
                    New to us? <a href="#" onClick={this.props.onForgotPassword}>忘记密码了?</a>
                    <a href="#" onClick={this.props.returnToSignUp}>注册？</a>
                </div>
            </div>
        )
    }
}
// export default function (props) {
//     return (
//
//
//     /*<form className="ui form" onSubmit={props.onSubmit} id="defaultForm">
//             <div className="field">
//                 <label>用户名</label>
//                 <div className="ui left icon input">
//                     <input type="text" name="username" value={props.formData.username}
//                            onChange={props.onChange.bind(null, 'username')}/>
//                     <i className="user icon"></i>
//                 </div>
//             </div>
//             <div className="field">
//                 <label>密码</label>
//                 <div className="ui left icon input">
//                     <input type="password" name="password" value={props.formData.password}
//                           onChange={props.onChange.bind(null, 'password')}/>
//                     <i className="lock icon"></i>
//                 </div>
//             </div>
//             <div className="ui error message"></div>
//             <button className="ui fluid blue submit button" type="submit">登录</button>
//             <div className="right">
//                 <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
//             </div>
//        </form>
//        */
//     )
// }