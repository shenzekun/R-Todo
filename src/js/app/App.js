import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/reset.css'
import TodoItem from '../../js/mod/TodoItem'
import LoginDialog from '../mod/LoginDialog'
import UserDialog from '../mod/UserDialog'
import {getCurrentUser, signOut, TodoModel} from '../../js/mod/leanCloud'
import $ from 'jquery';

window.jQuery = $;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            todoList: [],
            completeCount: 0
        };
        let user = getCurrentUser();
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state));
                stateCopy.todoList = todos;
                stateCopy.completeCount = stateCopy.todoList.filter((item) => item.status === 'completed').length;
                this.setState(stateCopy);
            });
        }
    }

    render() {
        let todos = this.state.todoList.filter((item) => !item.deleted).map((item, index) => {
            return (
                <li key={index}>
                    <TodoItem todo={item}
                              onToggle={this.toggle.bind(this)}
                              onDelete={this.delete.bind(this)}
                              onUpdate={this.update.bind(this)}
                              onChange={this.change.bind(this)}/>
                </li>
            )
        });
        return (
            <div className="App">
                {this.state.user.id
                    ? <UserDialog todos={todos}
                                  changeTitle={this.changeTitle.bind(this)}
                                  addTodo={this.addTodo.bind(this)}
                                  username={this.state.user.username}
                                  id={this.state.user.id}
                                  signOut={this.signOut.bind(this)}
                                  newTodo={this.state.newTodo}
                                  completeCount={this.state.completeCount}
                    />
                    : <LoginDialog
                        onSignUp={this.onSignUpOrSignIn.bind(this)}
                        onSignIn={this.onSignUpOrSignIn.bind(this)}
                    />
                }

            </div>
        )
    }

    componentDidMount() {
    }

    /*监控TodoItem的变化*/
    change(e, todo, todoTitle) {
        if (todo.status === '') {
            todo.title = todoTitle;
            this.setState(this.state);
        }
    }

    /*更新TodoItem*/
    update(e, todo, todoTitle) {
        if (todo.status === '') {
            let oldStatus = todo.status;
            todo.title = todoTitle;
            this.setState(this.state);
            TodoModel.update(todo, () => {
                this.setState(this.state)
            }, (error) => {
                console.log(error);
                todo.status = oldStatus;
                this.setState(this.state)
            });
        }
    }

    /*todo完成的复选框的转换处理*/
    toggle(e, todo) {
        let oldStatus = todo.status;
        let isCompleted = (todo.status === 'completed');
        todo.status = (isCompleted ? '' : 'completed');//如果isCompleted为false，那么todo.status为''，否则为completed
        TodoModel.update(todo, () => {
            this.setState(this.state);
            //如果完成了，完成度加1
            if (!isCompleted) {
                this.setState({
                    completeCount: ++this.state.completeCount
                })
            } else {
                this.setState({
                    completeCount: --this.state.completeCount
                })
            }
        }, (error) => {
            console.log(error);
            todo.status = oldStatus;
            this.setState(this.state);
        })
    }

    /*删除todo*/
    delete(e, todo) {
        let isComplete = (todo.status === 'completed');
        TodoModel.destroy(todo.id, () => {
            todo.deleted = true;
            $("." + todo.id).transition("scale");
            setTimeout(() => this.setState(this.state), 300);
            //如果完成了,删除，完成度减一
            if (isComplete) {
                setTimeout(() => this.setState({
                    completeCount: --this.state.completeCount
                }), 300);
            }
        }, (error) => {
            console.log(error);
        })
    }

    /*增加todo
    * 每个todo 拥有：
    id - 区分两个todo的依据
    title - 也就是用户写的东西
    status - completed 表示完成，空表示未完成
    deleted - bool 值，表示是否删除了*/
    addTodo(event) {
        let newTodo = {
            title: event.target.value,
            status: '',
            deleted: false
        };
        TodoModel.create(newTodo, (id) => {
            newTodo.id = id;
            this.state.todoList.push(newTodo);
            this.setState({
                newTodo: '',
                todoList: this.state.todoList
            });
            $("." + newTodo.id).transition({
                animation: 'pulse',
                reverse: true,
                interval: 200
            });
        }, (error) => {
            console.log(error);
        })
    }


    /*监听大输入框的变化*/
    changeTitle(event) {
        this.setState({newTodo: event.target.value, todoList: this.state.todoList})
    }

    onSignUpOrSignIn(user) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));//深拷贝
        stateCopy.user = user;
        this.setState(stateCopy);
        console.log(this.state.user);
    }

    /*登出*/
    signOut() {
        $('.ui.small.modal').modal('hide');
        signOut();
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.user = {};
        this.setState(stateCopy);
    }
}

export default App;
