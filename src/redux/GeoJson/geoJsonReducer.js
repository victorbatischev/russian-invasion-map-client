import { nowDate } from '../../Constants'
import { SET_DATE, SET_GEO_JSON } from './geoJsonConsts'

let initialState = {
  selectedDate: nowDate,
  storeGeoJson: []
}

export const geoJsonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GEO_JSON:
      if (state.storeGeoJson.some((item) => item.date === nowDate)) {
        return {
          ...state,
          storeGeoJson: state.storeGeoJson.map((item) => {
            if (item.date === nowDate) {
              return {
                ...item,
                geoJsonData: {
                  type: 'FeatureCollection',
                  features: action.payload.geoJsonData.features
                }
              }
            }
            return item
          })
        }
      } else {
        return {
          ...state,
          storeGeoJson: [
            ...state.storeGeoJson,
            {
              date: nowDate,
              geoJsonData: {
                type: 'FeatureCollection',
                features: action.payload.geoJsonData.features
              }
            }
          ]
        }
      }

    case SET_DATE:
      return {
        ...state,
        selectedDate: action.payload.selectedDate
      }

    default:
      return state
  }
}