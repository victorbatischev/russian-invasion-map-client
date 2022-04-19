import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDate } from '../redux/GeoJson/geoJsonAction'

export const Calendar = () => {
  const date = useSelector((state) => state.geoJson.selectedDate)
  const dispatch = useDispatch()

  const onChange = (e) => dispatch(setDate(e.target.value))

  return (
    <div style={{ padding: 10 }}>
      <input type='date' value={date} onChange={(e) => onChange(e)} />
    </div>
  )
}
