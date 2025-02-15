import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Menu, Activity, Trophy, Target, Coins, Loader2, User, LogOut, ChevronDown, BedDouble, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navigation() {
  const location = useLocation();
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnectingWallet(true);
    try {
      // TODO: Implement wallet connection logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      console.log('Wallet connected');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnectingWallet(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-primary-100/50"></div>
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-primary-300/40 to-transparent blur-lg group-hover:from-primary-400/50 transition-colors"></div>
              <Moon className="w-6 h-6 text-primary-600 relative group-hover:scale-110 transform transition-transform" />
            </div>
            <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 font-display tracking-wider">
              Sleep<span className="font-light">Space</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/sleep" active={location.pathname === '/sleep'}>
              <BedDouble className="w-4 h-4" />
              <span>Sleep</span>
            </NavLink>
            <NavLink to="/goals" active={location.pathname === '/goals'}>
              <Target className="w-4 h-4" />
              <span>Goals</span>
            </NavLink>
            <NavLink to="/competition" active={location.pathname === '/competition'}>
              <Trophy className="w-4 h-4" />
              <span>Competition</span>
            </NavLink>
            <NavLink to="/claims" active={location.pathname === '/claims'}>
              <Coins className="w-4 h-4" />
              <span>Claims</span>
            </NavLink>
          </div>
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <button
                onClick={login}
                disabled={isLoading}
                className="relative px-6 py-2.5 rounded-xl overflow-hidden group hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-primary-100 group-hover:from-primary-100 group-hover:to-primary-200 transition-colors"></div>
                <div className="absolute inset-0 rounded-xl ring-1 ring-primary-200 group-hover:ring-primary-300 transition-colors"></div>
                <div className="relative flex items-center gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                  ) : (
                    <Activity className="w-4 h-4 text-primary-500 group-hover:text-primary-600 transition-colors" />
                  )}
                  <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                    Connect Device
                  </span>
                </div>
              </button>
            ) : (
              <>
                {/* Wallet Connection Button */}
                <button
                  onClick={handleConnectWallet}
                  disabled={isConnectingWallet}
                  className="relative px-6 py-2.5 rounded-xl overflow-hidden group hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-50 to-accent-100 group-hover:from-accent-100 group-hover:to-accent-200 transition-colors"></div>
                  <div className="absolute inset-0 rounded-xl ring-1 ring-accent-200 group-hover:ring-accent-300 transition-colors"></div>
                  <div className="relative flex items-center gap-2">
                    {isConnectingWallet ? (
                      <Loader2 className="w-4 h-4 animate-spin text-accent-500" />
                    ) : (
                      <Wallet className="w-4 h-4 text-accent-500 group-hover:text-accent-600 transition-colors" />
                    )}
                    <span className="text-sm font-medium text-accent-600 group-hover:text-accent-700 transition-colors">
                      Connect Wallet
                    </span>
                  </div>
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="relative px-4 py-2.5 rounded-xl overflow-hidden group hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-success-50 group-hover:bg-success-100 transition-colors"></div>
                    <div className="absolute inset-0 rounded-xl ring-1 ring-success-200 group-hover:ring-success-300 transition-colors"></div>
                    <div className="relative flex items-center gap-2">
                      <User className="w-4 h-4 text-success-500" />
                      <span className="text-sm font-medium text-success-600">
                        {user?.first_name || 'Profile'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-success-500 transition-transform duration-300 ${
                        showProfileMenu ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-primary-100 py-1 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-night-600 hover:bg-primary-50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-night-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className={`relative flex items-center gap-2 text-sm font-medium tracking-wider group ${
        active ? 'text-primary-600' : 'text-night-600 hover:text-primary-600'
      } transition-colors`}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-primary-400 to-transparent ${
        active ? 'w-full' : 'w-0 group-hover:w-full'
      } transition-all duration-300`}></span>
    </Link>
  );
}