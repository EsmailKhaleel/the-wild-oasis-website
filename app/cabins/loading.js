import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className='flex justify-center items-center flex-col gap-6'>
      <Spinner />
      <p className='text-lg'>Please wait while loading cabin data ...</p>
    </div>
  )
}
