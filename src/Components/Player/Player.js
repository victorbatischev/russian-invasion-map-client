import React, {useEffect, useState} from 'react';
import './player.scss'
import {useDispatch, useSelector} from "react-redux";
import {getDataGeoJson, setGeoJson} from "../../redux/GeoJson/geoJsonAction";
import {filteredDataOnPeriod} from "../../redux/GeoJson/geoJsonSelectors";


export const Player = () => {

   const dispatch = useDispatch()
   const startDate = useSelector((state) => state.date.startDate)
   const endDate = useSelector((state) => state.date.endDate)
   const geojsonData = useSelector(filteredDataOnPeriod)
   const [progressValue, setProgressValue] = useState(0)
   const [startPlayer, setStartPlayer] = useState(false)

   const stepPlayer = geojsonData ? 100 / geojsonData.length : 0

   const changeProgressBar = (e) => setProgressValue(+e.target.value)
   const onStart = () => {
      setStartPlayer(prev => !prev)

   }
   const jumpEnd = () => setProgressValue(100)
   const jumpStart = () => setProgressValue(0)


   useEffect(() => {
      console.log(progressValue)
      if(progressValue >= 100) {
         setProgressValue(100)
         setStartPlayer(false)
         return
      }

      const timer = setTimeout(() => {
         if(startPlayer){
            console.log(Math.ceil((progressValue/stepPlayer))-1, "TTTTTTTTTTT",progressValue, "Strt = ", startPlayer)
            dispatch(setGeoJson(geojsonData[Math.ceil((progressValue/stepPlayer))]))
            setProgressValue(prev => prev + stepPlayer)
         }
      }, 1000)
      return () => clearTimeout(timer);
   }, [progressValue, startPlayer])

   console.log(geojsonData)

   return (
     <div className={'player'}>
        <div className="player__container">
           <div className="player__control">
              <button disabled={!geojsonData} className={'player__button'} onClick={onStart}>{(startPlayer && progressValue <= 100) ? 'Pause' : 'Start'}</button>
              <button disabled={!geojsonData} className={'player__button'} onClick={jumpStart}>Begin</button>
              <button disabled={!geojsonData} className={'player__button'} onClick={jumpEnd}>End</button>
           </div>
           <input className={'player__progress progress'} type={"range"} step={stepPlayer} id="file" value={progressValue}
                  onChange={(e) => changeProgressBar(e)}/>
        </div>
     </div>
   );
};
