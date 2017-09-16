import React, {Component} from 'react';
import './App.css';
import 'normalize.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import * as localStore from './localStore'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoList: localStore.load('todoList') || []
    }
  }
  render() {
    let todos = this.state.todoList
         .filter((item)=> !item.deleted)
          .map((item,index)=>{
        return (
          <li key={index}><TodoItem todo={item} onToggle={this.toggle.bind(this)} 
           onDelete={this.delete.bind(this)}/></li>
        )
      })
    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput
            content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }
  componentDidUpdate(){
      localStore.save('todoList', this.state.todoList)
  }
  toggle(e, todo){
       todo.status = todo.status === 'completed' ? '' : 'completed'
      this.setState(this.state)
     
  }
  delete(event, todo){
        todo.deleted = true
        this.setState(this.state)
  }
  addTodo(event) {
    this
      .state
      .todoList
      .push({id: idMaker(), title: event.target.value, status: null, deleted: false})
    this.setState({newTodo: '', todoList: this.state.todoList})
  }
  changeTitle(event){
      this.setState({
        newTodo: event.target.value,
        todoList: this.state.todoList
      })
  }
}

export default App;

let id = 0

function idMaker() {
  id += 1
  return id
}
