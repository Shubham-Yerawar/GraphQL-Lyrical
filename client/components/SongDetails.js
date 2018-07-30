import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link} from 'react-router';
import query from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';


class SongDetails extends Component {


  render() {

    const {song , loading } = this.props.data;
    
    if(loading){
      return ( <div></div> )
    }

    return (
      <div>
      <Link to="/"  ><i className="material-icons left" >arrow_back</i></Link>
        
        <h3>{song.title }</h3>
        {
          this.props.data ? <LyricList id={this.props.params.id} lyrics={song.lyrics} /> : null
        }
        
        <LyricCreate id={this.props.params.id} />
      </div>
    );
  }
}



export default graphql(query, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetails);