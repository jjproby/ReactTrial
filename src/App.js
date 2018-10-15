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

const Section = styled.p`
  font-size: 1em;
  font-weight: bold;
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      data: [],
      data2: [],
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
            //console.log(query);
            //console.log(json);
          });
        }).catch(err => this.setState({
            error: 'Error Occurred: Try Again',
            data: [],
        }));
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${query}/`)
      .then(res => res.json())
      .then(res => {
          return res;
      }).then(json => {
        this.setState({
            query: query,
            data2: json,
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
    console.log(this.state.data2)
    //console.log(this.state.data.abilities)
    const abilities = this.state.data.abilities
    const games = this.state.data.game_indices
    const pokeData = this.state.data2.flavor_text_entries

    let abilitiesList = [];
    let sprite = null;
    let shinysprite = null;
    let gameList = [];
    let button = null;
    let pokedex = [];

    const hideThing = () => {
      if (document.getElementById('sprite1').hidden === false) {
        document.getElementById('sprite1').hidden = true;
        document.getElementById('sprite2').hidden = false;
      } else {
        document.getElementById('sprite1').hidden = false;
        document.getElementById('sprite2').hidden = true;
      }
    }

    if (abilities !== undefined) {
      abilitiesList = this.state.data.abilities.map((ability, i) => {
        return (
          <li key={i}>{ability.ability.name}</li>
        );
      })
      sprite = <img src={this.state.data.sprites.front_default} height="200" width="200"/>;
      shinysprite = <img src={this.state.data.sprites.front_shiny} height="200" width="200" />;
      button = <button type="button" onClick={hideThing}> Change Color </button>
    }

    if (pokeData !== undefined) {
      pokedex = this.state.data2.flavor_text_entries.map((entry, i) => {
        if (entry.language.name === "en") {
          return (
            <li key={i}>{entry.version.name} : {entry.flavor_text}</li>
          )
        }
      })
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
          <Search search={this.search}/>
          <p> Name : {this.state.data.name}</p>
          <p> ID : {this.state.data.id}</p>
          <p> Height : {this.state.data.height}</p>
          <p> Weight : {this.state.data.weight}</p>
          <Section> Abilities: </Section>
          <ul>
            {abilitiesList}
          </ul>
          <Section> Games: </Section>
          <ul>
            {gameList}
          </ul>
          <Section> Pokedex Entries: </Section>
          <ul>
            {pokedex}
          </ul>
          <p id="sprite1"> {sprite}
          <br /> Default</p>
          <p id="sprite2" hidden = "true"> {shinysprite}
          <br / > Shiny</p>
          <p> {button} </p>
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
