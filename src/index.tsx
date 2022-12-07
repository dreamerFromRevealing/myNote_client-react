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
import {DnDWrapper} from "./lib/DnDWrapper/DnDWrapper";



ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <DnDWrapper client={client}>
            <App/>
          </DnDWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);