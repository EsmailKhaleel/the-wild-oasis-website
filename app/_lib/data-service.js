import axios from "axios";
import { notFound } from "next/navigation";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: "http://localhost:5000/api",
});

export const getCabin = async function (cabinId) {
  try {
    const response = await axiosInstance.get(`/cabins/${cabinId}`);
    const { status, cabin, message } = response.data;
    if (!status || !cabin) {
      console.error(message);
      throw new Error(message || "Cabin could not be loaded");
    }
    return cabin;
  } catch (error) {
    console.error(error);
    if (error.response?.status === 404 || error.response?.status === 400) {
      notFound();
    }
    throw new Error(error.message || "Cabin could not be loaded");
  }
};


export const getCabins = async function () {
  try {
    const response = await axiosInstance.get("/cabins");
    const { status, cabins, message } = response.data;
    if (!status || !cabins) {
      console.error(message);
      throw new Error(message || "Cabins could not be loaded");
    }
    return cabins;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Cabins could not be loaded");
  }
};



export async function getBookingsDatesByCabinId(cabinId) {
  const response = await axiosInstance.get(`/bookings/${cabinId}/dates`);
  const { status, dates, message } = response.data;
  if (!status || !dates) {
    console.error(message);
    throw new Error(message || "Bookings could not get loaded");
  }
  console.log("Bookings dates:", dates);
  return dates;
}


export async function getSettings() {
  const response = await axiosInstance.get("/settings");
  const { status, settings, message } = response.data;
  if (!status || !settings) {
    console.error(message);
    throw new Error(message || "Settings could not be loaded");
  }
  return settings;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

export async function registerGuest(user) {
  try {
    const response = await axiosInstance.post("/guests", user);
    return response.data;
  } catch (error) {
    // If user already exists, backend returns 400 with message
    if (error.response && error.response.status === 400 && error.response.data.message === "A guest with this email already exists") {
      return { status: false, message: "Email already registered" };
    }
    throw new Error(error.response?.data?.message || "Registration failed");
  }
}

export async function getGuest(email){
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await axiosInstance.get(`/guests/email/${encodedEmail}`);
    return  response.data.guest;
  } catch (error) {
    if(error.response?.status === 404){
      throw new Error("Guest not found!")
    }
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}

// get all reservations for a guest at /bookings/guest/:id/reservations

export async function getReservationsByGuestId(guestId) {
  try {
    const response = await axiosInstance.get(`/bookings/guest/${guestId}/reservations`);
    const { status, reservations, message } = response.data;
    if (!status || !reservations) {
      console.error(message);
      throw new Error(message || "Reservations could not be loaded");
    }
    return reservations;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Reservations could not be loaded");
  }
}

// get booking by id
export async function getBookingById(bookingId) {
  try {
    const response = await axiosInstance.get(`/bookings/${bookingId}`);
    const { status, booking, message } = response.data;
    if (!status || !booking) {
      console.error(message);
      throw new Error(message || "Booking could not be loaded");
    }
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Booking could not be loaded");
  }
}

// get all guest's bookings
export async function getGuestBookings(guestId) {
  try {
    const response = await axiosInstance.get(`/guests/${guestId}/bookings`);
    const { status, bookings, message } = response.data;
    if (!status || !bookings) {
      console.error(message);
      throw new Error(message || "Bookings could not be loaded");
    }
    return bookings;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Bookings could not be loaded");
  }
}
