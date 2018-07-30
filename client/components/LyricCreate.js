import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// import query from '../queries/fetchSong';



class LyricCreate extends Component{

  constructor(props){
    super(props);
    this.state = {
      content:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    // console.log('add content :',this.state.content);
    this.props.mutate({
      variables:{ 
        content : this.state.content,
        songId: this.props.id
       },
      //  refetchQueries:[{query, variables:{ "id":this.props.id } }]
    })
    this.setState({content:''});
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} >
        <label> Add a Lyric </label>
        <input
           value={this.state.content}
           onChange={(e)=> this.setState({ content : e.target.value }) }
        />
      </form>
    )
  }

}

const mutation = gql`
mutation AddLyricToSong($content:String,$songId:ID){
  addLyricToSong(content:$content,songId:$songId){
    id
    lyrics{
      id
      likes
      content
    }
  }
}
`;

export default graphql(mutation)(LyricCreate);