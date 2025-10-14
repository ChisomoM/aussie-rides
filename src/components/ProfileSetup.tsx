"use client";

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { storage, db, auth } from '@/lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

type Interests = { label: string; key: string };

const INTERESTS: Interests[] = [
  { label: 'Off-road', key: 'offroad' },
  { label: 'Family', key: 'family' },
  { label: 'Electric', key: 'electric' },
  { label: 'Performance', key: 'performance' },
];

export default function ProfileSetup({ onComplete }: { onComplete?: () => void }) {
  const router = useRouter();
  const user = auth.currentUser;
  const [step, setStep] = useState(0);
  const [name, setName] = useState(user?.displayName || '');
  const [bio, setBio] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dropRef = useRef<HTMLDivElement | null>(null);

  const next = () => setStep((s) => Math.min(2, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const onFile = (f: File | null) => {
    setError('');
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) return setError('Image must be smaller than 5MB');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] || null;
    onFile(f);
  };

  const handleChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    onFile(f);
  };

  const toggleInterest = (k: string) => setSelected((s) => ({ ...s, [k]: !s[k] }));

  const submitProfile = async () => {
    if (!user) return setError('Not authenticated');
    if (!name.trim()) return setError('Full name is required');
    setLoading(true);
    try {
      let photoURL = user.photoURL || null;
      if (file) {
        const r = storageRef(storage, `profile-photos/${user.uid}/${file.name}`);
        await uploadBytes(r, file);
        photoURL = await getDownloadURL(r);
      }

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName: name,
        photoURL,
        bio,
        interests: Object.keys(selected).filter((k) => selected[k]),
        updatedAt: new Date(),
      });

      // small celebratory animation using confetti emoji
      setStep(3);
      setTimeout(() => {
        if (onComplete) onComplete();
        router.push('/dashboard');
      }, 1600);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header with progress */}
  <div className="bg-gradient-to-r from-[#10b981] to-emerald-600 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Complete Your Admin Profile</h3>
          <p className="text-sm opacity-90 mb-4">Set up your administrator profile to get started</p>
          
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-white transition-all duration-500 ${i <= step ? 'w-full' : 'w-0'}`}
                />
              </div>
            ))}
          </div>
          <div className="text-xs mt-2 opacity-80">Step {Math.min(step + 1, 3)} of 3</div>
        </div>

        <div className="p-8 md:p-10 min-h-[400px] flex flex-col">
          {step === 0 && (
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Tell us about yourself</h4>
              <p className="text-gray-600 mb-6">This information will be displayed on your admin profile</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Short Bio</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none" 
                    maxLength={280} 
                    rows={4} 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a bit about yourself and your role..."
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">{bio.length}/280 characters</div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Add a profile photo</h4>
              <p className="text-gray-600 mb-6">Help others recognize you with a profile picture</p>
              
              <div 
                ref={dropRef} 
                onDrop={handleDrop} 
                onDragOver={(e) => e.preventDefault()} 
                className="border-2 border-dashed border-gray-300 hover:border-[#10b981] rounded-xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer bg-gray-50 hover:bg-emerald-50"
              >
                {preview ? (
                  <div className="text-center">
                    <div className="w-32 h-32 relative rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-emerald-500 ring-opacity-20">
                      <Image src={preview} alt="preview" fill sizes="128px" className="object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setFile(null);
                      }}
                      className="text-sm text-rose-600 hover:underline font-medium"
                    >
                      Remove photo
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <div className="text-gray-700 font-medium mb-2">Drag & drop your photo here</div>
                    <div className="text-sm text-gray-500 mb-4">or</div>
                    <label className="inline-block bg-[#10b981] hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg cursor-pointer transition-all">
                      Browse Files
                      <input type="file" accept="image/*" onChange={handleChoose} className="hidden" />
                    </label>
                    <div className="text-xs text-gray-500 mt-4">Maximum file size: 5MB • JPG, PNG</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">What interests you?</h4>
              <p className="text-gray-600 mb-6">Select your vehicle preferences to help manage inventory recommendations</p>
              
              <div className="grid grid-cols-2 gap-4">
                {INTERESTS.map((it) => (
                  <button 
                    key={it.key} 
                    type="button" 
                    onClick={() => toggleInterest(it.key)} 
                    className={`p-4 border-2 rounded-xl text-left font-medium transition-all ${
                      selected[it.key] 
                        ? 'bg-emerald-50 border-[#10b981] text-[#10b981]' 
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{it.label}</span>
                      {selected[it.key] && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">All set! 🎉</h4>
              <p className="text-gray-600 max-w-md">Your admin profile is complete. Redirecting you to your admin dashboard...</p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2">
              <svg className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm text-rose-700 font-medium">{error}</span>
            </div>
          )}

          {step < 3 && (
            <div className="mt-8 flex justify-between items-center pt-6 border-t">
              <button 
                onClick={back}
                disabled={step === 0}
                className="px-6 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Back
              </button>
              <div className="flex gap-3">
                {step < 2 ? (
                  <button 
                    onClick={next}
                    className="px-8 py-2 bg-[#10b981] hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    onClick={submitProfile}
                    disabled={loading}
                    className="px-8 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      'Complete Profile'
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
