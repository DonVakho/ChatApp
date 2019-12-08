import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http';

import './index.css';
import App from './App';

import Store from './components/Stores/Store'

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: Store.HOST + ':5000/entrance/'
})
const client = new ApolloClient({
    link,
    cache,
})

const rootElement = document.getElementById('root');
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, rootElement);