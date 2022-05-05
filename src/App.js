import React, {useState} from 'react'

import { Map } from './Components/Map'
import { Calendar } from './Components/Calendar/Calendar'
import { ListEvents } from './Components/ListEvents/ListEvents'
import { Header } from './Components/Header/Header'
import { Player } from './Components/Player/Player'

const App = () => {

   const [startPlayer, setStartPlayer] = useState(false)

  return (
    <div className={'App'}>
      {/*<Header startPlayer={startPlayer}/>*/}
      <main className={'App__main'}>
        <Map startPlayer={startPlayer}/>
        <ListEvents />
      </main>
       <Player startPlayer={startPlayer} setStartPlayer={setStartPlayer}/>
    </div>
  )
}

export default App
