import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { About } from './components/About';
import { Login } from './components/Login';
import { TodoList } from './components/TodoList';

export default class App extends Component {
  displayName = App.name

  render() {
      return (               
          <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/todolist' component={TodoList} />
            <Route path='/register' component={Register} />
            <Route path='/about' component={About} />
            <Route path='/login' component={Login} />                                            
        </Layout>    
    );
  }
}
