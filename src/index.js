import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider, } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { apollo } from './lib/apollo'

import './index.css'
import App from './components/App'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

const GRAPHQL_PINK = '#e10098'

const theme = createMuiTheme({
  palette: { primary: { main: GRAPHQL_PINK } },
  typography: { useNextVariants: true },
})

render(
  <BrowserRouter>
    <ApolloProvider client={apollo}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)


module.hot.accept()
