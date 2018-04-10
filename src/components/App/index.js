import React, { Component } from 'react';
import Intro from '../Intro';
import './App.css';


class App extends Component {
  state = {
    series : []
  }

  componentDidMount(){
    const series = ["Vikings", "Game of thrones"];
    setTimeout( () => {
      this.setState({ series: series });
    }, 2000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TV Series List</h1>
        </header>
        <Intro message="you can find all of youre most loved series" />
        The length of series array - {this.state.series.length}
      </div>
    );
  }
}

export default App;
