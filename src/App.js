import React, {useRef, useState} from 'react'

import { Map } from './Components/Map'
import { Calendar } from './Components/Calendar/Calendar'
import { ListEvents } from './Components/ListEvents/ListEvents'
import { Header } from './Components/Header/Header'
import { Player } from './Components/Player/Player'
import {MapContainer, useMap} from "react-leaflet";

const App = () => {

  const [startPlayer, setStartPlayer] = useState(false)
   const mapRef = useRef()

  return (
    <div className={'App'}>
      {/*<Header startPlayer={startPlayer}/>*/}
       <Header startPlayer={startPlayer} mapRef={mapRef}/>
      <main className={'App__main'}>
        <Map startPlayer={startPlayer}  setStartPlayer={setStartPlayer} mapRef={mapRef}/>
        <ListEvents mapRef={mapRef}/>
      </main>

    </div>
  )
}

export default App
