import React from "react";
import TodoApi from "../../services/todoApi"

class Login extends React.Component{
    state ={
        username: '',
        password: ''
    }

    todoApi = new TodoApi();

    onSubmit = (event) =>{
        event.preventDefault()
        this.todoApi.login(
            this.state.username,
            this.state.password
            )
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className={'mb-3'}>
                        <label className="form-label">Username</label>
                        <input type={'text'}
                        value = {this.state.username}
                        onChange = {event => this.setState({username: event.target.value})}
                        className = {'form-control'}
                        id = {'exampleInputEmail1'}
                        />
                    </div>
                    <div className={'mb-3'}>
                        <label className="form-label">Password</label>
                        <input type={'text'}
                        value = {this.state.password}
                        onChange = {event => this.setState({password: event.target.value})}
                        className = {'form-control'}
                        id = {'exampleInputPassword1'}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Log In</button>


                </form>
            </div>

        )
    }
}

export default Login