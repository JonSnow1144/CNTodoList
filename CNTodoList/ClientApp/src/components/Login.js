import React, { Component } from 'react';
export class Login extends Component {
    displayName = Login.name

    constructor(props) {
        super(props);
         this.state = {
            Id: 0,         
            Email: '',
            Password: ''
        };

        fetch('api/Users/GetCurrentUser')
            .then(response => response.json())
            .then(data => {
                if (data.id !== 0) {
                    this.props.history.push('/');
                }
            });
    }

    emailChange = event => {
        this.setState({
            Email: event.target.value
        });
    }

    passwordChange = event => {
        this.setState({
            Password: event.target.value
        });
    }

    submitForm = event => {        
        event.preventDefault();
        if (!this.canBeSubmitted()) {
            return;
        }   
        const data = JSON.stringify({ "email": this.state.Email, "password": this.state.Password });
        fetch('api/Users/Login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data })
            .then(response => response.json())
            .then(data => {
                if (data.id !== 0) {
                    window.location.reload(true);
                    //this.props.history.push('/');        
                }
                else {
                    alert('Email or password is invalid!');
                }
            });
    }

    canBeSubmitted() {
        const errors = this.validate(this.state.Email, this.state.Password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    validate(email, password) {
        return {
            email: email.length === 0,
            password: password.length === 0,        
        };
    }

    render() {
        const errors = this.validate(this.state.Email, this.state.Password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        if (this.state.Id !== 0) {            
            this.props.history.push('/login');      
        }
        else {
            return (
                <form className='form-group' onSubmit={this.submitForm}>
                    <div>
                        <h1>Sign In</h1>
                        <div>
                            <label>
                                Email                            
                            </label>
                            <input type='text' name='email' className='form-control'
                                onChange={this.emailChange}
                                placeholder='Email'
                                required
                            />
                        </div>
                        <div>
                            <label>
                                Password                            
                            </label>
                            <input type='password' name='password' className='form-control'
                                onChange={this.passwordChange}
                                placeholder='Password'
                                required
                            />
                            <br />
                            <button className='btn btn-primary' disabled={isDisabled}>Continue</button>
                        </div>
                        <br />
                        <div>
                            Not yet a member? <a href='register'>Register</a>
                        </div>
                    </div>
                </form>
            );
        }
    }
}
