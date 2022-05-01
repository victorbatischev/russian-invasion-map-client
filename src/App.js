import React from 'react'

import { Map } from './Components/Map'
import { Calendar } from './Components/Calendar/Calendar'
import { ListEvents } from './Components/ListEvents/ListEvents'
import { Header } from './Components/Header/Header'
import { Player } from './Components/Player/Player'

const App = () => {
  return (
    <div className={'App'}>
      <Header />
      <main className={'App__main'}>
        <Map />
        <ListEvents />
      </main>
       <Player />
    </div>
  )
}

export default App
