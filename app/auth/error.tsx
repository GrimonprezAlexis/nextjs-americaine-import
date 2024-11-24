"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-red-500 mb-4">
          Une erreur est survenue
        </h2>
        <button
          onClick={() => reset()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}