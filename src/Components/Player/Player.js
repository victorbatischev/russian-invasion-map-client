import React, { useEffect, useState } from 'react'
import './player.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getDataGeoJson, setGeoJson } from '../../redux/GeoJson/geoJsonAction'
import { filteredDataOnPeriod } from '../../redux/GeoJson/geoJsonSelectors'
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

export const Player = ({ startPlayer, setStartPlayer }) => {
  const dispatch = useDispatch()
  const geojsonData = useSelector(filteredDataOnPeriod)
  const [progressValue, setProgressValue] = useState(0)
  // const [startPlayer, setStartPlayer] = useState(false)

  const stepPlayer = geojsonData
    ? +(100 / (geojsonData.length - 1)).toFixed(12)
    : 0

  const changeProgressBar = (e) => {
    const value = +e.target.value
    if (value > 100 - stepPlayer) {
      dispatch(setGeoJson(geojsonData[geojsonData.length - 1]))
    } else {
      dispatch(setGeoJson(geojsonData[Math.ceil(+e.target.value / stepPlayer)]))
    }
    setProgressValue(+e.target.value)
  }

  const onStart = () => setStartPlayer((prev) => !prev)

  // const forwardRewind = () => {
  //    if(progressValue < 100){
  //       dispatch(setGeoJson(geojsonData[Math.ceil((progressValue/stepPlayer))]))
  //       setProgressValue(prev => prev + stepPlayer)
  //    }
  // }
  //
  // const backwardRewind = () => {
  //    console.log('ifffff', Math.ceil(progressValue/stepPlayer)-1)
  //    if(progressValue > 0){
  //       console.log('ifffff2222222222', Math.ceil(progressValue/stepPlayer)-1)
  //       dispatch(setGeoJson(geojsonData[Math.floor(progressValue/stepPlayer)-1]))
  //       setProgressValue(prev => prev - stepPlayer)
  //    }
  // }

  const jumpEnd = () => {
    setProgressValue(100)
    dispatch(setGeoJson(geojsonData[geojsonData.length - 1]))
  }
  const jumpStart = () => {
    setProgressValue(0)
    dispatch(setGeoJson(geojsonData[0]))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (startPlayer) {
        if (Math.ceil(progressValue) >= 100) {
          setStartPlayer(false)
          return
        }
        const index = Math.ceil(progressValue / stepPlayer + 1)
        // console.log('index = ', index, "Длина ползунка после = ",progressValue, "Шаг = ", stepPlayer)
        setProgressValue((prev) => prev + stepPlayer)
        dispatch(setGeoJson(geojsonData[index]))
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [progressValue, startPlayer])

  useEffect(() => {
    setProgressValue(0)
  }, [geojsonData])

  console.log(geojsonData)
  return (
    <div className={'player'}>
      <div className='player__container'>
        <div className='player__control'>
          <button
            disabled={!geojsonData}
            className={'player__button'}
            onClick={() => jumpStart()}
          >
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          {/*<button disabled={!geojsonData} className={'player__button'} onClick={backwardRewind}><FontAwesomeIcon icon={faBackward} /></button>*/}
          <button
            disabled={!geojsonData}
            className={'player__button'}
            onClick={onStart}
          >
            {startPlayer && progressValue < 100 ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          {/*<button disabled={!geojsonData} className={'player__button'} onClick={forwardRewind}><FontAwesomeIcon icon={faForward} /></button>*/}
          <button
            disabled={!geojsonData}
            className={'player__button'}
            onClick={() => jumpEnd()}
          >
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>
        <div className={'player__strip'}>
          <input
            disabled={!geojsonData}
            className={'player__progress progress'}
            type={'range'}
            step={stepPlayer}
            value={progressValue}
            onChange={(e) => changeProgressBar(e)}
          />
          {geojsonData &&
            geojsonData.map((item, index) => (
              <div
                className={'player__hint hint'}
                key={index}
                // style={{left: (index+0.5)*100/geojsonData.length+'%'}}>{item.date}
                style={{ left: index * stepPlayer + '%' }}
              >
                <p>{item.date}</p>
                <div className={'hint__line'} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
