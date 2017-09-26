import React, {Component} from 'react';
import TodoInput from '../mod/TodoInput'
import $ from 'jquery';

window.jQuery = $;
require('semantic-ui/dist/semantic.min.css');
require('semantic-ui/dist/semantic.min.js');

export default class UserDialog extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.username || '我'}的待办 {this.props.id
                    ? <button onClick={this.isSignOut.bind(this)}>登出</button> : null}
                </h1>
                <div className="inputWrapper">
                    <TodoInput
                        content={this.props.newTodo}
                        onChange={this.props.changeTitle}
                        onSubmit={this.props.addTodo}/>
                </div>
                <ol className="todoList">
                    {this.props.todos}
                </ol>

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

    isSignOut() {
        $('.ui.small.modal').modal('show');
    }
}