// src/components/Map.tsx
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import React from "react";
import { GraphQLFeatureCollection, LatLngAltitude } from "./types";

interface LeafletProps {
  geoJson: GraphQLFeatureCollection;
}

const Leaflet: React.FC<any> = (props: LeafletProps) => {
  const activity = props.geoJson.data.getGeoJsonBySortKey;
  const length = activity.features[0].geometry.coordinates.length - 10;

  const center: LatLngAltitude = [
    activity.features[0].geometry.coordinates[Math.round(length / 2)][1],
    activity.features[0].geometry.coordinates[Math.round(length / 2)][0],
    activity.features[0].geometry.coordinates[Math.round(length / 2)][2],
  ];
  return (
    <div style={{ padding: "10px" }}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "300px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          pathOptions={{ color: "blue" }} // You can customize the line color and other styles
          positions={activity.features[0].geometry.coordinates.map(
            ([lng, lat]) => [lat, lng]
          )}
        />
      </MapContainer>
    </div>
  );
};

export default Leaflet;
