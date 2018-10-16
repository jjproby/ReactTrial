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
import ball from './Pokeball.png';
import char from './charmander.png';
import squirt from './squirtle.png';
import bulb from './bulbasaur.png';
import pik from './pikachu.png';

class Main extends Component {
  render() {
    return (
      <div>
        <h1 class="title"> POKEMON SEARCH </h1>
        <img src={ball} class="ball" height="85" width="85" />
        <HashRouter>
          <div className="outline">
            <ul className="header">
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to="/abilities">Abilities</NavLink></li>
              <li><NavLink to="/pokemon">Pokemon</NavLink></li>
              <li><NavLink to="/items">Items</NavLink></li>
              <li><NavLink to="/moves">Moves</NavLink></li>
            </ul>
            <div className="content">
              <img src={char} class="char" height="85" width="100" />
              <img src={squirt} class="squirt" height="85" width="100" />
              <img src={bulb} class="bulb" height="85" width="100" />
              <img src={pik} class="pik" height="85" width="100" />
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
