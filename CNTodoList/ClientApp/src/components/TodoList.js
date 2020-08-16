import React, { Component } from 'react';
import * as ReactBootstrap from 'react-bootstrap';

export class TodoList extends Component {
    displayName = TodoList.name

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            description: '',
            userId: 0,
            isDone: true,
            loading: true,
            todoList: []
        };        
        
        fetch('api/Users/GetCurrentUser')
            .then(response => response.json())
            .then(data => {
                if (data.id !== 0) {
                    this.setState({
                        userId: data.id,
                        loading: false
                    });                   

                    this.loadTodoList();
                }
                else {
                    this.props.history.push('/login');
                }
            })
            .catch(error => {
                alert(error);
            });               
    }

    descriptionChange = event => {
        this.setState({
            description: event.target.value
        });
    }

    isDoneChange = event => {
        this.setState({
            isDone: !this.state.isDone
        });
    }

    loadTodoList() {        
        fetch('api/TodoList/GetTodoList?userId=' + this.state.userId)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({
                        todoList: data,
                        loading: false
                    });
                    //alert(this.state.todoList[8].isDone);
                    this.clearTodoList();
                }
            });
    } 

    editTodoList(id) {        
        fetch('api/TodoList/GetTodoListById?id=' + id)
            .then(response => response.json())
            .then(data => {
                if (data.id !== 0) {
                    this.setState({
                        id: data.id,
                        description: data.description,
                        isDone: data.isDone,
                        userId: data.userId
                    });
                }
                else {
                    alert('Unable to retrive record!');
                }
            });
    }

    deleteTodoList(id) {
        if (window.confirm('Are you sure you wish to delete this todo list?')) {
            fetch('api/TodoList/DeleteTodoList?id=' + id, { method: 'DELETE'})
                .then(data => {
                    if (data.status === 200 || data.status === 201) {
                        this.loadTodoList();
                    }
                    else {
                        alert('Unable to delete record!');
                    }
                });
        }
    }

    onClickProductSelected(cell, row, rowIndex) {
        console.log('Product #', rowIndex);
    }

    clearTodoList() {
        this.setState({
            id: 0,
            description: '',
            isDone: false
        });
    }
    
    saveClick = event => {
        event.preventDefault();
        if (!this.canBeSubmitted()) {            
            return;
        }        
        const data = JSON.stringify({ "Id": this.state.id, "UserId": this.state.userId, "Description": this.state.description, "IsDone": this.state.isDone });
        const url = this.state.id === 0 ? 'api/TodoList/PostTodoList' : 'api/TodoList/PutTodoList';
        fetch(url, { method: this.state.id === 0 ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: data })
            .then(data => {
                if (data.status === 200 || data.status === 201) {
                    this.loadTodoList();
                    this.clearTodoList();
                }               
                else {
                    alert('Unable to save changes');
                }
            });
    }

    clearClick = event => {
        this.clearTodoList();
    }

    canBeSubmitted() {
        const errors = this.validate(this.state.description);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    validate(description) {
    return {            
        description: description.length === 0
        };
    }


    render() {        
        const errors = this.validate(this.state.description);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (                        
            <form>
                <div className='form-group'>
                    <h1>Todo List</h1>                                        
                    <button className='btn btn-primary' type='button' onClick={this.clearClick}>Add todo item</button >
                    <br />
                    <br />
                    <label>
                        Description
                    </label>
                    <br />
                    <textarea className="form-control textarea" name='description'
                        value={this.state.description}
                        onChange={this.descriptionChange}
                        required
                        rows={10}
                        
                    />                    
                    <input className="form-check-input" type='checkbox' name='isDone'
                        checked={this.state.isDone}
                        onChange={this.isDoneChange}
                    /> <label>
                        Done
                    </label>
                    <br />
                    <div>                        
                        <button className='btn btn-primary' type='button' onClick={this.saveClick} disabled={isDisabled}>Save</button >
                        <button className='btn btn-secondary' type='button' onClick={this.clearClick}>Cancel</button>
                    </div>
                    <br />    
                    <ReactBootstrap.Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todoList.map(todo => 
                                (<tr>
                                    <td style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }} className='col-10 col-md-10' >{todo.description}</td>
                                    <td className='col-2 col-md-2'>
                                        <button type="button" className='btn btn-success' onClick={(e) => this.editTodoList(todo.id)}>Edit</button>&nbsp;
                                        <button type="button" className='btn btn-danger' onClick={(e) => this.deleteTodoList(todo.id)}>Delete</button>
                                    </td>
                                </tr>)
                            )}
                        </tbody>
                    </ReactBootstrap.Table>
                </div>
            </form>
        );
    }        
}