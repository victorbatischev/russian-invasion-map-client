import React from 'react'

import {Map} from './Components/Map'
import {Calendar} from './Components/Calendar/Calendar'
import {ListEvents} from "./Components/ListEvents/ListEvents";
import {Header} from "./Components/Header/Header";

const App = () => {
   return (
     <div className={'App'}>
        <Header/>
        <main className={'App__main'}>
           <Map/>
           <ListEvents />
        </main>

     </div>
   )
}

export default App
