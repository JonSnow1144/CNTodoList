import React, { Component } from 'react';

export class Home extends Component {
    displayName = Home.name   

    constructor(props) {
        super(props);
        this.state = { 
            Id: 0,
            FirstName: '',
            LastName: '',
            Email: '',
            loading: true
        };

        fetch('api/Users/GetCurrentUser')
            .then(response => response.json())
            .then(data => {
                if (data.id !== 0) {
                    this.setState({
                        Id: data.id,
                        FirstName: data.firstName,
                        LastName: data.lastName,
                        Email: data.email,
                        loading: false
                    });
                }
                else {
                    this.props.history.push('/login');                    
                }
            })
            .catch(error => {                
                alert(error);
            });
    }

    signOut = event => {
        fetch('api/Users/Logout', { method: 'POST' });
        this.props.history.push('/login');           
    }

    render() {                
        return (
            <div>
                <div>
                    <h1>Welcome {this.state.FirstName}!</h1>
                    <label>Email: {this.state.Email}</label>
                </div>
                <div>
                    <a href='' onClick={this.signOut}>Sign out</a>
                </div>
            </div>           
        );               
    }
}
