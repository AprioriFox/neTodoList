import React from 'react';
import './todo-add.css'

class TodoAdd extends React.Component {
    style = {
        color: 'red'
    }
    state = {
        label: ''
    }

    onValueChange = (text) => {
        this.setState({
            label: text
        })
    }

    onAddNewTodo = event => {
        event.preventDefault();
        if (this.state.label === '') {
            alert("Задача отсутствует!")
        } else {
            this.props.addNewTodo(this.state.label)
        }
        this.setState({label: ''});
    }


    render() {
        return (
            <div className="form">
                <form onSubmit={this.onAddNewTodo}>
                    <input
                        className="add-input"
                        onChange={(event) => {
                            this.onValueChange(event.target.value)
                        }}
                        value={this.state.label}
                        type='text'
                        placeholder='Feel the todo'
                    />
                    <input className="btn-input" type='submit' value='Add'/>
                </form>
            </div>
        )
    }
}

export default TodoAdd;

