import React from 'react';
import { Crown, Medal, Star, User, Shield, Trophy } from 'lucide-react';

interface ParticipantListProps {
  participants: string[];
  creator: string;
}

export default function ParticipantList({ participants, creator }: ParticipantListProps) {
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getParticipantIcon = (index: number, address: string) => {
    if (address.toLowerCase() === creator.toLowerCase()) {
      return <Crown className="w-4 h-4 text-yellow-500" />;
    }
    switch (index) {
      case 0:
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 1:
        return <Medal className="w-4 h-4 text-gray-400" />;
      case 2:
        return <Medal className="w-4 h-4 text-amber-600" />;
      default:
        return <Shield className="w-4 h-4 text-primary-400" />;
    }
  };

  const getParticipantStatus = (index: number, address: string) => {
    if (address.toLowerCase() === creator.toLowerCase()) {
      return {
        label: 'Creator',
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        border: 'border-yellow-200'
      };
    }
    switch (index) {
      case 0:
        return {
          label: 'Leading',
          bg: 'bg-green-50',
          text: 'text-green-600',
          border: 'border-green-200'
        };
      case 1:
      case 2:
        return {
          label: `Top ${index + 1}`,
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200'
        };
      default:
        return {
          label: `Rank ${index + 1}`,
          bg: 'bg-primary-50',
          text: 'text-primary-600',
          border: 'border-primary-200'
        };
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-night-600">Participants</div>
        <div className="text-xs text-night-500">{participants.length} joined</div>
      </div>
      
      <div className="grid gap-3">
        {participants.map((participant, index) => {
          const status = getParticipantStatus(index, participant);
          
          return (
            <div
              key={participant}
              className="group relative bg-white rounded-xl p-4 ring-1 ring-primary-100 hover:ring-primary-300 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full flex items-center justify-center ring-2 ring-white">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center ring-2 ring-white">
                      {getParticipantIcon(index, participant)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-night-900 mb-1">
                      {truncateAddress(participant)}
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text} border ${status.border}`}>
                      {status.label}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm text-night-600">
                    <span className="font-medium">85%</span> avg. score
                  </div>
                  <div className="h-8 w-px bg-primary-100"></div>
                  <div className="text-sm text-night-600">
                    <span className="font-medium">6.5h</span> avg. sleep
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}