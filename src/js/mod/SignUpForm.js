import React, {Component} from 'react';

export default class ForgotPasswordForm extends Component {
    render() {
        return (
            <div>
                <form className="ui large form" onSubmit={this.props.onSignUp}>
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input type="text" placeholder="邮箱" name="email" value={this.props.formData.email}
                                       onChange={this.props.onChange.bind(null, 'email')}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <input type="text" name="username" value={this.props.formData.username}
                                       onChange={this.props.onChange.bind(null, 'username')} placeholder="用户名"/>
                                <i className="user icon"></i>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input type="password" name="password" value={this.props.formData.password}
                                       onChange={this.props.onChange.bind(null, 'password')} placeholder="密码"/>
                            </div>
                        </div>
                        <button className="ui fluid submit button" type="submit">创建新帐号</button>
                    </div>
                    <div className="ui error message"></div>
                </form>
                <div className="ui message">
                    New to us? <a href="javascript:void(0)" onClick={this.props.returnToSignIn}>返回登录</a>
                </div>
            </div>
        )
    }
}

// export default function (props) {
//
//     return (
//
//         // <form className="ui form" onSubmit={props.onSubmit.bind(this)}>
//         //     <div className="field">
//         //         <label>邮箱</label>
//         //         <div className="ui left icon input">
//         //             <input type="text" placeholder="email" name="email" value={props.formData.email}
//         //                    onChange={props.onChange.bind(null, 'email')}/>
//         //             <i className="mail icon"></i>
//         //         </div>
//         //     </div>
//         //     <div className="field">
//         //         <label>用户名</label>
//         //         <div className="ui left icon input">
//         //             <input type="text" name="username" value={props.formData.username}
//         //                    onChange={props.onChange.bind(null, 'username')}/>
//         //             <i className="user icon"></i>
//         //         </div>
//         //     </div>
//         //     <div className="field">
//         //         <label>密码</label>
//         //         <div className="ui left icon input">
//         //             <input type="password" name="password" value={props.formData.password}
//         //                    onChange={props.onChange.bind(null, 'password')}/>
//         //             <i className="lock icon"></i>
//         //         </div>
//         //     </div>
//         //     <div className="ui error message"></div>
//         //
//         //     <button className="ui fluid submit button" type="submit">创建新帐号</button>
//         // </form>
//     )
// }