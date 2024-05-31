"use client";

import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function SrcInput({ srcValue, setSrcValue }) {

  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}
      selectProps={{
        srcValue,
        onChange: setSrcValue,
        placeholder: "Starting location",
        // className: "pl-9",
        components: {
          DropdownIndicator: false,
        },
        isClearable: true,
        onLoadFailed: (error) => {
          console.error("Could not load Google Places API script", error);
        },
      }}
    />
  );
}
