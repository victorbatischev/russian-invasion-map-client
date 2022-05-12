import React, { useState } from 'react'
import './header.scss'
import {
  currentDate,
  mapCenterDonbass,
  mapCenterUkraine,
  menuHeaderList
} from '../../Constants'
import { Calendar } from '../Calendar/Calendar'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEndDate,
  setSelectedDate,
  setStartDate
} from '../../redux/Date/dataAction'
import { getDataGeoJson } from '../../redux/GeoJson/geoJsonAction'


export const Header = ({ startPlayer, mapRef }) => {
  const dispatch = useDispatch()
  const startDate = useSelector((state) => state.date.startDate)
  const endDate = useSelector((state) => state.date.endDate)
  const selectedDate = useSelector((state) => state.date.selectedDate)
  const [active, setActive] = useState(0)


  const onChangeDatePeriod = (dates) => {
    const [start, end] = dates
    dispatch(setStartDate(start))
    dispatch(setEndDate(end))
    if (start && end) {
      console.log('start', start.toLocaleString('sv-SE').substring(0, 10))
      dispatch(
        getDataGeoJson(
          start.toLocaleString('sv-SE').substring(0, 10),
          end.toLocaleString('sv-SE').substring(0, 10)
        )
      )
    }
  }

  const onChangeDateOnly = (dates) => dispatch(setSelectedDate(dates))

  const showMapCenter = (e) => {
    const index = e.target.dataset.index
    switch (index) {
      case '0':
        mapRef.current.setView(mapCenterUkraine, 6)
        setActive(+e.target.dataset.index)
        break
      case '1':
        mapRef.current.setView(mapCenterDonbass, 7)
        setActive(+e.target.dataset.index)
        break
      default:
        return
    }
  }

  return (
    <div className={'header'}>
      <div className='header__container'>
        <nav className='header__menu menu'>
          <ul className={'menu__top'}>
            {menuHeaderList.map((item, index) => (
              <li
                key={item.id}
                data-index={index}
                className={
                  index === active
                    ? 'menu__item-top menu__item-top_active'
                    : 'menu__item-top'
                }
                onClick={showMapCenter}
              >
                {item.title}
              </li>
            ))}
          </ul>
          <ul className='menu__date-list'>
            <li className='menu__item-date'>
              Сегодня: <span>{currentDate.toISOString().substring(0, 10)}</span>
            </li>
            <li className='menu__item-date'>
              Выбранная дата:
              <Calendar
                startDate={selectedDate}
                onChange={onChangeDateOnly}
                selectsRange={false}
                startPlayer={startPlayer}
              />
            </li>
            <li className='menu__item-date'>
              {' '}
              Период:
              <Calendar
                startDate={startDate}
                endDate={endDate}
                onChange={onChangeDatePeriod}
                selectsRange={true}
                startPlayer={startPlayer}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
