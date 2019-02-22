import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoDescription: '',
            todoResponsible: '',
            todoPriority: '',
            todoCompleted: false
        }

    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(resp => {
                this.setState({
                    todoDescription: resp.todoDescription,
                    todoResponsible: resp.todoResponsible,
                    todoPriority: resp.todoPriority,
                    todoCompleted: resp.todoCompleted
                })
            }).catch((error) => {
                console.log(error);
            })
    }

    onChangeInput = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }

    onChangeTodoPriority = (e) => {
        this.setState({
            todoPriority: e.target.value
        });
    }

    onChangeTodoCompleted = () => {
        this.setState({
            todoCompleted: !this.state.todoCompleted
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const obj = {
            todoDescription: this.state.todoDescription,
            todoResponsible: this.state.todoResponsible,
            todoPriority: this.state.todoPriority,
            todoCompleted: this.state.todoCompleted
        };

        console.log(obj);

        axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            name="todoDescription"
                            value={this.state.todoDescription}
                            onChange={this.onChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="todoResponsible"
                            value={this.state.todoResponsible}
                            onChange={this.onChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todoPriority === 'Low'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.todoPriority === 'Medium'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.todoPriority === 'High'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={this.onChangeTodoCompleted}
                            checked={this.state.todoCompleted}
                            value={this.state.todoCompleted}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}