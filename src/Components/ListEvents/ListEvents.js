import React, { useEffect, useState } from 'react'
import './listEvents.scss'
import {useDispatch, useSelector} from 'react-redux'
import L from "leaflet"
import { newsSelector } from '../../redux/News/newsSelectors'
import {useMap} from "react-leaflet";
import {getNews} from "../../redux/News/newsAction";

export const ListEvents = ({ mapRef }) => {
  //const [warEvents, setWarEvents] = useState()
  const news = useSelector(newsSelector)
  const zoom = 8
   const dispatch = useDispatch()
   const [d, ds] = useState(null)


  // console.log(map)
  const showEvent = (id) => {
    const center = news[id-1].coordinates
    mapRef.current.setView(center, zoom)
  }
   console.log('evenr')
  useEffect( ()=>{
     dispatch(getNews())
  }, [d])

  return (
    <div className='list-events'>
      <h3>Последние события:</h3>
      <div className='list-events__container'>
        {news &&
          news.map((list, i) => (
            <article
              className='list-events events-list'
              key={list.id}
              onClick={() => showEvent(list.id)}
            >
              <div className='events-list__header'>
                <div className='events-list__icon'>
                  <img src={list.photo} alt={list.photo} />
                </div>
                <div className='events-list__data'>{list.created_at}</div>
              </div>
              <div className='events-list__body'>
                <div className='events-list__text'>
                  {list.title}
                </div>
              </div>
            </article>
          ))}
        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}
