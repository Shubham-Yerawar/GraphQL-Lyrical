import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';
import gql from 'graphql-tag';

class SongList extends Component {

  deleteHelper(id){
    console.log('deleting: ',id);
    this.props.mutate({
      variables:{ id }
    }).then(()=>this.props.data.refetch());
  }

  handleTitleClick(id){
    hashHistory.push(`/songs/${id}`);
  }

  renderSongs() {
    return this.props.data.songs.map(({id,title}) => {
      return (
        <li key={id} className="collection-item" >
         <span onClick={() => this.handleTitleClick(id)} className="cp"  > {title} </span>  
          <i className="material-icons right" onClick={() => this.deleteHelper(id)} > delete </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div>Loading data.....</div>
      )
    } else {
      return (
        <div>
          <h5>SongList</h5>
          <ul className="collection" >
            {this.renderSongs()}
          </ul>

          <br />
          <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons" >add</i>
          </Link>

        </div>
      );
    }
  }
}

// named mutation
const mutation = gql`
  mutation deleteSong($id: ID){
    deleteSong(id: $id){
      id
    }
  }
`;

// sad but true :(
export default graphql(mutation)(graphql(query)(SongList));
