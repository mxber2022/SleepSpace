import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Menu, X, Activity, Trophy, Target, Coins, Loader2, User, LogOut, ChevronDown, BedDouble, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppKit } from '@reown/appkit/react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useDisconnect } from '@reown/appkit/react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const location = useLocation();
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const { open } = useAppKit();
  const { address, isConnected, status } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  // Effect to update connecting state based on status
  useEffect(() => {
    setIsConnectingWallet(status === 'connecting');
  }, [status]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const truncateAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Wallet disconnection failed:', error);
    }
  };

  const getButtonText = () => {
    if (isConnectingWallet) return 'Connecting...';
    if (isConnected && address) return truncateAddress(address);
    return 'Connect Wallet';
  };

  const handleConnectWallet = async () => {
    if (isConnected) {
      setIsDropdownOpen(true);
      return;
    }

    setIsConnectingWallet(true);
    try {
      await open();
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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-linear from-primary-300/40 to-transparent blur-lg group-hover:from-primary-400/50 transition-colors"></div>
              <Moon className="w-6 h-6 text-primary-600 relative group-hover:scale-110 transform transition-transform" />
            </div>
            <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 font-display tracking-wider">
              Sleep<span className="font-light">Space</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
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

          {/* Right section with auth/wallet */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <button
                onClick={login}
                disabled={isLoading}
                className="relative px-6 py-2.5 rounded-xl overflow-hidden group hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex"
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
              <div className="hidden md:flex items-center gap-4">
                {/* Wallet Button with Dropdown */}
                <div 
                  className="relative" 
                  ref={dropdownRef}
                  onMouseEnter={() => isConnected && setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConnectWallet}
                    disabled={isConnectingWallet}
                    className="relative px-6 py-2.5 rounded-xl overflow-hidden group hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      isConnected 
                        ? 'from-accent-500 via-accent-400 to-accent-600' 
                        : 'from-accent-400 to-accent-500'
                    } opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA1NiA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjggMEwwIDQ5aDU2TDI4IDB6IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] bg-[length:20px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-2">
                      {isConnectingWallet ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <Wallet className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
                      )}
                      <span className="text-sm font-medium text-white">
                        {getButtonText()}
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 group-hover:ring-white/40 transition-colors"></div>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && isConnected && (
                         <motion.div
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: 10 }}
                         transition={{ duration: 0.2 }}
                         className="absolute right-0 mt-2 w-[calc(100%+1px)] bg-white rounded-xl shadow-lg ring-1 ring-primary-100/50 backdrop-blur-xl overflow-hidden"
                       >
                        <button
                          onClick={handleDisconnect}
                          className="w-full px-4 py-2.5 text-left text-night-600 hover:text-night-900 hover:bg-primary-50/50 transition-colors flex items-center gap-2 text-sm"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Disconnect</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

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
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-night-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-night-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-primary-100/50 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-4">
                  <MobileNavLink to="/sleep" active={location.pathname === '/sleep'}>
                    <BedDouble className="w-5 h-5" />
                    <span>Sleep</span>
                  </MobileNavLink>
                  <MobileNavLink to="/goals" active={location.pathname === '/goals'}>
                    <Target className="w-5 h-5" />
                    <span>Goals</span>
                  </MobileNavLink>
                  <MobileNavLink to="/competition" active={location.pathname === '/competition'}>
                    <Trophy className="w-5 h-5" />
                    <span>Competition</span>
                  </MobileNavLink>
                  <MobileNavLink to="/claims" active={location.pathname === '/claims'}>
                    <Coins className="w-5 h-5" />
                    <span>Claims</span>
                  </MobileNavLink>

                  {isAuthenticated ? (
                    <>
                      <div className="pt-4 border-t border-primary-100">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
                        >
                          <User className="w-5 h-5 text-primary-500" />
                          <div>
                            <span className="font-medium text-night-900">{user?.first_name || 'Profile'}</span>
                            <p className="text-sm text-night-600">View your profile</p>
                          </div>
                        </Link>
                      </div>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors rounded-xl"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={login}
                      disabled={isLoading}
                      className="w-full flex items-center gap-2 px-4 py-3 bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors rounded-xl"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Activity className="w-5 h-5" />
                      )}
                      <span>Connect Device</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

function MobileNavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
        active 
          ? 'bg-primary-50 text-primary-600' 
          : 'text-night-600 hover:bg-primary-50 hover:text-primary-600'
      } transition-colors`}
    >
      {children}
    </Link>
  );
}