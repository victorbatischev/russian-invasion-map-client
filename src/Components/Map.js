import React, {useEffect, useRef, useState} from 'react'
import {
   TileLayer,
   FeatureGroup,
   LayersControl,
   MapContainer, ZoomControl, useMap,
} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet'
import {getDataGeoJson} from '../redux/GeoJson/geoJsonAction'
import { filteredDataOnDate } from '../redux/GeoJson/geoJsonSelectors'
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import {MinimapControl} from "./MinimapControl/MinimapControl";
import {Header} from "./Header/Header";
import {mapCenterUkraine} from "../Constants";
import {Player} from "./Player/Player";
import {ListEvents} from "./ListEvents/ListEvents";

export const Map = ({startPlayer, setStartPlayer, mapRef}) => {

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



  return (
       <MapContainer className={'map'} center={mapCenterUkraine} zoom={6} zoomControl={true} whenCreated={ mapInstance => { mapRef.current = mapInstance }}>
          {1===4 ? <h1>Loading...</h1> :
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
               <FeatureGroup ref={(item) => _onFeatureGroupReady(item)}>

               </FeatureGroup>
            </>
          }
          {/*<ZoomControl position="bottomright" />*/}
          <FullscreenControl />
          <MinimapControl position="bottomright" />
          <Player startPlayer={startPlayer} setStartPlayer={setStartPlayer} />
       </MapContainer>
  )
}
