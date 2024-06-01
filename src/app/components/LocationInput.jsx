"use client";

import React, { useContext, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SourceContext } from "../../../context/SourceContext";
import { DestinationContext } from "../../../context/Destination";

export default function LocationInput({ type }) {
  const [value, setValue] = useState();
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const getLatLng = (place, type) => {
    const placeId = place ? place?.value?.place_id : null;
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        if (type === "source") {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      }
    });
  };

  return (
    <GooglePlacesAutocomplete
      selectProps={{
        value,
        onChange: (place) => {
          getLatLng(place, type);
          setValue(place);
        },
        placeholder: type === "source" ? "Starting location.." : "Destination..",
        className: "w-full bg-gray-200 rounded-md",
        components: {
          DropdownIndicator: false,
        },
        isClearable: true,
        onLoadFailed: (error) => {
          console.error("Could not load Google Places API script", error);
        },
        styles: {
          control: (provided) => ({
            ...provided,
            border: "none",
            backgroundColor: "#00ffff00",
            height: "3rem",
          }),
        },
      }}
    />
  );
}
