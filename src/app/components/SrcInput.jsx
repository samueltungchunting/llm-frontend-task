"use client";

import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function SrcInput({ srcValue, setSrcValue }) {
  console.log(srcValue, "srcValue");

  return (
    <GooglePlacesAutocomplete
      selectProps={{
        srcValue,
        onChange: setSrcValue,
        placeholder: "Starting location..",
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
          }),
        },
      }}
    />
  );
}
