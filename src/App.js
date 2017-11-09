import React, { Component } from 'react'
import Queue from './components/Queue'
import Header from './components/Header'
import Login from './components/Login'
import { Switch, Route } from 'react-router-dom'
import { GC_AUTH_TOKEN }  from './constants'

class App extends Component {
  render() {
    const isLoggedIn = localStorage.getItem(GC_AUTH_TOKEN)
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
          {!isLoggedIn ?
           (<Route exact path='/login' component={Login}/>)
          :
            (<Route exact path='/' component={Queue}/>)
          }
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
