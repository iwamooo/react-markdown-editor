'use strict'

import React from 'react'
import marked from 'marked'

export class MarkdownEditorComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      panel: 'separate',
      layout: 'horizontal',
      textValue: ''
    }
  }

  initSetTextValue () {
    if (localStorage.getItem('markdown')) {
      const getMdData = JSON.parse(localStorage.getItem('markdown'))

      this.setState({
        textValue: getMdData
      })
    }
  }

  preview () {
    return {__html: marked(this.state.textValue)}
  }

  save () {
    localStorage.setItem('markdown', JSON.stringify(this.state.textValue))
  }

  handleChangeSetTextValue (e) {
    this.setState({
      textValue: e.target.value
    })
  }

  handleClickPanelSingleEdit () {
    this.setState({
      panel: 'single-edit'
    })
  }

  handleClickPanelSinglePreview () {
    this.setState({
      panel: 'single-preview'
    })
  }

  handleClickPanelSeparate () {
    this.setState({
      panel: 'separate'
    })
  }

  handleClickLayoutHorizontal () {
    this.setState({
      layout: 'horizontal'
    })
  }

  handleClickLayoutVertical () {
    this.setState({
      layout: 'vertical'
    })
  }

  handleScrollTextArea (e) {
    document.getElementById('js-previewArea').scrollTop = e.target.scrollTop
  }

  handleScrollPreviewArea (e) {
    document.getElementById('js-textArea').scrollTop = e.target.scrollTop
  }

  handleClickDownloadBtn (e) {
    const markdownData = document.getElementById('js-textArea').value

    let blob = new Blob([markdownData])
    let blobURL = window.URL.createObjectURL(blob)
    let a = document.createElement('a')

    a.href = blobURL
    a.download = 'markdow.md'

    document.body.appendChild(a)

    a.click()
    a.parentNode.removeChild(a)
  }

  componentDidMount () {
    this.initSetTextValue()
    this.preview()
  }

  componentDidUpdate (prevProps, prevState) {
    this.save()
  }

  render () {
    return (
      <div data-panel={this.state.panel} data-layout={this.state.layout}>
        <nav role="navigation">
          <dl className="settingNav">
            <dt className="item">PANEL : </dt>
            <dd className="item">
              <a onClick={this.handleClickPanelSingleEdit.bind(this)} className="link">
                <svg className="icon iconSingleEdit" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100"><rect width="100" height="100" rx="3" ry="3"/></svg>
                <span className="text textSingleEdit">E</span>
              </a>
            </dd>
            <dd className="item">
              <a onClick={this.handleClickPanelSinglePreview.bind(this)} className="link">
                <svg className="icon iconSinglePreview" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100"><rect width="100" height="100" rx="3" ry="3"/></svg>
                <span className="text textSinglePreview">P</span>
              </a>
            </dd>
            <dd className="item">
              <a onClick={this.handleClickPanelSeparate.bind(this)} className="link">
                <svg className="icon iconSeparate" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100"><rect width="48" height="100" rx="3" ry="3"/><rect x="52" width="48" height="100" rx="3" ry="3"/></svg>
              </a>
            </dd>
            <dt className="item">LAYOUT : </dt>
            <dd className="item">
              <a onClick={this.handleClickLayoutHorizontal.bind(this)} className="link">
                <svg className="icon iconHorizontal" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100"><rect width="48" height="100" rx="3" ry="3"/><rect x="52" width="48" height="100" rx="3" ry="3"/></svg>
              </a>
            </dd>
            <dd className="item">
              <a onClick={this.handleClickLayoutVertical.bind(this)} className="link">
                <svg className="icon iconVertical" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100"><rect width="100" height="48" rx="3" ry="3"/><rect y="52" width="100" height="48" rx="3" ry="3"/></svg>
              </a>
            </dd>
            <dd className="item">
              <a onClick={this.handleClickDownloadBtn.bind(this)} className="link">
                <svg className="iconDownload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fill="#4B4B4B"><path d="M243.59 309.362c3.273 4.317 7.68 6.692 12.41 6.692s9.136-2.376 12.41-6.69l89.593-118.093c3.348-4.413 4.274-8.69 2.61-12.04-1.665-3.35-5.63-5.2-11.167-5.2H315.14c-9.288 0-16.844-7.553-16.844-16.84V59.778c0-11.04-8.983-20.027-20.024-20.027h-44.546c-11.04 0-20.022 8.987-20.022 20.027v97.415c0 9.286-7.556 16.84-16.844 16.84h-34.305c-5.538 0-9.503 1.848-11.168 5.198-1.665 3.35-.738 7.628 2.61 12.046l89.594 118.086z"/><path d="M445.218 294.16v111.304H66.782V294.16H0v152.648c0 14.03 11.413 25.443 25.44 25.443h461.12c14.027 0 25.44-11.412 25.44-25.442V294.16h-66.782z"/></g></svg>
              </a>
            </dd>
          </dl>
        </nav>

        <div className="panel">
          <textarea onChange={this.handleChangeSetTextValue.bind(this)} onScroll={this.handleScrollTextArea.bind(this)} value={this.state.textValue} id="js-textArea" className="textArea" placeholder="Type some *markdown* here!" />

          <div dangerouslySetInnerHTML={this.preview()} onScroll={this.handleScrollPreviewArea.bind(this)} id="js-previewArea" className="previewArea" />
        </div>
      </div>
    )
  }
}
