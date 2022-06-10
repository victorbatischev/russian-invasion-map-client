import axios from "axios";
import {setGeoJson} from "../GeoJson/geoJsonAction";
import {SET_GEO_JSON} from "../GeoJson/geoJsonConsts";


export const getNews = () => async (dispatch) => {

   const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/news/get-events`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
         //Origin: 'http://localhost:3000',
         //Content-Type': 'application/json',
        // withCredentials: true
      }
   })
   debugger
   console.log(response)


};