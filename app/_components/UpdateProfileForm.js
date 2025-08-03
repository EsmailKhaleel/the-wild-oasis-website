"use client";

import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/solid";
import { updateProfileAction } from "../_lib/actions";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({ children, guest }) {
  const {
    fullName,
    email,
    image,
    nationality,
    nationalID,
    phoneNumber,
    countryFlag,
    address,
  } = guest;
  const [imagePreview, setImagePreview] = useState(image || "/logo.png");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form action={updateProfileAction} className="bg-primary-900 p-4 lg:py-8 lg:px-12 text-lg flex gap-6 flex-col">
      {/* Profile image with edit icon */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-[120px] h-[120px]">
          <Image
            src={imagePreview}
            alt="Profile"
            fill
            sizes="(max-width: 120px) 100vw, 120px"
            className="rounded-full object-cover border-4 border-primary-200"
          />
          <label
            htmlFor="image"
            className="absolute bottom-2 right-2 bg-primary-200 rounded-full p-2 cursor-pointer shadow-md hover:bg-primary-300 transition-all"
          >
            <PencilIcon className="w-6 h-6 text-primary-800" />
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="fullName" className="block">Full name</label>
        <input
          name="fullName"
          type="text"
          defaultValue={fullName}
          disabled
          className="p-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block">Email address</label>
        <input
          name="email"
          defaultValue={email}
          type="email"
          id="email"
          disabled
          className="p-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality" className="block">Where are you from?</label>
          {countryFlag && (
            <Image
              width={20}
              height={20}
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID" className="block">National ID number</label>
        <input
          type="text"
          defaultValue={nationalID}
          id="nationalID"
          name="nationalID"
          className="p-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      {/* Phone number input */}
      <div className="space-y-2">
        <label htmlFor="phoneNumber" className="block">Phone number</label>
        <input
          type="text"
          defaultValue={phoneNumber}
          id="phoneNumber"
          name="phoneNumber"
          className="p-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      {/* Address input */}
      <div className="space-y-2">
        <label htmlFor="address" className="block">Address</label>
        <input
          type="text"
          defaultValue={address}
          id="address"
          name="address"
          className="p-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton label="Update profile" />
      </div>
    </form>
  );
}
