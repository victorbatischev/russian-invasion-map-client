import { combineReducers, compose } from 'redux'
import { createStore } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { geoJsonReducer } from './GeoJson/geoJsonReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['storeGeoJson', 'selectedDate']
}

let reducers = combineReducers({
  geoJson: persistReducer(persistConfig, geoJsonReducer)
})

const store = createStore(
  reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export const persistor = persistStore(store)

export default store
