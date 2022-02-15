import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import TodoAdd from '../todo-add';
import Login from '../login/login';
import TodoApi from '../../services/todoApi';

import './app.css';

class App extends React.Component {
    state = {
        todos: [],
        filter: 'all',
        searchString: '',
    }

    credentials = localStorage.getItem('credentials')

    todoApi = new TodoApi();

    onToggleImportant = (id) => {
        const idx = this.state.todos.findIndex((item) => item.id === id)
        const old = this.state.todos[idx]

        const newTodo = {
            label: old.label,
            important: !old.important,
            done: old.done
        }

        this.todoApi.updateTodo(old.id, newTodo).then(data =>{
            this.onLoadTodos()
        })
    }

    onToggleDone = (id) => {
        const idx = this.state.todos.findIndex((item) => item.id === id)
        const old = this.state.todos[idx]

        const newTodo = {
            label: old.label,
            important: old.important,
            done: !old.done
        }

        this.todoApi.updateTodo(old.id, newTodo).then(data =>{
            this.onLoadTodos()
        })
    }

    onToggleFilter = (status) => {
        this.setState({
            filter: status
        })
    }

    onStatusFilter = (todos, status) => {
        if (status === 'active') {
            return todos.filter((item) => item.done === false)
        } else if (status === 'done') {
            return todos.filter((item) => item.done === true)
        } else {
            return todos
        }
    }

    onSearchFilter = (todos, searchString) => {
        const result = todos.filter((todo) => todo.label.toLowerCase().includes(searchString.toLowerCase()))
        return result
    }

    onSearchChange = (searchString) => {
        console.log(searchString)
        this.setState({
            searchString: searchString
        })
    }
  
    onLoadTodos = () =>{
        this.todoApi.getTodos().then(todos =>{
            this.setState({
                todos:todos
            })
        })
    }

     addNewTodo = (label) => {
        this.todoApi.createTodo(label).then(data =>{
            this.onLoadTodos()
        })
    }

    onDelete = (id) => {
       this.todoApi.deleteTodo(id).then(data=>{
           this.onLoadTodos()
       })
    }

    componentDidMount() {
        if (this.credentials){
        this.onLoadTodos()
    }
    }

    render() {
        

        if (this.credentials){


        const filteredTodos = this.onStatusFilter(this.state.todos, this.state.filter);
        const filterBySearchTodos = this.onSearchFilter(filteredTodos, this.state.searchString);

        const doneTodos = this.state.todos.filter((obj) => {
            return (obj.done === true)
        })
        const todo = this.state.todos.filter((obj) => {
            return (obj.done === false)
        })
        return (
            <div className="todo-app">
                <AppHeader toDo={todo.length} done={doneTodos.length}/>

                <div className="top-panel d-flex">

                    <SearchPanel onSearchChange={this.onSearchChange}/>

                    <ItemStatusFilter onToggleFilter={this.onToggleFilter} filter={this.state.filter}/>

                </div>

                
                <TodoList
                    onDelete={this.onDelete}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                    todos={filterBySearchTodos}
                />

                <TodoAdd addNewTodo={this.addNewTodo}/>

            </div>
        );
        } else{

            return <Login />

        }
    }
};

export default App;
