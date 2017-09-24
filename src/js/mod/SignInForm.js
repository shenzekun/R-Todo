import React from 'react';

export default function (props) {
    return (
        <form className="ui form" onSubmit={props.onSubmit} id="defaultForm">
            <div className="field">
                <label>用户名</label>
                <div className="ui left icon input">
                    <input type="text" name="username" value={props.formData.username}
                           onChange={props.onChange.bind(null, 'username')}/>
                    <i className="user icon"></i>
                </div>
            </div>
            <div className="field">
                <label>密码</label>
                <div className="ui left icon input">
                    <input type="password" name="password" value={props.formData.password}
                           onChange={props.onChange.bind(null, 'password')}/>
                    <i className="lock icon"></i>
                </div>
            </div>
            <div className="ui error message"></div>
            <button className="ui fluid blue submit button" type="submit">登录</button>
            <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
        </form>
    )
}