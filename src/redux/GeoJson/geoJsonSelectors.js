export const filteredDataOnDate = (state) => {
  console.log(state)

  const date = state.geoJson.selectedDate

  let result = state.geoJson.storeGeoJson.find((item) => item.date === date)

  console.log(result)

  return result?.geoJsonData || []
}
