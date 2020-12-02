import React from 'react'
import { Route } from 'react-router-dom'
import Objects from './Objects'
import './App.css'

function App () {
  return (
    <div>
      <Route
        path='/'
        render={() => <Objects />}
      />
    </div>
  )
}

export default App
