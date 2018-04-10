import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';

class Series extends Component{
  state = {
    series: []
  }

  onInputChange = e =>{
    fetch(`http://api.tvmaze.com/search/shows?q=Viking${e.target.value}`)
      .then(response => response.json())
      .then(json => this.setState({ series: json }))
      console.log(e.target.value); 
  }

  render() {
    return(
      <div>
        The length of series array - {this.state.series.length}
        <div>
          <input type="text" onChange={this.onInputChange} />
        </div>
        <SeriesList list={this.state.series} />
      </div>
    )
  }
}


export default Series;