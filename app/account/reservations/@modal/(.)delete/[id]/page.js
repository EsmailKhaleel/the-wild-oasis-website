'use client';

import { useRouter } from 'next/navigation';
import ConfirmDialog from '@/app/_components/ConfirmDialog';
import { deleteReservationAction } from '@/app/_lib/actions';
import { useTransition } from 'react';

export default function DeleteReservationModal({ params }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleCancel() {
    router.back(); // Closes the modal and returns to /reservations
  }

  function handleConfirm() {
    startTransition(async () => {
      await deleteReservationAction(params.id);
      router.back(); // Close modal after deletion
    });
  }

  return (
    <ConfirmDialog
      message="Are you sure you want to delete this reservation? This action cannot be undone."
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      pending={isPending}
    />
  );
}
