import React, {useState} from 'react';
import {currentDate, optionsDate} from "../../Constants";
import {Calendar} from "../Calendar/Calendar";
import {useDispatch, useSelector} from "react-redux";
import {setEndDate, setSelectedDate, setStartDate} from "../../redux/Date/dataAction";
import {getDataGeoJson} from "../../redux/GeoJson/geoJsonAction";
import {Modal} from "../Modal/Modal";

const MenuDate = ({startPlayer, burgerActive, setActiveModal, activeModal}) => {

   const dispatch = useDispatch()
   const startDate = useSelector((state) => state.date.startDate)
   const endDate = useSelector((state) => state.date.endDate)
   const selectedDate = useSelector((state) => state.date.selectedDate)

   const onChangeDatePeriod = (dates) => {
      const [start, end] = dates
      dispatch(setStartDate(start))
      dispatch(setEndDate(end))
      if (start && end) {
         dispatch(
           getDataGeoJson(
             start.toLocaleString('sv-SE').substring(0, 10),
             end.toLocaleString('sv-SE').substring(0, 10)
           )
         )
      }
   }

   const onChangeDateOnly = (dates) => dispatch(setSelectedDate(dates))
   const minWindow874 = window.matchMedia('(max-width: 874px)')

   return (
     <>
        <ul className='menu-date'>
           <li className='menu-date__item' onClick={() => onChangeDateOnly(new Date())}>
              Сегодня:{' '}
              <span>{currentDate.toLocaleString('ru', optionsDate)}</span>
           </li>
           <li className='menu-date__item'>
              Выбранная дата:{' '}
              <Calendar
                startDate={selectedDate}
                onChange={onChangeDateOnly}
                selectsRange={false}
                startPlayer={startPlayer}
              />
           </li>
           <li className='menu-date__item'>
              Период:{' '}
              <Calendar
                startDate={startDate}
                endDate={endDate}
                onChange={onChangeDatePeriod}
                selectsRange={true}
                startPlayer={startPlayer}
              />
           </li>
           <li className={'menu-date__item'} onClick={() => setActiveModal(true)}>
              {minWindow874.matches ? 'Справочная информация' : ''}
              <span className={'menu-date__item_icon-info'}>?</span>
           </li>
        </ul>

     </>
   );
};

export default MenuDate;