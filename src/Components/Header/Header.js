import React, {useEffect, useState} from 'react'
import logo from './../../Logo.jpg'
import './header.scss'
import {Modal} from "../Modal/Modal";
import MenuTop from "./MenuTop";
import MenuDate from "./MenuDate";

export const Header = ({startPlayer, mapRef, setActiveModal, activeModal}) => {

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
              <div className={burgerActive ? 'header__burger active' : 'header__burger'}
                   onClick={() => setBurgerActive(prev => !prev)}>
                 <span/>
              </div>
              <MenuTop mapRef={mapRef} />
              <MenuDate startPlayer={startPlayer} setActiveModal={setActiveModal} />
              <nav className={burgerActive ? 'header__menu active' : 'header__menu'}>
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
