import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Shield, Award, Moon } from 'lucide-react';

export function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-night-900">Please connect your WHOOP device to view your profile</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user.first_name?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-night-900 font-display">
                  {user.first_name} {user.last_name}
                </h1>
                <p className="text-night-600 mt-1">WHOOP Member</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-primary-100">
            <h2 className="text-xl font-bold text-night-900 mb-6">Account Information</h2>
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm text-night-600">Full Name</div>
                  <div className="font-medium text-night-900">{user.first_name} {user.last_name}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm text-night-600">WHOOP ID</div>
                  <div className="font-medium text-night-900">{user.whoop_user_id}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm text-night-600">Member Since</div>
                  <div className="font-medium text-night-900">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-primary-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-primary-600" />
                </div>
                <h3 className="font-semibold text-night-900">Sleep Score</h3>
              </div>
              <div className="text-3xl font-bold text-night-900">87%</div>
              <p className="text-sm text-night-600 mt-1">30-day average</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-primary-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-primary-600" />
                </div>
                <h3 className="font-semibold text-night-900">Goals Met</h3>
              </div>
              <div className="text-3xl font-bold text-night-900">24</div>
              <p className="text-sm text-night-600 mt-1">This month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg ring-1 ring-primary-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-primary-600" />
                </div>
                <h3 className="font-semibold text-night-900">Tokens Earned</h3>
              </div>
              <div className="text-3xl font-bold text-night-900">1,250</div>
              <p className="text-sm text-night-600 mt-1">Total SLEEP tokens</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}