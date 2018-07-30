import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// import query from '../queries/fetchSong';

class LyricList extends Component{

  onLike(id, likes){
    this.props.mutate({
      variables:{ "id": id },
      optimisticResponse:{
        __typename: 'Mutataion',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes : likes + 10
        }
      },
      // refetchQueries:[{query, variables:{"id":this.props.id}}]
    })
  }

  renderLyrics(){
    return this.props.lyrics.map(lyric=>{
      return(
        <li key={lyric.id} className="collection-item" >
         { lyric.content } 
         <i 
         className="material-icons right " 
         onClick={()=> this.onLike(lyric.id, lyric.likes)}
         >thumb_up</i>
         <span className="right" >{lyric.likes}</span>
         </li>
      )
    })
  }

  render(){
    return(
      <div>
        <span>Lyrics :</span>
        <ul className="collection" >
          {this.renderLyrics()}
        </ul>
      </div>
    )
  }
}

const mutataion = gql`
mutation LikeLyric($id: ID!){
  likeLyric(id:$id){
    id
    likes
  }
}

`;

export default graphql(mutataion)(LyricList);