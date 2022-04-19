export const filteredDataOnDate = (state) => {
  const date = state.geoJson.selectedDate

  let result = state.geoJson.storeGeoJson.find((item) => item.date === date)

  return result?.geoJsonData || []
}
