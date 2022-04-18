import { nowDate } from '../../Constants'
import { SET_DATE, SET_GEO_JSON } from './geoJsonConsts'

let initialState = {
  selectedDate: nowDate,
  storeGeoJson: [
    {
      date: '2022-04-18',
      geoJsonData: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [33.97979164123535, 48.330124319877235],
                [33.97721672058105, 48.309377088502615]
              ]
            }
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [33.96923446655273, 48.30293476836673]
            }
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [33.98399734497069, 48.33466623607849]
            }
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [33.97867584228514, 48.31893781173967]
            }
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [33.98069286346434, 48.300637436707525],
                  [33.98069286346434, 48.303104310307276],
                  [33.97950196266174, 48.303104310307276],
                  [33.97950196266174, 48.300637436707525],
                  [33.98069286346434, 48.300637436707525]
                ]
              ]
            }
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [33.98103886842728, 48.333075326166274],
                  [33.98065531253813, 48.332558431940114],
                  [33.9799284338951, 48.3322660885204],
                  [33.97963070869446, 48.33231693093747],
                  [33.97948586940764, 48.332467339549524],
                  [33.97945636510849, 48.33273426112019],
                  [33.97959315776825, 48.33289737938241],
                  [33.98004108667372, 48.333109220743104],
                  [33.98058557510376, 48.33328293020496],
                  [33.98080283403395, 48.33332529830436],
                  [33.98091548681259, 48.33322785163939],
                  [33.98103886842728, 48.333075326166274]
                ]
              ]
            }
          },
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [33.98043537139893, 48.32564992009924],
                  [33.98129367828368, 48.32629397920697],
                  [33.98240947723389, 48.32544653184479],
                  [33.98373985290527, 48.32632787689904],
                  [33.98425483703613, 48.32680244295304],
                  [33.98605728149415, 48.32639567223645],
                  [33.9898338317871, 48.32663295542695],
                  [33.9930953979492, 48.32415839321614],
                  [33.99700069427489, 48.321887146654376],
                  [33.9991464614868, 48.32171764783966],
                  [33.99850273132326, 48.31798857543524],
                  [33.9923156738281, 48.32090404811055],
                  [33.91232147216798, 48.323344820392535],
                  [33.90150680541992, 48.3271414168374],
                  [33.98743057250977, 48.33093781796035],
                  [33.98313903808594, 48.32822612280363],
                  [33.98043537139893, 48.32564992009924]
                ]
              ]
            }
          }
        ]
      }
    }
  ]
}

export const geoJsonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GEO_JSON:
      if (nowDate === state.storeGeoJson[state.storeGeoJson.length - 1].date) {
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
          storeGeoJson: [
            ...state.storeGeoJson,
            {
              date: nowDate,
              geoJsonData: [
                state.storeGeoJson[state.storeGeoJson.length - 1].geoJsonData,
                action.payload.geoJsonData.features
              ]
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
