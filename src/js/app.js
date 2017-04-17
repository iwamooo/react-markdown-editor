'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import { HeaderComponent } from './globalComponents/headerComponent.jsx'
import { MainComponent } from './globalComponents/mainComponent.jsx'

const App = class Component extends React.Component {
  render () {
    return (
      <div>
        <HeaderComponent />
        <MainComponent />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
