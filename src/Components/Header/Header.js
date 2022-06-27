import React, {useEffect, useState} from 'react'
import logo from './../../Logo.jpg'
import './header.scss'
import {
   currentDate,
   mapCenterDonbass,
   mapCenterUkraine,
   menuHeaderList,
   optionsDate
} from '../../Constants'
import {Calendar} from '../Calendar/Calendar'
import {useDispatch, useSelector} from 'react-redux'
import {
   setEndDate,
   setSelectedDate,
   setStartDate
} from '../../redux/Date/dataAction'
import {getDataGeoJson} from '../../redux/GeoJson/geoJsonAction'
import {Modal} from "../Modal/Modal";
import axios from "axios";
import MenuTop from "./MenuTop";
import MenuDate from "./MenuDate";
import {ListEvents} from "../ListEvents/ListEvents";


export const Header = ({startPlayer, mapRef, setActiveModal, activeModal}) => {

   const maxWindow1335 = window.matchMedia('(max-width: 1335px)')
   const maxWindow1024 = window.matchMedia('(max-width: 1024px)')
   const minWindow875 = window.matchMedia('(min-width: 875px)')
   const [burgerActive, setBurgerActive] = useState(false)

   return (
     <header className="header">
        <div className="header__container">
           <div className="header__body">
              <div className="header__icon">
                 <div className="header__logo">
                    <img src={logo} alt="logo"/>
                 </div>
              </div>
              {maxWindow1335.matches && minWindow875.matches &&
              <MenuDate burgerActive={burgerActive} setActiveModal={setActiveModal} activeModal={activeModal}/>}
              <div className={burgerActive ? 'header__burger active' : 'header__burger'}
                   onClick={() => setBurgerActive(prev => !prev)}>
                 <span/>
              </div>
              <nav className={burgerActive ? 'header__menu active' : 'header__menu'}>
                 <MenuTop mapRef={mapRef}/>
                 {(maxWindow1335.matches && minWindow875.matches) ||
                 <MenuDate startPlayer={startPlayer} burgerActive={burgerActive} setActiveModal={setActiveModal}
                           activeModal={activeModal}/>}
                 {maxWindow1024.matches && <ListEvents mapRef={mapRef}/>}
              </nav>
           </div>
           <Modal setActive={setActiveModal} active={activeModal}>
              <div className={'modal-body'}>
                 <p className={'modal-body__text'}>Внимание!</p>
                 <p className={'modal-body__text'}>Администрация сайта не несет ответственности за точность, полноту или
                    качество предоставленной информации.</p>
                 <p className={'modal-body__text'}>По требованию Роскомнадзора ООО «Портал» приводит данные о деталях
                    военной операции на Украине на основании информаци и российских официальных источников.</p>
              </div>
           </Modal>
        </div>
     </header>
   )
}
