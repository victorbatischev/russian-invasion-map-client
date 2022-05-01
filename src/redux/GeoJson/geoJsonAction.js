import {SET_GEO_JSON} from './geoJsonConsts'
import axios from "axios";
import {geojsonData} from "../../Constants";

export const setGeoJson = (geoJsonData) => ({
  type: SET_GEO_JSON,
  payload: { geoJsonData }
})

export const getDataGeoJson = (date,endDate=null) => async (dispatch) => {
  try {
    if(endDate){
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/map/get-data/?startDate=${date}&date=${endDate}`)
      dispatch(setGeoJson(response.data.data))
    }else {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/map/get-data/?date=${date}`)
      dispatch(setGeoJson(response.data.data))
    }
  }catch (e) {
    dispatch(setGeoJson({json_data: null}))
  }
}
