import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {!loggedInUser ? <Login setLoggedInUser={setLoggedInUser} /> : <Redirect to="/dashboard" />}
        </Route>
        <Route exact path="/dashboard">
          {loggedInUser ? <Dashboard loggedInUser={loggedInUser} /> : <Redirect to="/login" />}
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;