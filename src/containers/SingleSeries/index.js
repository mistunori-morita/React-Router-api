import React, { Component } from 'react';
import Loader from '../../components/Loader';


class SingleSeries extends Component {
  state = {
    show: null
  }

  componentDidMount(){
    const { id } = this.props.match.params;

    fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
      .then(response => response.json())
      .then(json => this.setState({ show: json }));
  }

  render(){
    const { show } = this.state;
    console.log(show)

    return(
      <div>
        {
          show === null && <Loader />
        }
        {
          show !== null && 
          <div>
            <div>{show.name}</div>
            <div>{show.premiered}</div>
            <div>{show.rating.average}</div>
            <div>{show._embedded.episodes.length}</div>
            <div>
              <img alt="show" src={show.image.medium} />
            </div>
          </div>
        }
      </div>
    )
  }
}



export default SingleSeries;