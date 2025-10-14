import SeedButton from "@/components/SeedButton";

export default function SeedPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Database Management</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Use the buttons below to seed or manage your vehicles database.
      </p>
      
      <SeedButton />

      <div className="mt-8 p-4 border rounded-lg bg-emerald-50">
        <h2 className="text-lg font-semibold mb-2">📝 Note</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          This page is for development and administrative purposes. In production,
          you may want to protect this page with authentication or remove it entirely.
        </p>
      </div>
    </div>
  );
}
