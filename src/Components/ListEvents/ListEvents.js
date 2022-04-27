import React, {useEffect, useState} from 'react';
import './listEvents.scss'
import axios from "axios";
import {useSelector} from "react-redux";
import {newsSelector} from "../../redux/News/newsSelectors";

export const ListEvents = () => {

   //const [warEvents, setWarEvents] = useState()
   const news = useSelector(newsSelector)

   // useEffect(async () => {
   //    const response = await axios.get('https://jsonplaceholder.typicode.com/photos/?_start=0&_limit=50')
   //
   //    setWarEvents(response.data)
   // }, [])

   return (
     <div className='list-events'>
        <div className="list-events__container">
           {news && news.map(list =>
             <article className="list-events events-list" key={list.id}>
                <div className="events-list__header">
                   <div className="events-list__icon">
                      <img src={list.url} alt={list.url}/>
                   </div>
                   <div className="events-list__data">{list.created_at}</div>
                </div>
                <div className="events-list__body">
                   <div className="events-list__text">
                      {list.title}
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at culpa, dicta esse est eum
                      impedit inventore iusto laboriosam laudantium minima mollitia numquam pariatur porro repellat,
                      similique sit tenetur totam.
                   </div>
                </div>
             </article>
           )}
        </div>
     </div>
   );
};
