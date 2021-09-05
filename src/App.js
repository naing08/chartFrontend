import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h2>Welcome To Chart Application</h2>
          <Switch>
             <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>);
  }
}
export default App;
