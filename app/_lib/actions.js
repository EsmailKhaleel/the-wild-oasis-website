"use server";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import { axiosInstance, getReservationsByGuestId } from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
export default async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData) {
  const session = await auth();
  const userId = session?.user?._id;

  if (!session) {
    throw new Error("User not authenticated");
  }

  const image = formData.get("image");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");
  const phoneNumber = formData.get("phoneNumber");
  const address = formData.get("address");

  // Validation
  if (!nationality || !countryFlag) throw new Error("Invalid nationality");
  if (nationalID && !/^[A-Z0-9]{8,12}$/.test(nationalID))
    throw new Error("Invalid national ID format");
  if (phoneNumber && !/^\+?[0-9\s-]{7,15}$/.test(phoneNumber))
    throw new Error("Invalid phone number format");
  if (address && !/^[A-Za-z0-9\s.,#-]{3,50}$/.test(address))
    throw new Error("Invalid address format");
  if (image && image.size > 2 * 1024 * 1024)
    throw new Error("Image file size exceeds 2MB limit");

  // Construct FormData to send to backend
  const payload = new FormData();

  if (nationality !== session?.user?.nationality)
    payload.append("nationality", nationality);
  if (countryFlag !== session?.user?.countryFlag)
    payload.append("countryFlag", countryFlag);
  if (nationalID !== session?.user?.nationalID)
    payload.append("nationalID", nationalID);
  if (phoneNumber !== session?.user?.phoneNumber)
    payload.append("phoneNumber", phoneNumber);
  if (address !== session?.user?.address) payload.append("address", address);
  if (image && image.size > 0 && image.type.startsWith("image/")) {
    payload.append("image", image);
  }
  try {
    await axiosInstance.patch(`/guests/${userId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to update profile: ${
        error.response?.data?.message || error.message
      }`
    );
  }
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const bookings = await getReservationsByGuestId(session.user._id);
  if (!bookings.some((booking) => booking._id === bookingId)) {
    throw new Error("You do not have permission to delete this reservation");
  }
  try {
    const response = await axiosInstance.delete(`/bookings/${bookingId}`);
    const { status, message } = response.data;
    if (!status) {
      throw new Error(message || "Reservation could not be deleted");
    }
    revalidatePath("/account/reservations");
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Reservation could not be deleted"
    );
  }
}

export async function updateReservationAction(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Update reservation action called", formData);
  const bookingId = formData.get("reservationId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const bookings = await getReservationsByGuestId(session.user._id);
  if (!bookings.some((booking) => booking._id === bookingId)) {
    throw new Error("You do not have permission to update this reservation");
  }
  const updatedData = {
    numGuests: Number(numGuests),
    observations: observations.slice(0, 500),
  };
  const response = await axiosInstance.patch(
    `/bookings/${bookingId}`,
    updatedData
  );
  const { status, message } = response.data;
  console.log("API response:", response.data);
  if (!status) {
    throw new Error(message || "Reservation could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations", RedirectType.replace);
  // In Next.js server actions, calling redirect() throws a special internal error to trigger navigation.
  // If you wrap redirect() in a try/catch, you catch this internal error and rethrow it as a generic error
  // (like "Reservation could not be updated"), which causes a 500 error.

  // By removing the try/catch, the redirect error is handled by Next.js as intended,
  // and the user is redirected without seeing an error page.
  // This is the correct pattern for using redirect() in server actions.
}

export async function createReservationAction(bookingData, formData) {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const newBooking = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 500),
    guestId: session.user._id,
    hasBreakfast: false,
    isPaid: false,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    extrasPrice: 0,
  };
  const response = await axiosInstance.post("/bookings", newBooking);
  const { status, message, booking } = response.data;
  if (!status) {
    console.error(message);
    throw new Error(message || "Booking could not be created");
  }
  console.log("New reservation:", booking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  return booking;
}
