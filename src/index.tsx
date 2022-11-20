import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import {client} from "./lib/apolloClient";
import {Provider} from 'react-redux'
import store from "./store/store";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);