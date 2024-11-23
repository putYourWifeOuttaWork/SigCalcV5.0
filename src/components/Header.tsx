import React from 'react';
import { Calculator } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[--sf-primary] shadow-sf print:hidden">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
Hidden Value in Technical Success          </h1>
            <p className="text-white/80 mt-1">
Impact Customer Success By Identifying, Diagnosing, and Eliminating High Costl TechDebt         </p>
          </div>
        </div>
      </div>
    </header>
  );
}