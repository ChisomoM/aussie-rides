"use client";

import { useState } from "react";
import {
  seedVehiclesAction,
  clearVehiclesAction,
  seedSiteMetaAction,
  clearSiteMetaAction,
  seedAllAction,
} from "@/app/actions/seed";
import { auth } from '@/lib/firebase';

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSeed = async (clearExisting: boolean = false) => {
    setLoading(true);
    setMessage("");

    try {
      const token = await auth.currentUser?.getIdToken();
      const result = await seedVehiclesAction(clearExisting, token);
      
      if (result.success) {
        setMessage(`✅ ${result.message}`);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedMeta = async (clearExisting: boolean = false) => {
    setLoading(true);
    setMessage("");

    try {
      const token = await auth.currentUser?.getIdToken();
      const result = await seedSiteMetaAction(clearExisting, token);
      if (result.success) setMessage(`✅ ${result.message}`);
      else setMessage(`❌ ${result.message}`);
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearMeta = async () => {
    if (!confirm("Clear all site meta docs?")) return;
    setLoading(true);
    setMessage("");
    try {
      const token = await auth.currentUser?.getIdToken();
      const result = await clearSiteMetaAction(token);
      if (result.success) setMessage(`✅ ${result.message}`);
      else setMessage(`❌ ${result.message}`);
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedAll = async (clearExisting: boolean = false) => {
    setLoading(true);
    setMessage("");
    try {
      const token = await auth.currentUser?.getIdToken();
      const result = await seedAllAction(clearExisting, token);
      if (result.success) {
        const vcount = result.details?.vehicles?.count ?? 'n/a';
        setMessage(`✅ Seeded all: vehicles=${vcount}`);
      } else setMessage(`❌ ${result.message || 'Failed to seed all'}`);
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (!confirm("Are you sure you want to clear all vehicles? This cannot be undone.")) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = await auth.currentUser?.getIdToken();
      const result = await clearVehiclesAction(token);
      
      if (result.success) {
        setMessage(`✅ ${result.message}`);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
      <h3 className="text-lg font-semibold">Database Seeding</h3>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleSeed(false)}
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Seed Vehicles"}
        </button>

        <button
          onClick={() => handleSeed(true)}
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Clear & Reseed"}
        </button>

        <button
          onClick={handleClear}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Clear All Vehicles"}
        </button>

        <button
          onClick={() => handleSeedMeta(false)}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Seed Site Meta"}
        </button>

        <button
          onClick={handleClearMeta}
          disabled={loading}
          className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Clear Site Meta"}
        </button>

        <button
          onClick={() => handleSeedAll(false)}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Seed All"}
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-md bg-white dark:bg-gray-800 border">
          <p className="text-sm">{message}</p>
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>Seed Vehicles:</strong> Adds vehicles without removing existing ones</p>
        <p><strong>Clear & Reseed:</strong> Removes all vehicles then adds fresh seed data</p>
        <p><strong>Clear All:</strong> Removes all vehicles from the database</p>
      </div>
    </div>
  );
}
