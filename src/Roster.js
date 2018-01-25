import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

const PlayerAPI = {
  players: [
    { number: 1, name: 'Lionel Messi', position: 'Forward' },
    { number: 2, name: 'David Silva', position: 'Midfielder' },
    { number: 3, name: 'Kevin DeBruyne', position: 'Midfielder' },
    { number: 4, name: 'Nicolas Otamendi', position: 'Defender' },
    { number: 5, name: 'Ederson', position: 'Goalkeeper' }
  ],
  all: function() { return this.players },
  get: function(id) {
    const isPlayer = p => p.number === id
    return this.players.find(isPlayer)
  }
}

const FullRoster = () => (
  <div>
    <ul>
      {
        PlayerAPI.all().map(p => (
          <li key={p.number}>
            <Link to={`/roster/${p.number}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

const Player = (props) => {
  const player = PlayerAPI.get(
    parseInt(props.match.params.number, 10)
  )
  if (!player) {
    return <div>Sorry, but the player was not found!</div>
  }

  return (
    <div>
      <h1>{player.name} (#{player.number})</h1>
      <h2>{player.position}</h2>
      <Link to='/roster'>Back</Link>
    </div>
  )
}

class Roster extends Component{
  render() {
    return (
      <div className="Roster">
        <h2>This is the Tornadoes Roster page!!!</h2>
        <Switch>
          <Route exact path='/roster' component={FullRoster}/>
          <Route path='/roster/:number' component={Player}/>
        </Switch>
      </div>
    );
  }
}

export default Roster;
