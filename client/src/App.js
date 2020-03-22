import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'

import BubblePage from './components/BubblePage'
import Login from "./components/Login";

import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
      <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        
          <li>
            <Link to='/bubbles'>Bubbles</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute path='/bubbles'>
            <BubblePage />
          </PrivateRoute>
          <Route exact path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
