import React, {useEffect, useState} from 'react';
import './player.scss'
import {useDispatch, useSelector} from "react-redux";
import {getDataGeoJson, setGeoJson} from "../../redux/GeoJson/geoJsonAction";
import {filteredDataOnPeriod} from "../../redux/GeoJson/geoJsonSelectors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faCoffee,
   faBackwardStep,
   faForwardStep,
   faPlay,
   faPause,
   faBackward,
   faForward
} from '@fortawesome/free-solid-svg-icons'



export const Player = () => {

   const dispatch = useDispatch()
   const startDate = useSelector((state) => state.date.startDate)
   const endDate = useSelector((state) => state.date.endDate)
   const geojsonData = useSelector(filteredDataOnPeriod)
   const [progressValue, setProgressValue] = useState(0)
   const [startPlayer, setStartPlayer] = useState(false)

   const stepPlayer = geojsonData ? 100 / geojsonData.length : 0

   const changeProgressBar = (e) => {
      const value = +e.target.value
      if(value>100-stepPlayer) {
         dispatch(setGeoJson(geojsonData[geojsonData.length-1]))
      }else{
         dispatch(setGeoJson(geojsonData[Math.ceil((+e.target.value/stepPlayer))]))
      }
      setProgressValue(+e.target.value)
   }

   const onStart = () => {
      // if(progressValue>=100) {
      //    dispatch(setGeoJson(geojsonData[0]))
      //    setProgressValue(0)
      // }
      setStartPlayer(prev => !prev)
   }

   const forwardRewind = () => {
      dispatch(setGeoJson(geojsonData[Math.ceil((progressValue/stepPlayer))]))
      setProgressValue(prev => prev + stepPlayer)
   }
   const backwardRewind = () => {
      dispatch(setGeoJson(geojsonData[Math.ceil(progressValue/stepPlayer)-2]))
      setProgressValue(prev => prev - stepPlayer)
   }
   const jumpEnd = () => {
      setProgressValue(100)
      // dispatch(setGeoJson(geojsonData[geojsonData.length-1]))
   }
   const jumpStart = () => setProgressValue(0)


   useEffect( () => {
      const index = Math.ceil(progressValue/stepPlayer)
      const timer = setTimeout(() => {
         if(startPlayer){
            if(progressValue>=100){
               setStartPlayer(false)
               return;
            }
            console.log('index = ', index, "Длина ползунка после = ",progressValue, "Шаг = ", stepPlayer)
            dispatch(setGeoJson(geojsonData[index]))
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
              <button disabled={!geojsonData} className={'player__button'} onClick={jumpStart}><FontAwesomeIcon icon={faBackwardStep} /></button>
              <button disabled={!geojsonData} className={'player__button'} onClick={backwardRewind}><FontAwesomeIcon icon={faBackward} /></button>
              <button
                disabled={!geojsonData} className={'player__button'}
                      onClick={onStart}>{(startPlayer && progressValue < 100) ?
                <FontAwesomeIcon icon={faPause} />
                :
                <FontAwesomeIcon icon={faPlay} />
              }
              </button>
              <button disabled={!geojsonData} className={'player__button'} onClick={forwardRewind}><FontAwesomeIcon icon={faForward} /></button>
              <button disabled={!geojsonData} className={'player__button'} onClick={jumpEnd}><FontAwesomeIcon icon={faForwardStep} /></button>
           </div>
           <div style={{position:"relative"}}>
              <input disabled={!geojsonData} className={'player__progress progress'} type={"range"} max={100} step={stepPlayer} value={progressValue}
                     onChange={(e) => changeProgressBar(e)}/>
              {geojsonData && geojsonData.map((item, index)=>(
                <div className={'player__hint hint'}
                     // style={{left: (index+0.5)*100/geojsonData.length+'%'}}>{item.date}
                   style={{left: (index)*stepPlayer+index+'%'}}>
                      <p>{item.date}</p>
                     <div className={'hint__line'} />
                </div>
              ))}

           </div>

        </div>
     </div>
   );
};
