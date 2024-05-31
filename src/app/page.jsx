"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X, LocateFixed, MapPin, Loader2 } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";
import SrcInput from "./components/SrcInput";
import GoogleSection from "./components/GoogleSection";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/Destination";
import { LoadScript } from "@react-google-maps/api";

export default function Home() {
  const [srcValue, setSrcValue] = useState(null);
  const [destValue, setDestValue] = useState(null);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const MOCK_API_URL = "https://sg-mock-api.lalamove.com";

  const fetchData = async () => {
    if (loading) return;
    // if (!srcValue || !destValue) {
    if (!srcValue) {
      setError("Please provide both pickup and drop-off addresses.");
      return;
    }

    console.log(123);

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

      console.log(response);
      if (response.ok) {
        await pollForResult(data.token);
      } else {
        setError(data.message || "Error submitting request");
        setLoading(false);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
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

        const statusData = await statusResponse.json();

        if (statusResponse.ok) {
          if (statusData.status === "success") {
            console.log("Route success:", statusData);
            setLoading(false);
            return;
          } else if (statusData.status === "in progress") {
            retries--;
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
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}
          libraries={["places"]}
        >
          <main className="min-h-screen grid gap-x-4 grid-cols-1 lg:grid-cols-3">
            <section>
              {/* <form> */}
              <Label>Starting location</Label>
              <div className="flex gap-x-1 items-center">
                <div className="flex items-center w-full rounded-md bg-gray-200">
                  {/* <Input className="pl-9 bg-slate-200" /> */}
                  <MapPin size={18} strokeWidth={2} className="mx-2" />
                  <SrcInput srcValue={srcValue} setSrcValue={setSrcValue} />
                </div>
              </div>
              <Label>Drop-off point</Label>
              <div className="flex gap-x-1">
                <div className="relative w-full">
                  <Input className="pl-9 bg-slate-200" />
                  <LocateFixed
                    size={18}
                    strokeWidth={2}
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                  />
                </div>
              </div>
              <p className="text-red-600">{error}</p>
              <div className="flex gap-x-4">
                <Button className="flex-1" onClick={fetchData}>
                  Submit
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                </Button>
                <Button className="flex-1" onClick={() => setSrcValue(null)}>
                  Reset
                </Button>
              </div>
              {/* </form> */}
            </section>
            <div className="col-span-2">
              <GoogleSection />
            </div>
          </main>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
