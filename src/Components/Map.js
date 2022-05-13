import React, { useEffect } from 'react'
import {
  TileLayer,
  FeatureGroup,
  LayersControl,
  MapContainer
} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet'
import { getDataGeoJson } from '../redux/GeoJson/geoJsonAction'
import { filteredDataOnDate } from '../redux/GeoJson/geoJsonSelectors'
import { FullscreenControl } from 'react-leaflet-fullscreen'
import 'react-leaflet-fullscreen/dist/styles.css'
import { MinimapControl } from './MinimapControl/MinimapControl'
import { mapCenterUkraine } from '../Constants'
import { Player } from './Player/Player'

export const Map = ({ startPlayer, setStartPlayer, mapRef }) => {
  const geojsonData = useSelector(filteredDataOnDate)
  const dispatch = useDispatch()
  const selectedDate = useSelector((state) => state.date.selectedDate)

  const _onFeatureGroupReady = (reactFGref) => {
    let parsedGeoJSON = geojsonData ? JSON.parse(geojsonData) : null
    console.log('load', parsedGeoJSON)
    let leafletGeoJSON = new L.GeoJSON(parsedGeoJSON)

    if (!reactFGref) {
      return
    }

    reactFGref.clearLayers()

    let index = 0

    leafletGeoJSON.eachLayer((layer) => {
      // добавляем стилизацию слоёв в GeoJSON
      let color = parsedGeoJSON.features[index].properties?.fill
      // в случае polyline или polygon меняем цвет
      if (layer?.options?.color && color) {
        layer.options.color = color
      }
      // в случае point меняем иконку и цвет
      else if (layer?.options?.icon && color) {
      }
      reactFGref.addLayer(layer)
      index++
    })
  }

  useEffect(() => {
    dispatch(
      getDataGeoJson(selectedDate.toLocaleString('sv-SE').substring(0, 10))
    )
  }, [selectedDate])

  return (
    <MapContainer
      className={'map'}
      center={mapCenterUkraine}
      zoom={6}
      zoomControl={true}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance
      }}
    >
      {1 === 4 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <LayersControl position='topleft'>
            <LayersControl.BaseLayer
              checked={false}
              name='Esri WorldImagery'
              group='BaseLayers'
            >
              <TileLayer
                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png'
                attribution='&copy; <a href="Esri &mdash">Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer
              checked={true}
              name='OpenStreetMap'
              group='BaseLayers'
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <FeatureGroup
            ref={(item) => _onFeatureGroupReady(item)}
          ></FeatureGroup>
        </>
      )}
      <FullscreenControl />
      <MinimapControl position='bottomright' />
      <Player startPlayer={startPlayer} setStartPlayer={setStartPlayer} />
    </MapContainer>
  )
}
