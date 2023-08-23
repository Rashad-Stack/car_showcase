"use client";
import { ShowMoreProps } from "@/types";
import { updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";
import CustomButton from "./CustomButton";

export default function ShowMore({ pageNumber, isNext }: ShowMoreProps) {
  const router = useRouter();
  function handleNavigation() {
    const newLimit = (pageNumber + 1) * 10;
    const newPathName = updateSearchParams("limit", `${newLimit}`);
    router.push(newPathName);
  }
  return (
    <div className="flex-center mt-10 w-full gap-5">
      {!isNext && (
        <CustomButton
          title="Show more"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
}
