 import React, {useState} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import TodoAdd from "../todo-add";


import './app.css';

class App extends React.Component{
    state = {
        todos:[
            {label: 'Drink Coffee', important: false, id: 1, done: false},
            {label: 'Make Awesome App', important: true, id: 2, done: false},
            {label: 'Have a lunch', important: false, id: 3, done: true},
            {label: 'Drink vodka', important: false, id: 4, done: false},
            {label: 'Pohmelitsa', important: false, id: 5, done: false},
        ],
        status: 'all',
        searchString: '',
    }

    onDelete = (id) => {
        this.setState((oldState)=>{
            const idx = oldState.todos.findIndex((item) => item.id === id)

            const prev = oldState.todos.slice(0, idx)
            const next = oldState.todos.slice(idx+1)

            return {
                todos: [...prev, ...next]
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState((oldState) => {
            const idx = oldState.todos.findIndex((item) => item.id === id)

            const prev = oldState.todos.slice(0, idx)
            const current = oldState.todos[idx]
            const next = oldState.todos.slice(idx + 1)

            return {
                todos: [...prev,
                    {...current, important: !current.important},
                    ...next]
            }
        })
    }

    onToggleDone = (id) => {
        this.setState((prevState) => {
            const idx = prevState.todos.findIndex((item) => item.id === id)

            const prev = prevState.todos.slice(0, idx)
            const current = prevState.todos[idx]
            const next = prevState.todos.slice(idx + 1)

            return {
                todos: [...prev,
                    {...current, done: !current.done},
                    ...next]
            }
        })
    }

    onToggleFilter = (status) => {
        this.setState({
            filter: status
        })
  }


  onStatusFilter =(todos, status) =>{
        if ( status === 'active'){
            return todos.filter((item) => item.done === false)
        }
        else if (status === 'done'){
            return todos.filter((item) => item.done === true)
        } else {
            return todos
        }
  }
  onSearchFilter = (todos, searchString) =>{
        const result = todos.filter(todo => todo.label.toLowerCase().includes(searchString))
      return result;
  }

  onChangeSearchFilter = (searchText) => {
    this.setState({
        searchString: searchText
    })
  }
  onAddTodo = (label)=>{
    this.setState((oldState)=>{
        const itemIDs = oldState.todos.map(item => item.id)
        const maxID = Math.max(...itemIDs)

        const newTodo = {
            id: maxID+1,
            label: label,
            important: false,
            done: false
        }
        return {
            todos: [...oldState.todos, newTodo]
        }
    })
  }
  render() {
        const filteredTodos = this.onStatusFilter(this.state.todos, this.state.filter)
        const filteredTodosBySearch = this.onSearchFilter(filteredTodos, this.state.searchString)



        const doneTodos =  this.state.todos.filter((todo) => todo.done).length
        const todosTodo = this.state.todos.length
      return (
          <div className="todo-app">
              <AppHeader toDo={todosTodo - doneTodos} done={doneTodos}/>
              <div className="top-panel d-flex">
                  <SearchPanel onChangeSearchFilter = {this.onChangeSearchFilter}/>
                  <ItemStatusFilter filter = {this.state.filter} onToggleStatus = {this.onToggleFilter}/>
              </div>

              <TodoList onDelete= {this.onDelete}
                        onToggleImportant = {this.onToggleImportant}
                        onToggleDone = {this.onToggleDone}
                        todos={filteredTodosBySearch}/>
              <TodoAdd onAddTodo = {this.onAddTodo}/>
          </div>
      );
  };
};

export default App;
