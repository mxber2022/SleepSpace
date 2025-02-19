import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A3D] via-[#2A2A5A] to-[#3A3A7A] text-white font-dm-sans">
      {/* Header */}
      <header className="w-full bg-gradient-to-b from-[#1A1A3D] to-[#2A2A5A] text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/Logo.png" alt="Sleepspace Logo" className="w-8 h-8 mr-2"  />
            <span className="text-lg font-bold">Sleepspace</span>
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="hover:text-gray-300">About</a>
            <a href="#values" className="hover:text-gray-300">Values</a>
            <a href="#how-it-works" className="hover:text-gray-300">How It Works?</a>
            <a href="#contact" className="hover:text-gray-300">Contact</a>
          </nav>

          {/* Sign In Button (Desktop) */}
          <button 
            className="hidden md:block bg-[#4A6ACD] text-white px-4 py-2 rounded-full hover:bg-[#5A7ACD]"
            onClick={() => navigate('/onboarding')}
          >
            Sign In
          </button>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              <a href="#about" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#values" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Values</a>
              <a href="#how-it-works" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>How It Works?</a>
              <a href="#contact" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </nav>
            <button 
              className="bg-[#4A6ACD] text-white px-4 py-2 rounded-full hover:bg-[#5A7ACD] w-full"
              onClick={() => { navigate('/onboarding'); setIsMenuOpen(false); }}
            >
              Sign In
            </button>
          </div>
        )}
      </header>

      {/* Features Section */}
      <section className="w-full h-auto text-white py-16 flex flex-col md:flex-row items-center justify-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto border-b border-white">
        <div className="flex flex-col items-start max-w-lg space-y-4 mb-8 md:mb-0">
          <h1 
            className="text-4xl font-bold mb-6 text-left" 
            style={{ 
              fontFamily: 'DM Sans', 
              fontWeight: 700,
              fontSize: '64px', 
              lineHeight: '64px', 
              letterSpacing: '0%'
            }}
          >
            Your mindful space to rest & earn.
          </h1>
          <p 
            className="text-left" 
            style={{ 
              fontFamily: 'DM Sans', 
              fontWeight: 400, 
              fontSize: '24px', 
              lineHeight: '30px', 
              letterSpacing: '0%' 
            }}
          >
            Earn tokens while you sleep. Connect your device, meet sleep goals, and build healthy habits — all while maintaining your privacy through secure zkTLS verification.
          </p>
          <button 
            className="bg-white text-[#2A2A5A] font-bold hover:bg-gray-200 border border-[#2A2A5A]" 
            style={{ 
              width: '222px', 
              height: '68px', 
              borderRadius: '15px', 
              padding: '23px 44px', 
              gap: '10px', 
              borderWidth: '1px' 
            }}
            onClick={() => navigate('/onboarding')} 
          >
            Get Early Access
          </button>
        </div>
        <div className="mt-4 md:mt-0 md:ml-8">
          <img src="/Mobile.png" alt="Sleepspace App" className="w-[300px] h-[510px]" />
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full h-auto bg-[#1C1C1C] py-16 text-white border-t border-b border-white">
        <h2 className="text-5xl font-bold text-center mb-12" style={{ 
          fontFamily: 'DM Sans', 
          fontWeight: 700, 
          fontSize: '64px', 
          lineHeight: '64px', 
          letterSpacing: '0%' 
        }}>
          Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {/* Mindful & Restorative */}
          <div className="bg-[#F6FF95] p-6 rounded-3xl flex flex-col h-[210px] w-full max-w-[317px] mx-auto">
            <div className="mb-4 ml-4">
              <img src="/RestIcon.png" alt="Restorative Icon" className="w-11 h-11" />
            </div>
            <div className="flex flex-col items-center justify-start flex-grow mt-4">
              <h3 
                className="font-semibold mb-2 text-black text-center" 
                style={{ 
                  fontFamily: 'DM Sans', 
                  fontWeight: 700, 
                  fontSize: '20px', 
                  lineHeight: '26.04px', 
                  letterSpacing: '0%' 
                }}
              >
                Mindful & Restorative
              </h3>
              <p 
                className="text-sm text-black text-center" 
                style={{ 
                  fontFamily: 'DM Sans', 
                  fontWeight: 400, 
                  fontSize: '16px', 
                  lineHeight: '20.83px', 
                  letterSpacing: '0%' 
                }}
              >
                A safe, peaceful space for better sleep.
              </p>
            </div>
          </div>

          {/* Rewarding & Motivating */}
          <div className="bg-[#F6FF95] p-6 rounded-3xl flex flex-col h-[210px] w-full max-w-[317px] mx-auto">
            <div className="mb-4 ml-4">
              <img src="/Coin.png" alt="Coin Icon" className="w-11 h-11"/>
            </div>
            <div className="flex flex-col items-center justify-start flex-grow mt-4">
              <h3 
                className="font-semibold mb-2 text-black text-center" 
                style={{ 
                  fontFamily: 'DM Sans', 
                  fontWeight: 700, 
                  fontSize: '20px', 
                  lineHeight: '26.04px', 
                  letterSpacing: '0%' 
                }}
              >
                Rewarding & Motivating
              </h3>
              <p 
                className="text-sm text-black text-center" 
                style={{ 
                  fontFamily: 'DM Sans', 
                  fontWeight: 400, 
                  fontSize: '16px', 
                  lineHeight: '20.83px', 
                  letterSpacing: '0%' 
                }}
              >
                Sleep well, earn tokens, and improve your life.
              </p>
            </div>
          </div>

          {/* Secure & Private */}
          <div className="bg-[#F6FF95] p-6 rounded-3xl flex flex-col h-[210px] w-full max-w-[317px] mx-auto">
            <div className="mb-4 ml-4">
              <img src="/Grid.png" alt="Secure Icon" className="w-11 h-11"  />
            </div>
            <div className="flex flex-col items-center justify-start flex-grow mt-4">
              <h3 
                className="font-semibold mb-2 text-black text-center" 
                style={{ 
                  fontFamily: 'DM Sans', 
                  fontWeight: 700, 
                  fontSize: '20px', 
                  lineHeight: '26.04px', 
                  letterSpacing: '0%' 
                }}
              >
                Secure & Private
              </h3>
              <p 
                className="text-sm text-black text-center" 
                style={{ 
                  fontFamily: 'DM Sans', 
                  fontWeight: 400, 
                  fontSize: '16px', 
                  lineHeight: '20.83px', 
                  letterSpacing: '0%' 
                }}
              >
                zkTLS ensures user data stays protected.
              </p>
            </div>
          </div>

          {/* Web3 + Well-being */}
          <div className="bg-[#F6FF95] p-6 rounded-3xl flex flex-col h-[210px] w-full max-w-[317px] mx-auto">
            <div className="mb-4 ml-4">
              <img src="/MoonSmall.png" alt="Moon Icon" className="w-11 h-11" />
            </div>
            <div className="flex flex-col items-center justify-start flex-grow mt-4">
              <h3 
                className="font-semibold mb-2 text-black text-center" 
                style={{ 
                  fontFamily: 'DM Sans', 
                  fontWeight: 700, 
                  fontSize: '20px', 
                  lineHeight: '26.04px', 
                  letterSpacing: '0%' 
                }}
              >
                Web3 + Well-being
              </h3>
              <p 
                className="text-sm text-black text-center" 
                style={{ 
                  fontFamily: 'DM Sans', 
                  fontWeight: 400, 
                  fontSize: '16px', 
                  lineHeight: '20.83px', 
                  letterSpacing: '0%' 
                }}
              >
                Tech meets health for a next-gen sleep experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full h-auto bg-gradient-to-b from-[#1A1A3D] via-[#2A2A5A] to-[#3A3A7A] py-16 text-white flex flex-col items-center justify-center border-t border-b border-white">
        <h2 
          className="text-5xl font-bold text-center mb-16" 
          style={{ 
            fontFamily: 'DM Sans', 
            fontWeight: 700, 
            fontSize: '64px', 
            lineHeight: '64px', 
            letterSpacing: '0%' 
          }}
        >
          How it works?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-8 max-w-7xl mx-auto">
          <div 
            className="flex flex-col items-center mb-8 md:mb-0" 
            style={{ 
              width: '370px', 
              height: '149px', 
              border: '1px solid #FFFFFF', 
              borderRadius: '80px', 
              padding: '43px 49px', 
              gap: '10px' 
            }}
          >
            <div 
              className="w-full text-center whitespace-nowrap" 
              style={{ 
                fontFamily: 'DM Sans', 
                fontWeight: 700, 
                fontSize: '26px', 
                lineHeight: '64px', 
                letterSpacing: '0%' 
              }}
            >
              1. Sign In
            </div>
          </div>
          <div 
            className="flex flex-col items-center mb-8 md:mb-0" 
            style={{ 
              width: '370px', 
              height: '149px', 
              border: '1px solid #FFFFFF', 
              borderRadius: '80px', 
              padding: '43px 49px', 
              gap: '10px' 
            }}
          >
            <div 
              className="w-full text-center whitespace-nowrap" 
              style={{ 
                fontFamily: 'DM Sans', 
                fontWeight: 700, 
                fontSize: '26px', 
                lineHeight: '64px', 
                letterSpacing: '0%' 
              }}
            >
              2. Set A Goal
            </div>
          </div>
          <div 
            className="flex flex-col items-center mb-8 md:mb-0" 
            style={{ 
              width: '370px', 
              height: '149px', 
              border: '1px solid #FFFFFF', 
              borderRadius: '80px', 
              padding: '43px 49px', 
              gap: '10px' 
            }}
          >
            <div 
              className="w-full text-center whitespace-nowrap" 
              style={{ 
                fontFamily: 'DM Sans', 
                fontWeight: 700, 
                fontSize: '26px', 
                lineHeight: '64px', 
                letterSpacing: '0%' 
              }}
            >
              3. Connect Device
            </div>
          </div>
        </div>
        <div 
          className="mt-16 flex justify-center items-center w-full" 
          style={{ 
            width: '422px', 
            height: '228px', 
            borderRadius: '80px', 
            padding: '33px 56px', 
            gap: '10px', 
            background: 'linear-gradient(109.04deg, rgba(67, 76, 205, 0.7) 6.34%, rgba(67, 76, 205, 0) 94.89%)',
            border: '1px solid #FFFFFF' 
          }}
        >
          <div className="flex flex-col items-center">
            <img src="/Logo.png" alt="Sleepspace Logo" className="w-20 h-20 mb-4" />
            <span 
              className="text-center" 
              style={{ 
                fontFamily: 'DM Sans', 
                fontWeight: 700, 
                fontSize: '26px', 
                lineHeight: '36.46px', 
                letterSpacing: '0%' 
              }}
            >
              Ready Sleep And Earn!
            </span>
          </div>
        </div>
      </section>

      {/* Start Your Journey Now Section */}
      <section className="w-full h-auto bg-gradient-to-b from-[#1A1A3D] via-[#2A2A5A] to-[#3A3A7A] py-16 text-white text-center border-t border-b border-white">
        <h2 
          className="text-5xl font-bold mt-37 mb-16" 
          style={{ 
            fontFamily: 'DM Sans', 
            fontWeight: 700, 
            fontSize: '64px', 
            lineHeight: '64px', 
            letterSpacing: '0%' 
          }}
        >
          Start Your Journey Now
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-9 mt-40">
          <button 
            className="bg-[#434CCD] text-white font-bold hover:bg-[#4A6ACD] mb-4 md:mb-0" 
            style={{ 
              width: '222px', 
              height: '68px', 
              borderRadius: '15px', 
              padding: '23px 44px', 
              gap: '10px', 
              borderWidth: '1px' 
            }}
            onClick={() => navigate('/onboarding')} 
          >
            Sign In
          </button>
          <button 
            className="bg-white text-[#000000] font-bold hover:bg-gray-200" 
            style={{ 
              width: '222px', 
              height: '68px', 
              borderRadius: '15px', 
              padding: '23px 44px', 
              gap: '10px', 
              borderWidth: '1px' 
            }}
            onClick={() => navigate('/onboarding')} 
          >
            Get Early Access
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#2A2A5A] text-white py-8 text-center border-t border-white">
        <div className="mb-4">
          <img src="/Logo.png" alt="Sleepspace Logo" className="w-8 h-8 mx-auto mb-2" />
          <span className="text-lg font-bold">Sleepspace</span>
        </div>
        <p>Subscribe to our social media:</p>
        <div className="mt-2">
          <a href="https://x.com/Sleepspace4U" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            X
          </a>
        </div>
        <p className="mt-4 text-sm">Made with love by Sleepspace © 2025</p>
        <p className="text-sm">All system operation</p>
      </footer>
    </div>
  );
}