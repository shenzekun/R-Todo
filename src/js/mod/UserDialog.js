import React, {Component} from 'react';
import TodoInput from './TodoInput'
import '../../css/UserDialog.css'
import $ from 'jquery';

window.jQuery = $;
require('semantic-ui/dist/semantic.min.css');
require('semantic-ui/dist/semantic.min.js');

export default class UserDialog extends Component {
    render() {
        return (
            <div className="user-todo">
                <h1>{this.props.username || '我'}的待办 {this.props.id
                    ? <button onClick={this.isSignOut.bind(this)} className="ui circular twitter icon button"
                              >
                        <i className="sign out icon"></i></button> : null}
                </h1>
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
                        <div className="ui black deny button">
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

    //弹出是否退出模态框
    isSignOut() {
        $('.ui.small.modal').modal('show');
    }
}