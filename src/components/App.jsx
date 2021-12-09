import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

import Mapbox from "./Mapbox";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userName = localStorage.getItem('user');
    console.log(userName)
    setUser(userName);
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/logs">
            {!user
              ?
              <Login />
              :
              <div>
                <Navbar user={ user } />
                <Mapbox />
              </div>
            }
          </Route>

          <Route path="/login">
            { !user ? <Login /> : <Redirect to="/logs" /> }
          </Route>

          <Route path="/register">
            { !user ? <Register /> : <Redirect to="/logs" /> }
          </Route>

          <Route path="/">
            { !user ? <Login /> : <Redirect to="/logs" /> }
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
