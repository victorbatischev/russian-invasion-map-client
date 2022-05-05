import React, {useCallback, useMemo, useState} from "react";
import {TileLayer, useMap, MapContainer, Rectangle, useMapEvent} from 'react-leaflet'
import {useEventHandlers} from "@react-leaflet/core";

const POSITION_CLASSES = {
   bottomleft: 'leaflet-bottom leaflet-left',
   bottomright: 'leaflet-bottom leaflet-right',
   topleft: 'leaflet-top leaflet-left',
   topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 1 }

function MinimapBounds({ parentMap, zoom }) {
   const minimap = useMap()
   console.log(minimap)

   // Clicking a point on the minimap sets the parent's map center
   const onClick = useCallback(
     (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom())
     },
     [parentMap],
   )
   useMapEvent('click', onClick)

   // Keep track of bounds in state to trigger renders
   const [bounds, setBounds] = useState(parentMap.getBounds())
   const onChange = useCallback(() => {
      setBounds(parentMap.getBounds())
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom)
   }, [minimap, parentMap, zoom])

   // Listen to events on the parent map
   const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
   useEventHandlers({ instance: parentMap }, handlers)

   return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

export const MinimapControl = ({ position, zoom }) => {
   const parentMap = useMap()
   const mapZoom = zoom || 0

   // Memoize the minimap so it's not affected by position changes
   const minimap = useMemo(
     () => (
       <MapContainer
         style={{ height: 120, width: 120 }}
         center={parentMap.getCenter()}
         zoom={mapZoom}
         doubleClickZoom={false}
         attributionControl={false}
         zoomControl={false}
        >
          {/*leaflet-control-minimap leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom leaflet-control*/}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
       </MapContainer>
     ),
     [],
   )

   const positionClass =
     (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
   return (
     <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
     </div>
   )
}