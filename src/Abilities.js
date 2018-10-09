import React, { Component } from "react";
import Search from './Search';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: #5995ea;
  outline: 5px solid black;
`;

class Abilities extends Component {
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
    fetch(`https://pokeapi.co/api/v2/ability/${query}/`)
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
      }

  render() {
    console.log(this.state.data)

    const abilityEffects = this.state.data.effect_entries

    let effects = [];

    if (abilityEffects !== undefined) {
      if (abilityEffects !== undefined) {
        effects = this.state.data.effect_entries.map((effect, i) => {
          if (effect.language.name === "en") {
            return (
              <p key={i}> Effect : {effect.effect}</p>
            )
          }
        })
      }
    }

    return (
      <Wrapper>
        <h2> Search for ability </h2>
        <Search search = {this.search}/>
        <p> Name : {this.state.data.name} </p>
        {effects[0]}
        {
          this.state.error
          ? <p>{this.state.error}</p>
          : null
        }
      </Wrapper>
    );
  }
}

export default Abilities;
