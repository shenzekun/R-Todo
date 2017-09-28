import React, {Component} from 'react';
import '../../css/TodoInput.css'

function submit(props, e) {
    if (e.key === 'Enter') {
        if (e.target.value.trim() !== '') {
            props.onSubmit(e)
        }
    }
}

function changeTitle(props, e) {
    props.onChange(e);
}


export default class TodoInput extends Component {
    render() {
        return (
            <div className="field">
                <div className="ui icon input TodoInput">
                    <input type="text" value={this.props.content} onChange={changeTitle.bind(null, this.props)}
                           onKeyPress={submit.bind(null, this.props)} placeholder="输入你的Todo，并按回车键"/>
                    <i className="reply icon"></i>
                </div>
            </div>
        )
    }
}
