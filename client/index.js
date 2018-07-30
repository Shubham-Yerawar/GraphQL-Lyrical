import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route , hashHistory , IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App  from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetails from './components/SongDetails';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// const cache = new InMemoryCache({
  
// });

const client = new ApolloClient({
  // uri: "https://w5xlvm3vzz.lp.gql.zone/graphql",
  dataIdFromObject: o => {
    // console.log(o);
    return o.id;
  }
});

const Root = () => {
  console.log('...client',client);
  return (
    <ApolloProvider client={client} >
      <Router history={hashHistory} >
        <Route path="/" component={App} >
          <IndexRoute component={SongList} />
          <Route path="/songs/new" component={SongCreate}  />
          <Route path="/songs/:id" component={SongDetails}  />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
