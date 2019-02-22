import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoDescription} </td>
        <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoResponsible} </td>
        <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoPriority} </td>
        <td>
            <Link to={"/edit/" + props.todo._id}> Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(resp => {
                this.setState({
                    todos: resp.data
                });
            }).catch((error) => {
                console.log(error);
            })
    }


    todoList() {
        return this.state.todos.map((currentTodo, index) => {
            return <Todo todo={currentTodo} key={index} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}