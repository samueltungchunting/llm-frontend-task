"use client";

import { useState } from "react";
import GoogleSection from "./components/GoogleSection";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/Destination";
import { LoadScript } from "@react-google-maps/api";
import SearchPlaceSection from "./components/SearchPlaceSection";

export default function Home() {
  const [srcValue, setSrcValue] = useState(null);
  const [destValue, setDestValue] = useState(null);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}
          libraries={["places"]}
        >
          <main className="min-h-screen grid gap-x-4 grid-cols-1 lg:grid-cols-3">
            <section>
              <SearchPlaceSection />
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
