import React, { Component } from "react";
import Search from './Search';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: #5995ea;
  outline: 5px solid black;
`;

class Items extends Component {
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
    fetch(`https://pokeapi.co/api/v2/item/${query}/`)
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

    const itemEffects = this.state.data.effect_entries

    let effect = null;
    let sprite = null;

    if (itemEffects !== undefined) {
      effect = this.state.data.effect_entries[0].effect
      sprite = <img src={this.state.data.sprites.default} height="200" width="200" />;
    }

    return (
      <Wrapper>
        <div class="result">
          <h2> Items </h2>
          <Search search={this.search} />
          <p> Name: {this.state.data.name} </p>
          <p> Effect: {effect} </p>
          <p> Cost: {this.state.data.cost} </p>
          {sprite}
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

export default Items
