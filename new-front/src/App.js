import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeView from "./components/home-view.component"
import Navbar from "./components/navbar.component"
import UsersList from "./components/users-list.component";
import EditUser from "./components/edit-user.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
      <Router>
          <div className="container">
              <Navbar />
              <br/>
              <Route path="/" exact component={HomeView} />
              <Route path="/users" exact component={UsersList} />
              <Route path="/users/create" exact component={CreateUser} />
              <Route path="/users/view/:username" exact component={EditUser} />
          </div>
      </Router>
  );
}

export default App;
