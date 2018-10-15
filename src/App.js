import React, { Component } from 'react';
import Search from './Search';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: #5995ea;
  outline: 5px solid black;
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
    this.toggleForward = this.toggleForward.bind(this);
    this.toggleBackward = this.toggleBackward.bind(this);
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

  toggleForward() {
    let searchQuery = Number(this.state.query);
    let newQuery = null;
    if (searchQuery === 802) {
      newQuery = 1;
    } else {
      newQuery = Number(this.state.query) + 1;
    }
    this.setState({query: newQuery})
    this.search({query: newQuery})
  }

  toggleBackward() {
    let searchQuery = Number(this.state.query);
    let newQuery = null;
    if (searchQuery === 1) {
      newQuery = 802;
    } else {
      newQuery = searchQuery - 1;
    }
    this.setState({query: newQuery});
    this.search({query: newQuery})
  }

  render () {
    console.log(this.state.data)
    console.log(this.state.data2)
    //console.log(this.state.data.abilities)
    const abilities = this.state.data.abilities
    const games = this.state.data.game_indices
    const pokeData = this.state.data2.flavor_text_entries
    const number = this.state.data.name
    const site = "https://www.smogon.com/dex/sm/pokemon/" + number

    let abilitiesList = [];
    let sprite = null;
    let shinysprite = null;
    let gameList = [];
    let button = null;
    let pokedex = [];
    let fowardButton = null;
    let backButton = null;

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
      fowardButton = <button type="button" onClick={this.toggleForward}> Next Pokemon </button>
      backButton = <button type="button" onClick={this.toggleBackward}> Previous Pokemon </button>
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
          <p> {backButton} {fowardButton} </p>
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
          <a href={site} target="_blank">Smogon Info</a>
        </div>
      </Wrapper>
    )
  }
}

export default App
