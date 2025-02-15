import React from 'react';
import type { StatCardProps } from '../types';

export function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-radial from-primary-100/40 via-primary-50/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-8 rounded-xl transition-all duration-500 group-hover:-translate-y-1">
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 mb-3 font-display tracking-tight group-hover:scale-105 transform transition-transform duration-500">{number}</div>
        <div className="text-body-base text-night-600 font-medium tracking-wide group-hover:text-night-800 transition-colors">{label}</div>
      </div>
    </div>
  );
}