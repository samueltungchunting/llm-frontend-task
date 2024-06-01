import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  OverlayView,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { SourceContext } from "../../../context/SourceContext";
import { DestinationContext } from "../../../context/Destination";

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
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
  const [route, setRoute] = useState();

  useEffect(() => {
    if (source && source.length != [] && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }

    // when source and destination are both set, then fetch the route
    if (
      source &&
      destination &&
      source.length != [] &&
      destination.length != []
    ) {
      directionRoute();
    }
  }, [source, map]);

  useEffect(() => {
    if (destination && destination.length != [] && map) {
      map?.panTo({
        lat: destination.lat,
        lng: destination.lng,
      });
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }

    // when source and destination are both set, then fetch the route
    if (
      source &&
      destination &&
      source.length != [] &&
      destination.length != []
    ) {
      directionRoute();
    }
  }, [destination, map]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (res, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setRoute(res);
        } else {
          console.log(`error fetching directions ${res}`);
        }
      }
    );
  };

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
      {source.length != [] && (
        <MarkerF
          position={{
            lat: source.lat,
            lng: source.lng,
          }}
        >
          <OverlayView
            position={{
              lat: source.lat,
              lng: source.lng,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="px-2 py-1 bg-gray-100 font-bold rounded-md inline-block w-fit">
              <p className="text-gray-700 text-xs w-fit text-nowrap">
                {source.label}
              </p>
            </div>
          </OverlayView>
        </MarkerF>
      )}
      {destination.length != [] && (
        <MarkerF
          position={{
            lat: destination.lat,
            lng: destination.lng,
          }}
        >
          <OverlayView
            position={{
              lat: destination.lat,
              lng: destination.lng,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="px-2 py-1 bg-gray-100 font-bold rounded-md inline-block w-fit">
              <p className="text-gray-700 text-xs w-fit text-nowrap">
                {destination.label}
              </p>
            </div>
          </OverlayView>
        </MarkerF>
      )}
      {[
        ["22.372081", "114.107877"],
        ["22.326442", "114.167811"],
        ["22.284419", "114.159510"],
      ].map((waypoint, index) => (
        <MarkerF
          key={index}
          position={{
            lat: parseFloat(waypoint[0]),
            lng: parseFloat(waypoint[1]),
          }}
        >
          <OverlayView
            position={{
              lat: parseFloat(waypoint[0]),
              lng: parseFloat(waypoint[1]),
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="px-2 py-1 bg-red-200 font-bold rounded-full inline-block w-fit border border-red-400">
              <p className="text-black text-xs w-fit text-nowrap">
                {index+1}
              </p>
            </div>
          </OverlayView>
        </MarkerF>
      ))}
      <DirectionsRenderer
        directions={route}
        options={{
          polylineOptions: {
            strokeColor: "#ff6c24",
            strokeOpacity: 0.8,
            strokeWeight: 5,
          },
        }}
      />
    </GoogleMap>
  );
};

export default GoogleSection;
