import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { FeatureCollection } from "./types";
import { fetchGeoJson } from "./services/fetchGeoJson.service";
import { MapView } from "./mapView";

interface MapLoadingProps {
  id: string;
}

export const MapLoading = (props: MapLoadingProps) => {
  const [loading, setLoading] = useState(true);
  const [geoJson, setGeoJson] = useState();
  useEffect(() => {
    const planId = props.id;

    // loading var keeps fetch from firing more than once
    fetchGeoJson({ planId, setGeoJson }).finally(() => setLoading(false));
  }, [props.id]);
  if (loading) {
    return <div>loading...</div>;
  } else {
    if (geoJson) return <MapView geoJson={geoJson}></MapView>;
  }
};
