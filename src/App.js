import React, {useRef, useState} from 'react'
import {Map} from './Components/Map'
import {Dsa, ListEvents} from './Components/ListEvents/ListEvents'
import {Header} from './Components/Header/Header'

const App = () => {

   const [startPlayer, setStartPlayer] = useState(false)
   const [activeModal, setActiveModal] = useState(false)

   const mapRef = useRef()

   return (
     <div className={'App'}>
        <Header
          startPlayer={startPlayer}
          mapRef={mapRef}
          setActiveModal={setActiveModal}
          activeModal={activeModal}
        />
        <main className={'App__main'}>
           <Map
             startPlayer={startPlayer}
             setStartPlayer={setStartPlayer}
             mapRef={mapRef}
           />
           <ListEvents mapRef={mapRef}/>
           {/*<Dsa mapRef={mapRef}/>*/}
        </main>
     </div>
   )
}

export default App
