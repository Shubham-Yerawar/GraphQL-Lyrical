import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

class CreateSong extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }



  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: { title: this.state.title},
        refetchQueries : [{ query }]
    }).then(()=>{
      hashHistory.push('/');
    });
  }

  render() {
    return (
      <div>
        <Link to="/" className="btn-floating btn-small red left" >
          <i className="material-icons">arrow_back</i>
        </Link>
        <h3>Create a new song</h3>
        <form className="form-group" onSubmit={this.onSubmit} >
          <div className="form-control" >
            <label htmlFor="songTitle" >Title of Song:</label>
            <input type="text"
              placeholder=" your song title"
              name="songTitle"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation addSongMutation($title : String) {
    addSong(title: $title ){
      id
      title
    }
  }
`;

export default graphql(mutation)(CreateSong);