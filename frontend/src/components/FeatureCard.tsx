import React from 'react';
import type { FeatureCardProps } from '../types';

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-lightGray  to-transparent rounded-xl transform transition-transform group-hover:scale-105 duration-300"></div>
      <div className="relative bg-lightGray backdrop-blur-lg p-8 rounded-xl transition-all duration-300 ring-1 ring-night-800/50 hover:ring-primary-500/20 h-full flex flex-col">
        <div className="mb-6 inline-block bg-lightGray p-3 rounded-lg group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 font-display tracking-tight min-h-[28px]">{title}</h3>
        <p className="text-body-base text-night-200 leading-relaxed tracking-wide font-light flex-grow">{description}</p>
      </div>
    </div>
  );
}