import React, {useEffect, useState} from 'react';
import {mapCenterDonbass, mapCenterUkraine, menuHeaderList} from "../../Constants";
import axios from "axios";

const MenuTop = ({mapRef}) => {

   const [activeMenuItem, setActiveMenuItem] = useState(0)
   const [activeSubMenuItem, setActiveSubMenuItem] = useState(null)
   const [listBattles, setListBattles] = useState(null)
   const [showSubMenu, setShowSubMenu] = useState(false)

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
      setActiveSubMenuItem(null)
   }

   const toFocusEvent = (e, item)=>{
      item.bounds && mapRef.current.fitBounds(JSON.parse(item.bounds), { padding: [50, 50] })
      setActiveSubMenuItem(+e.target.dataset.index)
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
     <ul className={'menu-top'}>
        {menuHeaderList.map((item, index) => (
          <li
            key={item.id}
            data-index={index}
            className={
               index === activeMenuItem
                 ? 'menu-top__item menu-top__item_active'
                 : 'menu-top__item'
            }
            onClick={showMapCenter}
          >
             {item.title}
          </li>
        ))}

          <li
            className={'menu-top__item'}
            onClick={()=>setShowSubMenu(prev=>!prev)}
          >
             Места сражений
             {<ul className={'menu-top__sub-menu menu-sub'}>
                {listBattles && listBattles.map((item, index) => (
                  <li
                    key={index}
                    data-index={index}
                    className={activeSubMenuItem === index ? 'menu-sub__item active' : 'menu-sub__item'}
                    onClick={(e) => toFocusEvent(e, item)}
                  >
                     {item.name}
                  </li>
                ))}
             </ul>}
          </li>

     </ul>
   );
};

export default MenuTop;