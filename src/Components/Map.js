import React, {useEffect} from 'react'
import {
  TileLayer,
  FeatureGroup,
  LayersControl,
  MapContainer
} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet'
import {getDataGeoJson, setGeoJson} from '../redux/GeoJson/geoJsonAction'
import { filteredDataOnDate } from '../redux/GeoJson/geoJsonSelectors'
import {mapCenter} from '../Constants'
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import {Player} from "./Player/Player";

export const Map = () => {

  let _editableFG = null
  const geojsonData = useSelector(filteredDataOnDate)
  const dispatch = useDispatch()
  const selectedDate = useSelector((state) => state.date.selectedDate)


  const _onFeatureGroupReady = (reactFGref) => {

     // console.log('load', geojsonData ? JSON.parse(geojsonData) : null)
      let leafletGeoJSON = new L.GeoJSON(  geojsonData ? JSON.parse(geojsonData) : null)

      let leafletFG = reactFGref

      if (!leafletFG) {
        return
      }

      reactFGref.clearLayers()

      leafletGeoJSON.eachLayer((layer) => {
        leafletFG.addLayer(layer)
      })

      _editableFG = reactFGref

  }


  useEffect(()=>{
    dispatch(getDataGeoJson(selectedDate.toLocaleString("sv-SE").substring(0,10)))
  }, [selectedDate])


  //console.log('render map')

  return (
    <MapContainer className={'map'} center={mapCenter} zoom={6}>
      {1===4 ? <h1>Loading...</h1> :
        <>
        <LayersControl position='bottomleft'>
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
        <FeatureGroup ref={(item) => _onFeatureGroupReady(item)}>

        </FeatureGroup>
        </>
      }
       <FullscreenControl />
       {/*<Player />*/}
    </MapContainer>
  )
}
