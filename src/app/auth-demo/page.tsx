"use client";

import AuthForm from '@/components/AuthForm';

export default function AuthDemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication Demo</h1>
        <p className="text-gray-600 mb-8">Preview the new modern auth modal</p>
        <AuthForm />
      </div>
    </div>
  );
}
