import { ethers } from 'ethers';

export const SLEEP_GOALS_ABI = [
  "function setSleepGoal(uint256 _bedtime, uint256 _wakeTime, uint256 _duration, uint256 _quality, uint256 _depositAmount, uint256 _goalDuration) external",
  "function userGoals(address) external view returns (uint256 bedtime, uint256 wakeTime, uint256 duration, uint256 quality, uint256 depositAmount, bool achieved, uint256 goalDuration)",
  "function verifySleepGoal(uint256 _actualBedtime, uint256 _actualWakeTime, uint256 _actualDuration, uint256 _actualQuality) external",
  "function getUserGoal(address _user) external view returns (uint256 bedtime, uint256 wakeTime, uint256 duration, uint256 quality, uint256 depositAmount, bool achieved, uint256 goalDuration)",
  "event GoalSet(address indexed user, uint256 bedtime, uint256 wakeTime, uint256 duration, uint256 quality, uint256 depositAmount, uint256 goalDuration)",
  "event GoalAchieved(address indexed user, uint256 reward)",
  "event GoalFailed(address indexed user, uint256 penalty)"
];

export const SLEEP_TOKEN_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) external returns (bool)"
];

// Replace with your deployed contract addresses
export const SLEEP_GOALS_ADDRESS = "0x8C34BB9f0361B8B00Bf20B8b630Cfa16CbCC628b";
export const SLEEP_TOKEN_ADDRESS = "0xb507eEF94DB8AFa44BE58Fb687c5234FddF14b44";