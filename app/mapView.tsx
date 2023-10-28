import { MapContainer, Marker } from "react-leaflet";
import { FeatureCollection } from "./types";
import { useEffect, useRef } from "react";
import L from "leaflet";
import { mockgeojson } from "./mockgeojson";

interface MapViewProps {
  geoJson: GraphQLFeatureCollection;
}

interface GraphQLFeatureCollection {
  data: GetGeoJsonBySortKey;
}

interface GetGeoJsonBySortKey {
  getGeoJsonBySortKey: FeatureCollection;
}

export const MapView = (props: MapViewProps) => {
  console.log(JSON.stringify(props.geoJson), "<< props");

  const parsed: GraphQLFeatureCollection = JSON.parse(mockgeojson);

  return (
    <div>
      <MapContainer center={[45.4, -75.7]} zoom={12}>
        {/* {props.geoJson.data.getGeoJsonBySortKey.features.map((point) => (
          <Marker
            position={[
              point.geometry.coordinates[1] as unknown as number,
              point.geometry.coordinates[0] as unknown as number,
            ]}
          />
        ))} */}
        {parsed.data.getGeoJsonBySortKey.features.map((point) => (
          <Marker
            position={[
              point.geometry.coordinates[1] as unknown as number,
              point.geometry.coordinates[0] as unknown as number,
            ]}
          />
        ))}
      </MapContainer>
    </div>
  );
};
