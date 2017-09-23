import React, {Component} from 'react';
import TodoInput from '../mod/TodoInput'

export default class UserDialog extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.username || '我'}的待办 {this.props.id
                    ? <button onClick={this.props.signOut}>登出</button> : null}
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
            </div>
        )
    }
}