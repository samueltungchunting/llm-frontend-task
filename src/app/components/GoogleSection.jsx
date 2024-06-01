import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { SourceContext } from "../../../context/SourceContext";
import { DestinationContext } from "../../../context/Destination";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleSection = ({ waypoints }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY,
  });

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: 22.372081,
    lng: 114.107877,
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (source) {
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
  }, [source, destination]);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <></>
    </GoogleMap>
  );
};

export default GoogleSection;
