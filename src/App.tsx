import React from 'react';
import Chat from "./components/Chat"
import Login from "./components/Login"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/chat">
        {
            <Chat />
        }
      </Route>
      <Route path="/login">
        { !localStorage.getItem("user") ?
          <Login />
        :
          <Redirect to="/chat"/>
        }
      </Route>
      <Route path="/">
       <Redirect to="/login"/>
      </Route>
    </Switch>

    </Router>
  );
}

export default App;
