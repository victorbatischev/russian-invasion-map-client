import React, { Component } from 'react'
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import L from 'leaflet'
import { EditControl } from 'react-leaflet-draw'
import { geojsonData } from './Constants'

export default class EditControlExample extends Component {
  _onEdited = (e) => {
    this._onChange()
  }

  _onCreated = (e) => {
    this._onChange()
  }

  _onDeleted = (e) => {
    this._onChange()
  }

  _onChange = () => {
    // save data
  }

  _onFeatureGroupReady = (reactFGref) => {
    let leafletGeoJSON = new L.GeoJSON(geojsonData)
    let leafletFG = reactFGref

    leafletGeoJSON.eachLayer((layer) => {
      leafletFG.addLayer(layer)
    })
  }

  render() {
    return (
      <div className='App'>
        <MapContainer center={[37.8189, -122.4786]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <FeatureGroup
            ref={(reactFGref) => {
              this._onFeatureGroupReady(reactFGref)
            }}
          >
            <EditControl
              position='topright'
              onEdited={this._onEdited}
              onCreated={this._onCreated}
              onDeleted={this._onDeleted}
              draw={{ rectangle: true }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>
    )
  }
}
