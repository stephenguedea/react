import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todo from './components/Todo';
import AddTodo from './components/addTodo';
import About from './components/pages/About';
import Header from './components/layout/header'
import './App.css';
// import uuid from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todo: []
  }

  componentDidMount() {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
          .then(res => this.setState({todo: res.data}))
  }

  // Toggle Complete
  markComplete = (id) => {
      this.setState({todo: this.state.todo.map(todo  => {
          if(todo.id === id) {
              todo.completed = !todo.completed
          }
          return todo;
      })})
  }

  // Delete todo
    delTodo = (id) => {
      // console.log(id);
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => this.setState({todo: [...this.state.todo.filter(todo => todo.id !== id)]
            }));
    }

    // Add todo
    addTodo = (title) => {
        // console.log(title)
      axios.post('https://jsonplaceholder.typicode.com/todos', {
          title,
          completed: false
      })
          .then(res => this.setState({ todo: [...this.state.todo, res.data]})
          );
    }
  render() {
    return (
        <Router>
          <div className="App">
              <div className="container">
                  <Header/>
                  <Route exact path="/" render={props => (
                      <React.Fragment>
                          <AddTodo addTodo={this.addTodo}/>
                          <Todo todo={this.state.todo} markComplete={this.markComplete}
                                delTodo={this.delTodo}/>
                      </React.Fragment>
                  )} />
                  <Route path="/about" component={About}></Route>
              </div>
          </div>
        </Router>
    );
  }
}

export default App;
