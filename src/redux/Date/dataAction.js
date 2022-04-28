import {
  SET_END_DATE,
  SET_SELECTED_DATE,
  SET_START_DATE
} from './dateContstants'

export const setStartDate = (startDate) => ({
  type: SET_START_DATE,
  payload: { startDate }
})
export const setEndDate = (endDate) => ({
  type: SET_END_DATE,
  payload: { endDate }
})
export const setSelectedDate = (selectedDate) => ({
  type: SET_SELECTED_DATE,
  payload: { selectedDate }
})
