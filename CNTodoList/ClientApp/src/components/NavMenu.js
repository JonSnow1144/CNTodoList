import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    static renderTodoMenu() {
        return (
            <LinkContainer to={'/todolist'}>
                <NavItem>
                    <Glyphicon glyph='list' /> Todo List
                </NavItem>
            </LinkContainer>
        );
    }

    static renderHomeMenu() {
        return (
            <LinkContainer to={'/'} exact>
                <NavItem>
                    <Glyphicon glyph='home' /> Home
                </NavItem>
            </LinkContainer>
        );
    }

    static renderLoginMenu() {
        return (
            (<LinkContainer to={'/login'} >
                <NavItem>
                    <Glyphicon glyph='log-in' /> Login
                </NavItem>
            </LinkContainer>)
        );
    }

    static rendeRegisterMenu() {
        return (
            <LinkContainer to={'/register'} >
                <NavItem>
                    <Glyphicon glyph='plus' /> Register
                </NavItem>
            </LinkContainer>
        );
    }

    displayName = NavMenu.name;
    constructor(props) {
        super(props);
        this.state = {
            userid: 0,
            visible: false
        };
        fetch('api/Users/GetCurrentUser')
            .then(response => response.json())
            .then(data => {
                if (data.id !== 0) {
                    this.setState({
                        userId: data.id,
                        loading: false
                    });
                }
            })
            .catch(error => {
                alert(error);
            });
    };

    render() {
        const home = (this.state.userid !== 0)
            ? NavMenu.renderHomeMenu()
            : null;
        const todo = (this.state.userid !== 0)
            ? NavMenu.renderTodoMenu()
            : null;
        const signin = (this.state.userid === 0)
            ? NavMenu.renderLoginMenu()
            : null;
        const register = (this.state.userid === 0)
            ? NavMenu.rendeRegisterMenu()
            : null;
        
        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>Todo List</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    <LinkContainer to={'/login'} >
                      <NavItem>
                        <Glyphicon glyph='log-in' /> Login
                      </NavItem>
                    </LinkContainer>
            
                    <LinkContainer to={'/'} exact>
                      <NavItem>
                        <Glyphicon glyph='home' /> Home
                      </NavItem>
                    </LinkContainer>            
                    <LinkContainer to={'/register'} >
                      <NavItem>
                        <Glyphicon glyph='plus' /> Register
                      </NavItem>
                    </LinkContainer>                    
                    <LinkContainer to={'/todolist'}>
                      <NavItem>
                        <Glyphicon glyph='list' /> Todo List
                      </NavItem>
                    </LinkContainer>            
                    <LinkContainer to={'/about'}>
                      <NavItem>
                        <Glyphicon glyph='user' /> About
                      </NavItem>
                    </LinkContainer>      
                    {/*
                    {home}
                    {todo}
                    {signin}
                    {register}
                    </div>*/}
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
