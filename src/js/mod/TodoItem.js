import React, {Component} from 'react';
import '../../css/TodoItem.css'
import $ from 'jquery';

window.jQuery = $;
require('semantic-ui/dist/semantic.min.css');
export default class TodoItem extends Component {
    render() {
        return (
            <div className="TodoItem">
                <div className="ui checkbox">
                    <input type="checkbox" checked={this.props.todo.status === 'completed'}
                           onChange={this.toggle.bind(this)}/>
                    <label></label>
                </div>
                <div className={this.props.todo.id}>
                    {/*判断是否完成了*/}
                    {this.props.todo.status === 'completed'
                        ? <div className="ui transparent input title completed">
                            <input type="text" value={this.props.todo.title} disabled/>
                        </div>
                        : <div className="ui transparent input title">
                            <input type="text" value={this.props.todo.title}
                                   onChange={this.change.bind(this)} onBlur={this.update.bind(this)}/>
                        </div>
                    }
                    <button className="ui circular google plus icon button" onClick={this.delete.bind(this)}>
                        <i className="remove icon"></i>
                    </button>
                </div>
            </div>
        )
    }

    change(e) {
        this.props.onChange(e, this.props.todo, e.target.value);
    }

    update(e) {
        this.props.onUpdate(e, this.props.todo, e.target.value);
    }

    toggle(e) {
        this.props.onToggle(e, this.props.todo)
    }

    delete(e) {
        this.props.onDelete(e, this.props.todo);
    }
}