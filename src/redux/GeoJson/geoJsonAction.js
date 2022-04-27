import {SET_GEO_JSON} from './geoJsonConsts'
import axios from "axios";
import {geojsonData} from "../../Constants";

export const setGeoJson = (geoJsonData) => ({
  type: SET_GEO_JSON,
  payload: { geoJsonData }
})

export const getDataGeoJson = (date,startDate=null) => async (dispatch) => {
  try {
    if(startDate){
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/map/get-data/?startDate=2022-04-19&date=2022-04-25`)
      debugger
      dispatch(setGeoJson(response.data.data))
    }else {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/map/get-data/?date=${date}`)
      dispatch(setGeoJson(response.data.data))
    }
  }catch (e) {

    dispatch(setGeoJson({json_data: null}))
  }
}
