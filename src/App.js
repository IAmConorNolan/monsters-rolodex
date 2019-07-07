import React from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends React.Component { //Using a class gives us access to the state property, also gives set state.
constructor() {
  super();
  this.state = {
    monsters: [],
    searchField: '',
  };
}

componentDidMount () {
  //This code gets called when writing to the DOM for the first time
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json()) //Parses Json
  .then(users=> this.setState({monsters: users})); //Stores users in this.state.monsters (Overwrites)
}

handleChange = (e) => { //arrow functions automatically bind 'this' to where it was defined
  this.setState({ searchField: e.target.value });
};

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(el => 
      el.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (    
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox 
      placeholder='search monsters'
      handleChange={this.handleChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
    )
  }
}

export default App;
