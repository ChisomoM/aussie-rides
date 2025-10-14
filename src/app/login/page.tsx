import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="absolute top-4 left-4">
        <h1 className="text-2xl font-bold text-gray-800">Aussie Rides</h1>
        <p className="text-sm text-gray-600">Administrator Portal</p>
      </div>
      <AuthForm />
    </div>
  );
}
