'use strict'

import React from 'react'

import { MarkdownEditorComponent } from '../mainComponents/markdownEditor/component.jsx'

export class MainComponent extends React.Component {
  render () {
    return (
      <main role="main">
        <MarkdownEditorComponent />
      </main>
    )
  }
}
