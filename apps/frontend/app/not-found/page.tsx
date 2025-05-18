import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] px-4">
      <h1 className="text-6xl font-playfair font-semibold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        We're sorry, but the page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-300">
        Return Home
      </Link>
    </div>
  );
}