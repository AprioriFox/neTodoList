import React from "react";
import './todo-add.css'

class TodoAdd extends React.Component{
    state = {
        text: ''
    }

    addTodo = (event) =>{
        event.preventDefault();
        event.target.reset();
        this.props.onAddTodo(this.state.text)
    }


    render() {
    return(

<div className>
<form onSubmit={this.addTodo} className={'addForm'}>
<input onChange={(event)=>{this.setState({text: event.target.value})}}
       type="text"
       placeholder= {'Feel data'}
       value = {this.state.text}
       className={'addInput'}
/>
<input type="submit" value={'Add todo'} className={'addBtn'}/>
</form>
</div>
)
}

}

export default TodoAdd