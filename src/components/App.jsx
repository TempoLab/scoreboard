import React, {Component} from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm'

class App extends Component {
  state = {
    players: [
      {
        name: "Guil",
        score: 0,
        id: 1
      },
      {
        name: "Treasure",
        score: 0,
        id: 2
      },
      {
        name: "Ashley",
        score: 0,
        id: 3
      },
      {
        name: "James",
        score: 0,
        id: 4
      }
    ]
  };
  
  // player id counter
  prevPlayerId = 4;

  handleScoreChange = (index, delta) => {
    console.log('handleScoreChange exec');
    // Executes twice for some reason...
    this.setState(prevState => {
        // Create new immutable array of players
        const newPlayers = prevState.players.map((player, playerIndex) => {
            
            // Check if the current array item is the same index as the one we are recieving
            if (playerIndex !== index) {
                
                // If they are not the same index just return the player without modifying
                return player;
            }
            
            // If they are the same index get the current score
            const current = player.score;
            
            // Return a new copy of the player with the updated score
            return {
                ...player,
                score: current + delta
            }
        })
        

        // Return a new copy of the previous state        
        return { 
            ...prevState,
            
            // Update the players array to include the updated player with new score
            players: newPlayers
        };
    });
  }
  
  handleAddPlayer = (name) => {
    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            id: this.prevPlayerId += 1
          }
        ]
      };
    });
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }

  render() {
    return (
      <div className="scoreboard">
        <Header 
          title="Scoreboard" 
          players={this.state.players}
        />
  
        {/* Players list */}
        {this.state.players.map( (player, index) =>
          <Player 
            name={player.name}
            score={player.score}
            id={player.id}
            key={player.id.toString()} 
            index={index}
            changeScore={this.handleScoreChange}
            removePlayer={this.handleRemovePlayer}           
          />
        )}
        
        <AddPlayerForm addPlayer={this.handleAddPlayer} />
      </div>
    );
  }
}

export default App;
