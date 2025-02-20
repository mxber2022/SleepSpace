 ![SleepSpace Logo](/frontend/public/logo.svg)
<div align="center">

  <h1>SleepSpace</h1>
  <p>Transform your sleep habits into rewards while maintaining complete privacy.</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#smart-contracts">Smart Contracts</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

## Overview

SleepSpace is a revolutionary Web3 platform that incentivizes healthy sleep habits by rewarding users with cryptocurrency tokens. By connecting your WHOOP device and meeting sleep goals, you can earn rewards while maintaining complete privacy through advanced zkTLS technology.

## Features

- 🌙 **Sleep Tracking**: Connect your WHOOP device to monitor sleep patterns
- 💰 **Token Rewards**: Earn SLEEP tokens for maintaining healthy sleep habits
- 🏆 **Competitions**: Join sleep competitions with other users
- 🎯 **Goal Setting**: Set and track personalized sleep goals
- 🔒 **Privacy First**: Secure sleep data verification using zkTLS
- 🎮 **Gamification**: Level up and earn NFTs for consistent performance
- 📊 **Analytics**: Detailed insights into your sleep patterns

## Getting Started

### Prerequisites

- Node.js (v18+)
- WHOOP device and account
- Web3 wallet (MetaMask recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sleep2earn.git
cd sleep2earn
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## Architecture

### Frontend
- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for data visualization

### Backend
- Express.js server
- Passport.js for WHOOP OAuth2
- Supabase for data persistence
- Web3 integration with ethers.js

### Smart Contracts
- ERC721 for NFT implementation
- Custom reward distribution system
- Goal verification mechanisms

## Smart Contracts

### NFT Tiers

1. **Dream Weaver (Common)**
   - 3% boost to nightly sleep-to-earn rewards
   - Public mint available

2. **Circadian Tuner (Uncommon)**
   - 5% bonus when hitting targeted sleep performance
   - Earned through consistent sleep patterns

3. **Restful Pillow (Rare)**
   - 15% base boost to earnings
   - Additional 5% boost for deep sleep > 25%

4. **Lucid Dream Catcher (Epic)**
   - 20% bonus on nights with lucid sleep
   - 10% bonus for 4/7 lucid sleep nights

5. **Sleep Guardian (Legendary)**
   - Double earnings for 14 days
   - Triple earnings for 3 nights after 5 uninterrupted nights

6. **Melatonin Crystal (Mythical)**
   - Triple base earnings
   - Stackable 25% boost every 10 days (max 75%)

7. **Sleep Accelerator Suit (Ultra-Legendary)**
   - 50% bonus on all earnings for 30 days
   - Double rewards on weekends with 85%+ weekly score
   - 15-day extension on new personal best scores

## API Integration

### WHOOP API
```typescript
interface SleepData {
  id: number;
  start: string;
  end: string;
  score: {
    stage_summary: {
      total_in_bed_time_milli: number;
      total_light_sleep_time_milli: number;
      total_slow_wave_sleep_time_milli: number;
      total_rem_sleep_time_milli: number;
      sleep_cycle_count: number;
      disturbance_count: number;
    };
    respiratory_rate: number;
    sleep_performance_percentage: number;
    sleep_consistency_percentage: number;
    sleep_efficiency_percentage: number;
  };
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All sleep data is verified using zkTLS technology
- Smart contract audited by [Audit Firm]
- Regular security assessments and penetration testing
- Privacy-first approach to data handling

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- WHOOP for their comprehensive sleep tracking API
- The Web3 community for continuous support
- All contributors who have helped shape this project

---

<div align="center">
  Made with ❤️ by the SleepSpace Team
</div>

SleepSpace Token Address: 0xb507eEF94DB8AFa44BE58Fb687c5234FddF14b44
SleepGoals Contract Adress: 0x93c4B53C13Ad9134c3E02ad6AA3e28d8b0105669

https://sapphire-following-turkey-778.mypinata.cloud/ipfs/bafybeibe3hmyo43s5akx7xzm4cqy2zozipjkjmo5gs4m3w3ckuaildyzvu