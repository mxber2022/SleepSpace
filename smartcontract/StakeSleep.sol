// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StakeSleep is ReentrancyGuard {
    // Token to stake
    IERC20 public immutable sleepToken;

    // Reward token
    IERC20 public immutable rewardToken;

    // Staking details for each user
    struct StakingDetails {
        uint256 stakedAmount;
        uint256 stakedAt;
        uint256 lastRewardClaimedAt;
    }

    // Mapping of user to their staking details
    mapping(address => StakingDetails) public stakers;

    // Reward rate per second (e.g., 1 token per day = 1 / 86400)
    uint256 public rewardRate;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _sleepToken, address _rewardToken, uint256 _rewardRate) {
        sleepToken = IERC20(_sleepToken);
        rewardToken = IERC20(_rewardToken);
        rewardRate = _rewardRate;
    }

    // Stake tokens
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        // Transfer tokens from user to contract
        require(
            sleepToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        // Update staking details
        StakingDetails storage staker = stakers[msg.sender];
        staker.stakedAmount += amount;
        staker.stakedAt = block.timestamp;
        staker.lastRewardClaimedAt = block.timestamp;

        emit Staked(msg.sender, amount);
    }

    // Unstake tokens
    function unstake() external nonReentrant {
        StakingDetails storage staker = stakers[msg.sender];
        require(staker.stakedAmount > 0, "No tokens staked");

        // Calculate rewards before unstaking
        uint256 rewards = calculateRewards(msg.sender);
        if (rewards > 0) {
            require(
                rewardToken.transfer(msg.sender, rewards),
                "Reward transfer failed"
            );
            emit RewardClaimed(msg.sender, rewards);
        }

        // Transfer staked tokens back to user
        uint256 stakedAmount = staker.stakedAmount;
        require(
            sleepToken.transfer(msg.sender, stakedAmount),
            "Token transfer failed"
        );

        // Reset staking details
        staker.stakedAmount = 0;
        staker.stakedAt = 0;
        staker.lastRewardClaimedAt = 0;

        emit Unstaked(msg.sender, stakedAmount);
    }

    // Claim rewards
    function claimRewards() external nonReentrant {
        StakingDetails storage staker = stakers[msg.sender];
        require(staker.stakedAmount > 0, "No tokens staked");

        uint256 rewards = calculateRewards(msg.sender);
        require(rewards > 0, "No rewards to claim");

        // Transfer rewards to user
        require(
            rewardToken.transfer(msg.sender, rewards),
            "Reward transfer failed"
        );

        // Update last reward claimed time
        staker.lastRewardClaimedAt = block.timestamp;

        emit RewardClaimed(msg.sender, rewards);
    }

    // Calculate rewards for a user
    function calculateRewards(address user) public view returns (uint256) {
        StakingDetails memory staker = stakers[user];
        if (staker.stakedAmount == 0) return 0;

        uint256 timeElapsed = block.timestamp - staker.lastRewardClaimedAt;
        return staker.stakedAmount * rewardRate * timeElapsed;
    }

    // Get staking details for a user
    function getStakingDetails(address user) external view returns (StakingDetails memory) {
        return stakers[user];
    }
}