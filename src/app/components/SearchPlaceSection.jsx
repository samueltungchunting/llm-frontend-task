import React, { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, LocateFixed, MapPin, Loader2 } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import LocationInput from "./LocationInput";
import { SourceContext } from "../../../context/SourceContext";
import { DestinationContext } from "../../../context/Destination";

const SearchPlaceSection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [waypoints, setWaypoints] = useState([]);
  const [path, setPath] = useState({});

  const MOCK_API_URL = "https://sg-mock-api.lalamove.com";

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    if (source) {
      //   setCenter({
      //     lat: source.lat,
      //     lng: source.lng,
      //   });
      console.log("source", source);
    }
    if (destination) {
        //   setCenter({
        //     lat: destination.lat,
        //     lng: destination.lng,
        //   });
        console.log("destination", destination);
    }
  }, [source, destination]);

  const fetchData = async () => {
    if (loading) return;
    // if (!srcValue || !destValue) {
    if (!srcValue) {
      setError("Please provide both pickup and drop-off addresses.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${MOCK_API_URL}/route`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: srcValue?.value?.description,
          // "destination": ,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await pollForResult(data.token);
      } else {
        setError(data.message || "Error submitting request");
        setLoading(false);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again...");
      setLoading(false);
    }
  };

  const pollForResult = async (token) => {
    try {
      let retries = 5;

      while (retries > 0) {
        const statusResponse = await fetch(`${MOCK_API_URL}/route/${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("statusData", statusResponse, 123123);
        const statusData = await statusResponse.json();

        if (statusResponse.ok) {
          if (statusData.status === "success") {
            console.log("Route success:", statusData);
            setWaypoints(statusData.path);
            setPath(statusData);
            setLoading(false);
            return;
          } else if (statusData.status === "in progress") {
            retries--;
            setError("Server is busy. Retrying...");
            await new Promise((resolve) => setTimeout(resolve, 2000));
          } else {
            setError(statusData.error || "Error fetching route status");
            setLoading(false);
            return;
          }
        } else {
          setError(statusData.error || "Error fetching route status");
          setLoading(false);
          return;
        }
      }

      setError("Route is still in progress. Please try again later.");
      setLoading(false);
    } catch (err) {
      setError("An unexpected error occurred while fetching route status.");
      setLoading(false);
    }
  };

  return (
    <>
      <Label>Starting location</Label>
      <div className="flex gap-x-1 items-center">
        <div className="flex items-center w-full rounded-md bg-gray-200">
          {/* <Input className="pl-9 bg-slate-200" /> */}
          <MapPin size={18} strokeWidth={2} className="mx-2" />
          <LocationInput type="source" />
        </div>
      </div>
      <Label>Drop-off point</Label>
      <div className="flex gap-x-1 items-center">
        <div className="flex items-center w-full rounded-md bg-gray-200">
          <LocateFixed size={18} strokeWidth={2} className="mx-2" />
          <LocationInput type="destination" />
        </div>
      </div>

      <div className="">
        <p className="text-red-600">{error}</p>
        <p>{path?.total_distance}</p>
      </div>

      <div className="flex gap-x-4">
        {loading ? (
          <Button
            disabled
            className="flex-1 flex items-center gap-x-1"
            onClick={fetchData}
          >
            Submit
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button className="flex-1" onClick={fetchData}>
            Submit
          </Button>
        )}
        <Button className="flex-1">Reset</Button>
      </div>
    </>
  );
};

export default SearchPlaceSection;
