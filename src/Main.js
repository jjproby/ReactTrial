import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import App from "./App";
import Abilities from "./Abilities";

class Main extends Component {
  render() {
    return (
      <div>
        <h1> Simple SPA </h1>
        <HashRouter>
          <div>
            <ul className="header">
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to="/abilities">Abilities</NavLink></li>
              <li><NavLink to="/pokemon">Name</NavLink></li>
            </ul>
            <div className="content">
              <Route path="/abilities" component={Abilities}/>
              <Route path="/pokemon" component={App}/>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
