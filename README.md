<div align="center">
  <div style="background: white; padding: 20px; border-radius: 10px; display: inline-block; margin-bottom: 20px;">
    <svg width="120" height="120" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#eda3b8" />
      <circle cx="50" cy="50" r="20" fill="#fff1f5" />
    </svg>
  </div>

  <h1>SLEEPSPACE</h1>
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

SleepSpace is a Sleep2Earn platform that tackles sleep deprivation by rewarding users with tokens for maintaining healthy sleep habits. Using zkTLS (via the Reclaim protocol), WE ensure privacy protection while promoting better productivity and mental well-being.

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
   - Your entry-level booster—mint it and start benefiting right away!
   - 3% boost to nightly sleep-to-earn rewards
   - Public Mint Available
   - ![Dream Weaver](https://sapphire-following-turkey-778.mypinata.cloud/ipfs/bafkreidubgln7eaooxnu46myiyv5mcksdkcokt75vbak3fhbprabinm3oq)

2. **Circadian Tuner (Uncommon)**
   - Adjusts to your unique sleep cycle for optimized performance.
   - 5% bonus when hitting your weekly targeted sleep performance
   - Meet personalized sleep goals
   - ![Circadian Tuner](https://sapphire-following-turkey-778.mypinata.cloud/ipfs/bafkreickriv6hprmlhxw7tostwumwzatgnlmmauuxbyjvjszkaazu43q2m)

3. **Restful Pillow (Rare)**
   - A powerful boost for consistent quality sleep.
   - 10% base boost to earnings
   - Additional 5% boost for deep sleep > 25%
   - Achieve 8 hours of sleep for 7 consecutive nights
   - ![Restful Pillow](https://sapphire-following-turkey-778.mypinata.cloud/ipfs/bafkreihiobm7cwykra6scrqkwiwilkzphw2luykvj4vr2wzn2cdavyxaki)

4. **Lucid Dream Catcher (Epic)**
   - Master the art of lucid sleep for enhanced rewards.
   - 15% bonus on nights with lucid sleep
   - 10% bonus for 4/7 lucid sleep nights
   - Achieve optimal sleep quality with consistent REM cycles for 2 weeks
   - ![Lucid Dream Catcher](https://sapphire-following-turkey-778.mypinata.cloud/ipfs/bafkreiblzgc3up2zzvgxmwizzrrbvzpcwvimkdouoy5z7pmdq5xhiizfuq)

5. **Sleep Guardian (Legendary)**
   - The ultimate protector of perfect sleep patterns.
   - Double earnings for 14 days
   - Triple earnings for 3 nights after 5 uninterrupted nights
   - Maintain 90%+ sleep score for 30 consecutive days
   - ![Sleep Guardian](https://sapphire-following-turkey-778.mypinata.cloud/ipfs/bafkreidw2zlzsihgmc2fwoscdujoge3xzq2uljddx7gbxa22yxdgvjicna)

6. **Melatonin Crystal (Mythical)**
   - Harness the power of perfect sleep balance.
   - Triple base earnings
   - Stackable 25% boost every 10 days (max 75%)
   - 8 hours of high-quality sleep for 30 consecutive days
   - ![Melatonin Crystal](https://sapphire-following-turkey-778.mypinata.cloud/ipfs/bafkreidspmybrkl5qpjojnlgw6l4q2nfynujul75ogmdqfg3h5mhnryyoq)

7. **Sleep Accelerator Suit (Ultra-Legendary)**
   - 50% bonus on all earnings for 30 days
   - Double rewards on weekends with 85%+ weekly score
   - 15-day extension on new personal best scores
   - ![Sleep Accelerator Suit](https://sapphire-following-turkey-778.mypinata.cloud/ipfs/bafkreieffuyx2ovbskhu27gjdzh4hf7qxowrlkdzlzmh5xklteglhv4wxe)

## Smartcontract

SleepSpace Token Address: 0xb507eEF94DB8AFa44BE58Fb687c5234FddF14b44  
SleepGoals Contract Address: 0x93c4B53C13Ad9134c3E02ad6AA3e28d8b0105669

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


