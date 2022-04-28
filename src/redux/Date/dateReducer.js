import { currentDate } from '../../Constants'
import {
  SET_END_DATE,
  SET_SELECTED_DATE,
  SET_START_DATE
} from './dateContstants'

let initialState = {
  startDate: new Date().setDate(currentDate.getDate() - 7),
  endDate: new Date().setDate(currentDate.getDate()),
  selectedDate: new Date()
}

export const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload.startDate
      }
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload.endDate
      }
    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload.selectedDate
      }
    default:
      return state
  }
}
