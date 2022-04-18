import { SET_DATE, SET_GEO_JSON } from './geoJsonConsts'

export const setGeoJson = (geoJsonData) => ({
  type: SET_GEO_JSON,
  payload: {
    geoJsonData
  }
})

export const setDate = (selectedDate) => ({
  type: SET_DATE,
  payload: {
    selectedDate
  }
})
