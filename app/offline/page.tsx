"use client";

import { useEffect } from 'react';
import BottomNav from '@/components/BottomNav';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white font-sans flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-[#12192B] border border-[#1E2A45] flex items-center justify-center mb-6">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5">
          <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className="text-xl font-bold text-white mb-2">You're Offline</h1>
      <p className="text-sm text-gray-400 mb-8 max-w-xs">
        No internet connection. Please check your network and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="py-3 px-8 rounded-2xl font-semibold text-sm bg-[#4F8EF7] text-white active:bg-[#3A7AE8] transition-all"
      >
        Try Again
      </button>
      <div className="mt-8">
        <BottomNav activeTab="exchange" />
      </div>
    </div>
  );
}
