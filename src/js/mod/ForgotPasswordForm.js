import React, {Component} from 'react';

export default class ForgotPasswordForm extends Component {
    render() {
        return (
            <div>
                <form className="ui large form" onSubmit={this.props.onSubmit}>
                    <div className="ui stacked segment">
                        <div className="field">
                            <label>找回密码</label>
                            <div className="ui left icon input">
                                <input type="text" placeholder="email" name="email" value={this.props.formData.email}
                                       onChange={this.props.onChange.bind(null, 'email')}/>
                                <i className="mail icon"></i>
                            </div>
                        </div>
                        <button className="ui fluid teal submit button" type="submit">发送重置邮件</button>
                    </div>

                    <div className="ui error message"></div>
                </form>
                <div className="ui message">
                    <a href="#" onClick={this.props.returnToSignIn}>返回登录</a>
                </div>
            </div>
        )
    }
}