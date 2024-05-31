"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X, LocateFixed, MapPin } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";
import SrcInput from "./components/SrcInput";

export default function Home() {
  const [srcValue, setSrcValue] = useState(null);

  return (
    <main className="min-h-screen grid gap-x-4 grid-cols-1 lg:grid-cols-3">
      <section className="">
        <Label>Starting location</Label>
        <div className="flex gap-x-1">
          <div className="relative w-full">
            {/* <Input className="pl-9 bg-slate-200" /> */}
            <SrcInput srcValue={srcValue} setSrcValue={setSrcValue} />
            <MapPin
              size={18}
              strokeWidth={2}
              className="absolute top-1/2 -translate-y-1/2 left-2"
            />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSrcValue(null)}>
            <X size={20} strokeWidth={2.5} />
          </Button>
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
          <Button variant="ghost" size="icon">
            <X size={20} strokeWidth={2.5} />
          </Button>
        </div>
        <div className="flex gap-x-4">
          <Button>Submit</Button>
          <Button>Reset</Button>
        </div>
      </section>
      <div className="col-span-2 bg-red-100">123</div>
    </main>
  );
}
