import React, {useEffect, useState} from 'react'
import './header.scss'
import {
  currentDate,
  mapCenterDonbass,
  mapCenterUkraine,
  menuHeaderList,
  optionsDate
} from '../../Constants'
import { Calendar } from '../Calendar/Calendar'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEndDate,
  setSelectedDate,
  setStartDate
} from '../../redux/Date/dataAction'
import { getDataGeoJson } from '../../redux/GeoJson/geoJsonAction'
import {Modal} from "../Modal/Modal";
import axios from "axios";


export const Header = ({ startPlayer, mapRef }) => {

  const dispatch = useDispatch()
  const startDate = useSelector((state) => state.date.startDate)
  const endDate = useSelector((state) => state.date.endDate)
  const selectedDate = useSelector((state) => state.date.selectedDate)
  const [activeMenuItem, setActiveMenuItem] = useState(0)
  const [activeModal, setActiveModal] = useState(false)
  const [listBattles, setListBattles] = useState(null)

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

  const showMapCenter = (e) => {
    const index = e.target.dataset.index
    switch (index) {
      case '0':
        mapRef.current.setView(mapCenterUkraine, 6)
        setActiveMenuItem(+e.target.dataset.index)
        break
      case '1':
        mapRef.current.setView(mapCenterDonbass, 7)
        setActiveMenuItem(+e.target.dataset.index)
        break
      default:
        return
    }
  }

  useEffect(async ()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bounds/get-bounds`)
      setListBattles(response.data.data)
    }catch (e) {
      setListBattles([{name: 'Данных нет',bounds: null}, ])
    }
  }, [])

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
                  index === activeMenuItem
                    ? 'menu__item-top menu__item-top_active'
                    : 'menu__item-top'
                }
                onClick={showMapCenter}
              >
                {item.title}
              </li>
            ))}
            {listBattles && listBattles.map((item, index)=>(
              <li className={'menu__item-top menu__item-top'} key={index}>
               Места сражений
                <ul className={'menu__item-top__sub'}>
                  <li onClick={()=>{
                     item.bounds && mapRef.current.fitBounds(JSON.parse(item.bounds), { padding: [50, 50] })
                  }}>{item.name}</li>
                </ul>
              </li>
            ))}
          </ul>
          <ul className='menu__date-list'>
            <li className='menu__item' onClick={()=>onChangeDateOnly(new Date())}>
              Сегодня:{' '}
              <span>{currentDate.toLocaleString('ru', optionsDate)}</span>
            </li>
            <li className='menu__item'>
              Выбранная дата:{' '}
              <Calendar
                startDate={selectedDate}
                onChange={onChangeDateOnly}
                selectsRange={false}
                startPlayer={startPlayer}
              />
            </li>
            <li className='menu__item'>
              Период:{' '}
              <Calendar
                startDate={startDate}
                endDate={endDate}
                onChange={onChangeDatePeriod}
                selectsRange={true}
                startPlayer={startPlayer}
              />
            </li>
            <li className={'menu__item'} onClick={()=>setActiveModal(true)}><span className={'menu__item_icon-info'}>?</span></li>
          </ul>
        </nav>
        <Modal setActive={setActiveModal} active={activeModal}>
          <div className={'modal-body'}>
            <p className={'modal-body__text'}>Внимание!</p>
            <p className={'modal-body__text'}>Администрация сайта не несет ответственности за точность, полноту или качество предоставленной информации.</p>
            <p className={'modal-body__text'}>По требованию Роскомнадзора ООО «Портал» приводит данные о деталях военной операции на Украине на основании информаци и российских официальных источников.</p>
          </div>
        </Modal>
      </div>
    </div>
  )
}
