import React, {useCallback, useEffect, useMemo, useState} from 'react'
import './listEvents.scss'
import {useDispatch, useSelector} from 'react-redux'
import L from "leaflet"
import {newsSelector} from '../../redux/News/newsSelectors'
import {useMap} from "react-leaflet";
import {getNews} from "../../redux/News/newsAction";

export const ListEvents = ({mapRef}) => {

   const [selectedNewsID, setSelectedNewsID] = useState(null)
   const news = useSelector(newsSelector)
   const zoom = 8
   const dispatch = useDispatch()
   const [tem, setTem] = useState([0, 0])

   const showEvent = (id) => {
      setSelectedNewsID(id)
      const center = JSON.parse(news.find(item => item.id === id).coordinates)
      mapRef.current.setView(center, zoom)
      if (L.marker(tem).getLatLng().lat !== center[0] || L.marker(tem).getLatLng().lng !== center[1]) {
         L.marker(center).addTo(mapRef.current)
         setTem(center)
      }
      console.log("456")
   }
   const memoizedValue = useCallback((id) => showEvent(id), []);
   console.log('event')
   useEffect(() => {
      //dispatch(getNews())
   }, [])

   return (
     <div className='list-events'>
        <h3>Последние события:</h3>
        <div className='list-events__container'>
           {news &&
           news.map(list => (
             <article
               className={list.id === selectedNewsID
                 ? 'list-events events-list events-list_selected'
                 : 'list-events events-list'}
               key={list.id}
               onClick={() => showEvent(list.id)}
             >
                <div className='events-list__header'>
                   <div className='events-list__icon'>
                      <img src={list.photo} alt={list.id}/>
                   </div>
                   <div className='events-list__data'>{list.event_time}</div>
                </div>
                <div className='events-list__body'>
                   <div className='events-list__text'>
                      {list.title}
                   </div>
                </div>
             </article>
           ))}
        </div>
     </div>
   )
}
