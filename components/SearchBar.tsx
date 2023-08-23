"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";

function SearchButton({ otherClasses }: { otherClasses?: string }) {
  return (
    <button className={`z-10 -ml-3 ${otherClasses}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying glass"
        width={40}
        height={40}
        className="object-contain"
      />
    </button>
  );
}

export default function SearchBar() {
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");

  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (manufacturer === "" || model === "")
      return alert("Please fill in the search bar");

    updateSearchParam(model.toLowerCase(), manufacturer.toLowerCase());
  }

  function updateSearchParam(model: string, manufacturer: string) {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathName);
  }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />

        <SearchButton otherClasses="sm:hidden" />
      </div>

      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="car model"
          width={20}
          height={20}
          className="absolute ml-4 h-5 w-5"
        />

        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
}
