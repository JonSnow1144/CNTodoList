import React, { Component } from 'react';

export class Register extends Component {
    displayName = Register.name

    constructor(props) {
        super(props);
        this.state = {
            Id: 0,
            FirstName: '',
            LastName: '',
            Email: '',
            Password: '',
            PasswordConfirm: ''
        };
    }

    firstnameChange = event => {
        this.setState({
            FirstName: event.target.value
        });
    }

    lastnameChange = event => {
        this.setState({
            LastName: event.target.value
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

    passwordConfirmChange = event => {
        this.setState({
            PasswordConfirm: event.target.value
        });
    }

    canBeSubmitted() {
        const errors = this.validate(this.state.FirstName, this.state.LastName, this.state.Email, this.state.Password, this.state.PasswordConfirm);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    validate(firstname, lastname, email, password, confirm) {        
        return {
            firstname: firstname.length === 0, 
            lastname: lastname.length === 0,
            email: email.length === 0,
            password: password.length === 0,
            confirm: password !== confirm
        };
    }

    submitForm = event => {        
        event.preventDefault();
        if (!this.canBeSubmitted()) {
            return;
        }       
        const data = JSON.stringify({ "Id": 0, "FirstName": this.state.FirstName, "LastName": this.state.LastName, "Email": this.state.Email, "Password": this.state.Password });
        fetch('api/Users/PostUsers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data })
            .then(data => {
                if (data.status === 200 || data.status === 201) {
                    this.props.history.push('/');
                }
                else if (data.status === 409)
                    alert('Email already exists!');
                else {
                    alert('Unable to save changes');
                }
            });        
    }

    render() {
        const errors = this.validate(this.state.FirstName, this.state.LastName, this.state.Email, this.state.Password, this.state.PasswordConfirm);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <form className='form-group' onSubmit={this.submitForm}>           
                <div>
                    <h1>User Registration</h1>
                    <div>
                        <label>
                            First Name                        
                        </label>
                        <input type='text' name='firstname' value={this.state.firstname}
                            onChange={this.firstnameChange} className='form-control'
                            placeholder='First Name'
                            required
                        />
                    </div> 
                    <div>
                        <label>
                            Last Name                        
                        </label>
                        <input type='text' name='lastname' value={this.state.lastname}
                            onChange={this.lastnameChange} className='form-control'
                            placeholder='Last name'
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Email
                        </label>
                        <input type='text' name='email' value={this.state.email}
                            onChange={this.emailChange} className='form-control'
                            placeholder='Email'
                            required
                        />                        
                    </div>
                    <div>                        
                        <label>
                            Password
                        </label>
                        <input type='password' name='password' value={this.state.password}
                            onChange={this.passwordChange} className='form-control'
                            placeholder='Password'
                            required
                        />                        
                    </div>
                    <div>
                        <label>
                            Confirm Password
                        </label>
                        <input type='password' name='passwordconfirm' value={this.state.passwordconfirm}
                            onChange={this.passwordConfirmChange} className='form-control'
                            placeholder='Confirm Password'
                        />                        
                    </div>
                    <br />
                    <div>
                        <button className='btn btn-primary' disabled={isDisabled}>Continue</button >
                    </div>
                    <br />
                    <div>
                        Already a member? <a href='login'>Login</a>
                    </div>
                </div>
            </form>
        );
    }
}
