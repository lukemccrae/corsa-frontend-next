import { MapViewProps } from "./types";
import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function MapView(props: MapViewProps) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/leaflet"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div>
      <Map geoJson={props.geoJson}></Map>
    </div>
  );
}
