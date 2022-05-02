import {SET_END_DATE, SET_SELECTED_DATE, SET_START_DATE} from "./dateContstants";
import {currentDate} from "../../Constants";

const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);

let initialState = {
   startDate: weekAgo,
   endDate: new Date(),
   selectedDate: new Date(),
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
