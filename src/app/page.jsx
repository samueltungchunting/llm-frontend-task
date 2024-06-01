"use client";

import { useState } from "react";
import GoogleSection from "./components/GoogleSection";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/Destination";
import { LoadScript } from "@react-google-maps/api";
import SearchPlaceSection from "./components/SearchPlaceSection";

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}
          libraries={["places"]}
        >
          <div className="flex justify-center">
            <main className="min-h-screen grid lg:gap-x-6 grid-cols-1 lg:grid-cols-3 max-w-6xl w-full mx-auto">
              <section className="lg:p-8 lg:pr-0 p-2">
                <SearchPlaceSection />
              </section>
              <div className="col-span-2 lg:p-8 lg:pl-0 p-2 flex justify-center">
                <GoogleSection />
              </div>
            </main>
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
