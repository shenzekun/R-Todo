import React, {Component} from 'react';
import TodoInput from './TodoInput'
import '../../css/UserDialog.css'
import '../../css/LoginDialog.css'
import $ from 'jquery';

window.jQuery = $;
require('semantic-ui/dist/semantic.min.css');
require('semantic-ui/dist/semantic.min.js');

export default class UserDialog extends Component {
    render() {

        return (
            <div className="user-todo">
                <div>
                    <h1>
                        <a href="javascript:void(0)">
                            <i className="alarm outline icon link"
                               data-content={'完成了' + this.props.completeCount + '个Todo'}
                               data-variation="wide"></i>
                        </a>
                    </h1>
                    <span className="prompt-complete-count">{this.props.completeCount}</span>
                    <span className="addFont user-show-position">welcome---{this.props.username}</span>
                    {this.props.id
                        ? <button onClick={this.isSignOut.bind(this)}
                                  className="ui circular twitter icon button sign-up-right">
                            <i className="sign out icon"></i></button> : null
                    }

                </div>
                <div className="inputWrapper">
                    <TodoInput content={this.props.newTodo}
                               onChange={this.props.changeTitle}
                               onSubmit={this.props.addTodo}/>
                </div>
                <ol className="todoList">
                    {this.props.todos}
                </ol>

                {/*询问是否退出模态框*/}
                <div className="ui small modal">
                    <div className="header">
                        <i className="sign warning icon"></i>
                        警告！
                    </div>
                    <div className="image content">
                        <div className="description">
                            <p>确认退出？</p>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui black deny button" onClick={this.close.bind(this)}>
                            取消
                        </div>
                        <div className="ui positive right labeled icon button" onClick={this.props.signOut}>
                            确定
                            <i className="checkmark icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        //提示完成多少todo
        $('.icon.link').popup()
    }

    //取消弹窗
    close() {
        $('.ui.small.modal').modal('hide');
    }

    //弹出是否弹窗模态框
    isSignOut() {
        $('.ui.small.modal').modal('show');
    }
}