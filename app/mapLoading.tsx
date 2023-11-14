import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { FeatureCollection, GraphQLFeatureCollection } from "./types";
import { fetchGeoJson } from "./services/fetchGeoJson.service";
import MapView from "./mapView";

interface MapLoadingProps {
  id: string;
  setAlert: Function;
  setGeoJson: Function;
  geoJson: any;
  setLastMileLength: Function;
}

export const MapLoading = (props: MapLoadingProps) => {
  const typedGeoJson: GraphQLFeatureCollection = props.geoJson;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const planId = props.id;
    const setAlert = props.setAlert;
    const setGeoJson = props.setGeoJson;
    const setLastMileLength = props.setLastMileLength;

    // loading var keeps fetch from firing more than once
    fetchGeoJson({ planId, setGeoJson, setAlert, setLastMileLength }).finally(
      () => setLoading(false)
    );
  });
  if (loading) {
    return <div>loading...</div>;
  } else {
    if (typedGeoJson) return <MapView geoJson={typedGeoJson}></MapView>;
  }
};
