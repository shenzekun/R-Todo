import React from 'react';
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


export default function (props) {
    return (
        <div className="field">
            <div className="ui right icon input TodoInput">
                <input type="text" value={props.content} onChange={changeTitle.bind(null, props)}
                       onKeyPress={submit.bind(null, props)} placeholder="输入你的Todo"/>
                <i className="reply icon"></i>
            </div>
        </div>
    )
}
