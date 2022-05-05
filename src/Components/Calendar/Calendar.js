import React, { forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './calendar.scss'

export const Calendar = ({
  onChange,
  endDate,
  startDate,
  selectsRange,
  startPlayer
}) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className='calendar-input' onClick={onClick} ref={ref}>
      {value || 'Выберите период'}
    </button>
  ))

  return (
    <div className={'calendar'}>
      <DatePicker
        dateFormat='yyyy-MM-dd'
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange={selectsRange}
        minDate={new Date('2/24/22')}
        maxDate={new Date()}
        disabled={startPlayer}
        customInput={<CustomInput />}
      />
    </div>
  )
}
