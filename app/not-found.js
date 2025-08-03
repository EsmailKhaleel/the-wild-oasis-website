import Link from "next/link";

async function NotFound() {
  return (
    <main className='text-center space-y-6 mt-4'>
      <h1 className='text-3xl font-semibold'>
        This page could not be found :
      </h1>
      <p className='text-lg'>
        The page you are looking for does not exist.
      </p>
      <Link
        href='/'
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
