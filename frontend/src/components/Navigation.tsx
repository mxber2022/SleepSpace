import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Moon, Menu, X, Activity, Trophy, Target, Coins, 
  Loader2, User, LogOut, ChevronDown, BedDouble, 
  Wallet, Home, Settings, Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppKit } from '@reown/appkit/react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useDisconnect } from '@reown/appkit/react';
import { motion, AnimatePresence } from 'framer-motion';

const SleepSpaceLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#eda3b8" />
    <circle cx="50" cy="50" r="20" fill="#fff1f5" />
  </svg>
);

export function Navigation() {
  const location = useLocation();
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);
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
    setShowMobileActions(false);
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
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-primary-100/50"></div>
        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-primary-300/40 to-transparent blur-lg group-hover:from-primary-400/50 transition-colors"></div>
                <SleepSpaceLogo />
              </div>
              <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 font-display tracking-wider">
                SLEEP<span className="font-semibold">SPACE</span>
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
                onClick={() => setShowMobileActions(!showMobileActions)}
                className="md:hidden relative z-50"
              >
                <AnimatePresence mode="wait">
                  {showMobileActions ? (
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
        </div>
      </nav>

      {/* Mobile Actions Menu */}
      <AnimatePresence>
        {showMobileActions && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 bg-white shadow-lg z-40 md:hidden"
          >
            <div className="p-4 space-y-4">
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    login();
                    setShowMobileActions(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-primary-50 rounded-xl text-primary-600 font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    <span>Connect Device</span>
                  </div>
                  <ChevronDown className="w-5 h-5" />
                </button>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setShowMobileActions(false)}
                    className="flex items-center justify-between px-4 py-3 bg-success-50 rounded-xl text-success-600"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span className="font-medium">{user?.first_name || 'Profile'}</span>
                    </div>
                    <ChevronDown className="w-5 h-5" />
                  </Link>

                  <button
                    onClick={handleConnectWallet}
                    className="w-full flex items-center justify-between px-4 py-3 bg-accent-50 rounded-xl text-accent-600 font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5" />
                      <span>{getButtonText()}</span>
                    </div>
                    <ChevronDown className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setShowMobileActions(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-red-50 rounded-xl text-red-600 font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </div>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-primary-100/50 backdrop-blur-xl z-50">
        <div className="grid grid-cols-5 gap-1 px-2 py-1">
          <MobileTab to="/" icon={<Home className="w-5 h-5" />} label="Home" active={location.pathname === '/'} />
          <MobileTab to="/sleep" icon={<BedDouble className="w-5 h-5" />} label="Sleep" active={location.pathname === '/sleep'} />
          <MobileTab to="/goals" icon={<Target className="w-5 h-5" />} label="Goals" active={location.pathname === '/goals'} />
          <MobileTab to="/competition" icon={<Trophy className="w-5 h-5" />} label="Compete" active={location.pathname === '/competition'} />
          <MobileTab to="/claims" icon={<Coins className="w-5 h-5" />} label="Claims" active={location.pathname === '/claims'} />
        </div>
      </nav>
    </>
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

function MobileTab({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg ${
        active 
          ? 'text-primary-600 bg-primary-50' 
          : 'text-night-600'
      } transition-colors relative overflow-hidden`}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
      {active && (
        <motion.div
          layoutId="tab-highlight"
          className="absolute inset-0 bg-primary-50 -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}