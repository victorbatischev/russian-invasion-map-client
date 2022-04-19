import {nowDate} from "../../Constants";

export const filteredDataOnDate = (state) => {


   const date = state.geoJson.selectedDate

   let result = date > nowDate ?
     state.geoJson.storeGeoJson.find((item) => item.date === nowDate) :
     state.geoJson.storeGeoJson.find((item) => item.date === date)


   return result?.geoJsonData || []
}
