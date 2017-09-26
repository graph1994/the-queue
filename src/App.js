import React, { Component } from 'react'
import Queue from './components/Queue'
import CreateItem from './components/CreateItem'

class App extends Component {
  render() {
    return (
      <div>
      <section className="todoapp">
        <CreateItem />
        <Queue />
            </section>
      </div>
    )
  }
}

export default App
