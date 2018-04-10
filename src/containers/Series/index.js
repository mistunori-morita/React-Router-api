import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/Loader';

class Series extends Component{
  state = {
    series: [],
    seriesName: '',
    isFetching: false
  }

  onInputChange = e =>{
    this.setState({ seriesName: e.target.value, isFetching: true});

    fetch(`http://api.tvmaze.com/search/shows?q=Viking${e.target.value}`)
      .then(response => response.json())
      .then(json => this.setState({ series: json , isFetching: false }));
      console.log(e.target.value); 
  }

  render() {
    const { series, seriesName, isFetching } = this.state;

    return(
      <div>
        <div>
          <input 
            value={seriesName}
            type="text" 
            onChange={this.onInputChange} />
        </div>
        { 
          !isFetching && series.length === 0 && seriesName.trim() === ''
          &&
          <p>Prease enter series name into the input</p>
        }
        {
          !isFetching && series.length === 0 && seriesName.trim() !== ''
          &&
          <p>No TV series have been found with this name</p>
        }
        {
          isFetching && <Loader />
        }
        {
          !isFetching && <SeriesList list={this.state.series} />
        }
      </div>
    )
  }
}


export default Series;