import React, {forwardRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setDate, setEndDate, setStartDate} from '../../redux/GeoJson/geoJsonAction'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './calendar.scss'

export const Calendar = ({onChange, endDate, startDate,selectsRange}) => {
  //const startDate = useSelector((state) => state.geoJson.startDate)
 // const endDate = useSelector((state) => state.geoJson.endDate)
  //const dispatch = useDispatch()

    //const onChange = (e) => dispatch(setDate(e.target.value))


      // const [startDate, setStartDate] = useState(null);
      // const [endDate, setEndDate] = useState(null);
      // const onChange = (dates) => {
      //    const [start, end] = dates;
      //    // dispatch(setStartDate(start))
      //    // dispatch(setEndDate(end))
      //    setStartDate(start);
      //    setEndDate(end);
      // }
   //console.log(startDate, "Start")

   const CustomInput = forwardRef(({ value, onClick }, ref) => (
     <button className="calendar-input" onClick={onClick} ref={ref}>
        {value}
     </button>
   ));

  return (
    <div className={'calendar'}>
       <DatePicker
         dateFormat="yyyy-MM-dd"
         selected={startDate}
         onChange={onChange}
         startDate={startDate}

         endDate={endDate}
         selectsRange={selectsRange}
         minDate={new Date("2/24/22")}
         customInput={<CustomInput />}
       />

    </div>
  )
}
