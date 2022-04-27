export const filteredDataOnDate = (state) => {

   // const date = state.date.selectedDate
   //
   // let result = state.geoJson.storeGeoJson.filter(item => item.date <= date.toLocaleString().substring(0,10))

  // return result[result.length - 1]?.geoJsonData || []

   return state.geoJson.storeGeoJson
}
