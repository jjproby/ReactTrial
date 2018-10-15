import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import App from "./App";
import Abilities from "./Abilities";
import Items from "./Items";
import Home from "./Home";
import Moves from "./Moves";

class Main extends Component {
  render() {
    return (
      <div>
        <h1> POKEMON SEARCH </h1>
        <HashRouter>
          <div className="outline">
            <ul className="header">
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to="/abilities">Abilities</NavLink></li>
              <li><NavLink to="/pokemon">Name</NavLink></li>
              <li><NavLink to="/items">Items</NavLink></li>
              <li><NavLink to="/moves">Moves</NavLink></li>
            </ul>
            <div className="content">
              <Route exact path='/' component={Home}/>
              <Route path="/abilities" component={Abilities}/>
              <Route path="/pokemon" component={App}/>
              <Route path="/items" component={Items}/>
              <Route path="/moves" component={Moves}/>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
