import React, { Component } from 'react';
import Search from './Search';
import styled from 'styled-components'

const Title = styled.h1`
  text-align: center;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      data: [],
      error: '',
    };

    this.search = this.search.bind(this);
  }


  search({query}) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}/`)
        .then(res => res.json())
        .then(res => {
            return res;
        }).then(json => {
          this.setState({
              query: query,
              data: json,
              error: json.Error,
          }, () => {
            console.log(query);
            //console.log(json);
          });
        }).catch(err => this.setState({
            error: 'Error Occurred: Try Again',
            data: [],
        }));
  }

  render () {
    console.log(this.state.data)
    //console.log(this.state.data.abilities)
    const abilities = this.state.data.abilities
    const games = this.state.data.game_indices
    console.log(abilities);
    console.log(games);

    let abilitiesList = [];
    let sprite = null;
    let shinysprite = null;
    let gameList = [];

    if (abilities !== undefined) {
      abilitiesList = this.state.data.abilities.map((ability, i) => {
        return (
          <li key={i}>{ability.ability.name}</li>
        );
      })
      sprite = <img src={this.state.data.sprites.front_default} height="200" width="200"/>;
      shinysprite = <img src={this.state.data.sprites.front_shiny} height="200" width="200" />;
    }

    if (games !== undefined) {
      gameList = this.state.data.game_indices.map((game, i) => {
        return (
          <li key={i}>{game.version.name}</li>
        );
      })
    }

    return (
      <Wrapper>
        <div>
          <Title> SEARCH FOR POKEMON </Title>
          <h2> Input a number 1 - 802 </h2>
          <Search search={this.search} />
          <p> name : {this.state.data.name}</p>
          <p> id : {this.state.data.id}</p>
          <p> height : {this.state.data.height}</p>
          <p> weight : {this.state.data.weight}</p>
          <p> abilities: </p>
          <ul>
            {abilitiesList}
          </ul>
          <p> games: </p>
          <ul>
            {gameList}
          </ul>
          <p> {sprite} {shinysprite}</p>
          {
            this.state.error
            ? <p>{this.state.error}</p>
            : null
          }
        </div>
      </Wrapper>
    )
  }
}

export default App
