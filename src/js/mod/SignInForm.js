import React, {Component} from 'react';

export default class ForgotPasswordForm extends Component {
    render() {
        return (
            <div>
                <form className="ui large form" onSubmit={this.props.onSignIn}>
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
                        <button className="ui fluid teal submit button" type="submit">登录</button>
                    </div>

                    <div className="ui error message"></div>
                </form>
                <div className="ui message">
                    <a href="javascript:void(0)" onClick={this.props.returnToSignUp}>注册</a>&nbsp;or&nbsp;
                    <a href="javascript:void(0)" onClick={this.props.onForgotPassword}>找回密码</a>
                </div>
            </div>
        )
    }
}