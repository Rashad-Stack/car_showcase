"use client";
import { CarProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";
import CarDetails from "./CarDetails";
import CustomButton from "./CustomButton";

interface CarCardProps {
  car: CarProps;
}

export default function CarCard({ car }: CarCardProps) {
  const {
    make,
    model,
    year,
    city_mpg,
    highway_mpg,
    fuel_type,
    transmission,
    drive,
  } = car;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="mt-6 flex text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-bold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-bold">/day</span>
      </p>
      <div className="relative my-3 h-40 w-full object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt={model}
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative mt-2 flex w-full">
        <div className="text-gray flex w-full justify-between group-hover:invisible">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/steering-wheel.svg"
              alt="steering wheel"
              width={20}
              height={20}
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src="/tire.svg" alt="tire" width={20} height={20} />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image src="/gas.svg" alt="gas" width={20} height={20} />
            <p className="text-[14px]">{city_mpg}MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-4 rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
}
