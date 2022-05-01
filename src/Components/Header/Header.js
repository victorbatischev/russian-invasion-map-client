import React, {useEffect, useState} from 'react';
import './header.scss'
import {currentDate} from "../../Constants";
import {Calendar} from "../Calendar/Calendar";
import DatePicker from "react-datepicker";
import {options} from "../../utils/configData";
import {useDispatch, useSelector} from "react-redux";
import {setEndDate, setSelectedDate, setStartDate} from "../../redux/Date/dataAction";
import {getDataGeoJson} from "../../redux/GeoJson/geoJsonAction";


export const Header = () => {


   const dispatch = useDispatch()
   const startDate = useSelector((state) => state.date.startDate)
   const endDate = useSelector((state) => state.date.endDate)
   const selectedDate = useSelector((state) => state.date.selectedDate)

   const onChangeDatePeriod = (dates) => {
      const [start, end] = dates;
      dispatch(setStartDate(start));
      dispatch(setEndDate(end));
      if(start && end){
         console.log('start', start.toLocaleString("sv-SE").substring(0,10))
         dispatch(getDataGeoJson(start.toLocaleString("sv-SE").substring(0,10), end.toLocaleString("sv-SE").substring(0,10)))
      }
   }

   const onChangeDateOnly = dates => {
    dispatch(setSelectedDate(dates))
    //dispatch(getDataGeoJson(dates.toLocaleString("sv-SE").substring(0,10)))
   }

   // useEffect(()=>{
   //    dispatch(setStartDate(startDate));
   //    dispatch(setEndDate(endDate));
   // }, [])

   return (
     <div className={'header'}>
        <div className="header__container">
           <nav className="header__menu menu">
              <ul className="menu__list">
                 <li className="menu__item">
                    Сегодня: <span>{currentDate.toISOString().substring(0,10)}</span>

                 </li>
                 <li className="menu__item">Выбранная дата:
                    <Calendar
                      startDate={selectedDate}
                      onChange={onChangeDateOnly}
                      selectsRange={false}
                    />
                 </li>
                 <li className="menu__item"> Период:
                    <Calendar
                      startDate={startDate}
                      endDate={endDate}
                      onChange={onChangeDatePeriod}
                      selectsRange={true}
                    />
                 </li>
              </ul>
           </nav>
        </div>
     </div>
   );
}

