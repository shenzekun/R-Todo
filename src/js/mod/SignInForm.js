import React from 'react';

export default function (props) {
    return (
        <div className="col-lg-8 col-lg-offset-2">
            <form className="form-horizontal" onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label className="col-lg-3 control-label">用户名</label>
                    <div className="col-lg-5">
                        <input type="text" className="form-control" name="username" value={props.formData.username}
                               onChange={props.onChange.bind(null, 'username')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-lg-3 control-label">密码</label>
                    <div className="col-lg-5">
                        <input type="password" className="form-control" name="password" value={props.formData.password}
                               onChange={props.onChange.bind(null, 'password')}/>
                    </div>
                </div>
                {/*<div className="row">*/}
                {/*<label>用户名</label>*/}
                {/*<input type="text" value={props.formData.username}*/}
                {/*onChange={props.onChange.bind(null, 'username')}/>*/}
                {/*</div>*/}
                {/*<div className="row">*/}
                {/*<label>密码</label>*/}
                {/*<input type="password" value={props.formData.password}*/}
                {/*onChange={props.onChange.bind(null, 'password')}/>*/}
                {/*</div>*/}
                <div className="row actions">
                    <button type="submit">登录</button>
                    <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
                </div>
            </form>
        </div>
    )
}