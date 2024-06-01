import React, { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, LocateFixed, MapPin, Loader2 } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import LocationInput from "./LocationInput";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/Destination";

const SearchPlaceSection = () => {
  // handling the api status, which displays the corresponding message and loading spinner
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // when the api call is successful, the distance and time will be set
  const [distance, setDistance] = useState();
  const [time, setTime] = useState();

  // global states storing the coordinates, so that available for the maps as well
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  // these two controls the autocomplete input fields
  const [srcValue, setSrcValue] = useState(null);
  const [destValue, setDestValue] = useState(null);

  const MOCK_API_URL = "https://sg-mock-api.lalamove.com";

  // Post request to the mock api to get the token
  const fetchData = async () => {
    if (loading) return;
    if (!source || !destination) {
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
          origin: source,
          destination: destination,
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

  // if the above post request succesfully get the token, then poll the result.
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

        const statusData = await statusResponse.json();

        if (statusResponse.ok) {
          if (statusData.status === "success") {
            console.log("Route success:", statusData);
            setSource(statusData.path);
            setDistance(statusData.total_distance);
            setTime(statusData.total_time);
            setError(null);
            setLoading(false);
            return;
          } else if (statusData.status === "in progress") {
            retries--;
            setError("Server is busy. Retrying...");
            await new Promise((resolve) => setTimeout(resolve, 2000));
          } else {
            // handling some cases such as the road is not for car
            setError(statusData.error || "Error fetching route status");
            setLoading(false);
            return;
          }
        } else {
          // if the server returns 500 internal server error then return and end this function
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
    <div className="flex flex-col gap-y-6 rounded-lg border-2 p-6">
      {/* Starting location field & label */}
      <div>
        <Label>Starting location</Label>
        <div className="flex gap-x-1 items-center">
          <div className="flex items-center w-full rounded-md bg-gray-200">
            {/* <Input className="pl-9 bg-slate-200" /> */}
            <MapPin size={18} strokeWidth={2} className="mx-2" />
            <LocationInput
              type="source"
              value={srcValue}
              setValue={setSrcValue}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-12"
            onClick={() => {
              if (loading) return;
              setSrcValue(null);
            }}
          >
            <X size={18} strokeWidth={2.25} className="text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Drop off location field & label */}
      <div>
        <Label>Drop-off point</Label>
        <div className="flex gap-x-1 items-center">
          <div className="flex items-center w-full rounded-md bg-gray-200">
            <LocateFixed size={18} strokeWidth={2} className="mx-2" />
            <LocationInput
              type="destination"
              value={destValue}
              setValue={setDestValue}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-12"
            onClick={() => {
              if (loading) return;
              setDestValue(null);
            }}
          >
            <X size={18} strokeWidth={2.25} className="text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Fetch status & Submit & Reset buttons */}
      <div>
        <div className="h-8">
          {error && <p className="text-red-600">{error}</p>}
          {distance && time && (
            <div className="text-green-700 font-semibold">
              <p>Total distance: {distance}</p>
              <p>Total time: {time}</p>
            </div>
          )}
        </div>

        <div className="flex gap-x-4 mt-12">
          {loading ? (
            <Button
              disabled
              className="flex-1 flex items-center gap-x-1 h-12"
              onClick={fetchData}
            >
              Submit
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button className="flex-1 h-12" onClick={fetchData}>
              Submit
            </Button>
          )}
          <Button
            className="flex-1 h-12"
            onClick={() => {
              if (loading) return;
              setSource([]);      // the global state in useContext
              setSrcValue(null);  // the starting location input field
              setDestValue(null); // the drop off location input field
              setDistance(null);
              setTime(null);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchPlaceSection;
