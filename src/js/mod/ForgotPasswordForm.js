import React, {Component} from 'react';

export default class ForgotPasswordForm extends Component {
    render() {
        return (
            <div className="forgotPassword">
                <h3>
                    重置密码
                </h3>

                <form className="ui form" onSubmit={this.props.onSubmit} id="defaultForm">
                    <div className="field">
                        <label>邮箱</label>
                        <div className="ui left icon input">
                            <input type="text" placeholder="email" name="email" value={this.props.formData.email}
                                   onChange={this.props.onChange.bind(null, 'email')}/>
                            <i className="mail icon"></i>
                        </div>
                    </div>
                    <button className="ui fluid blue submit button" type="submit">发送重置邮件</button>
                    <a href="#" onClick={this.props.onSignIn}>返回登录</a>
                </form>
            </div>
        )
    }
}