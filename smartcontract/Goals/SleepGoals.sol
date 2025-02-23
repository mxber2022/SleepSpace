// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./SleepStake.sol";

contract SleepGoals {
    // Sleep Token Interface
    IERC20 public sleepToken;

    // Staking Contract Interface
    StakeSleep public stakingContract;

    // User goal structure
    struct SleepGoal {
        uint256 bedtime; // Unix timestamp
        uint256 wakeTime; // Unix timestamp
        uint256 duration; // In hours
        uint256 quality; // Percentage
        uint256 depositAmount;
        uint256 goalDuration; // New field for goal duration in hours
        bool achieved;
        string mode; // Mode of the goal ("secure" or "challenge")
        uint256 createdAt;
    }

    // Mapping of user addresses to their goals
    mapping(address => SleepGoal) public userGoals;

    // Events
    event GoalSet(address indexed user, uint256 bedtime, uint256 wakeTime, uint256 duration, uint256 quality, uint256 depositAmount, uint256 goalDuration, string mode);
    event GoalAchieved(address indexed user, uint256 reward);
    event GoalFailed(address indexed user, uint256 penalty);
    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount);

    // Constructor to set the sleep token and staking contract addresses
    constructor(address _sleepTokenAddress, address _stakingContractAddress) {
        sleepToken = IERC20(_sleepTokenAddress);
        stakingContract = StakeSleep(_stakingContractAddress);
    }

    // Function to set sleep goals with token deposit
    function setSleepGoal(
        uint256 _bedtime,
        uint256 _wakeTime,
        uint256 _duration,
        uint256 _quality,
        uint256 _depositAmount,
        uint256 _goalDuration,
        string memory _mode
    ) external {
        require(_depositAmount > 0, "Deposit must be greater than 0");
        require(_duration >= 4 && _duration <= 12, "Duration must be between 4-12 hours");
        require(_quality >= 0 && _quality <= 100, "Quality must be between 0-100%");
        require(keccak256(bytes(_mode)) == keccak256("secure") || keccak256(bytes(_mode)) == keccak256("challenge"), "Invalid mode");

        // Transfer tokens from user to this contract
        require(
            sleepToken.transferFrom(msg.sender, address(this), _depositAmount),
            "Token transfer failed"
        );

        // Approve staking contract to spend tokens
        sleepToken.approve(address(stakingContract), _depositAmount);

        // Stake tokens in the staking contract
        stakingContract.stake(_depositAmount);

        // Set user goal
        userGoals[msg.sender] = SleepGoal({
            bedtime: _bedtime,
            wakeTime: _wakeTime,
            duration: _duration,
            quality: _quality,
            depositAmount: _depositAmount,
            goalDuration: _goalDuration,
            achieved: false,
            mode: _mode,
            createdAt: block.timestamp
        });

        emit GoalSet(msg.sender, _bedtime, _wakeTime, _duration, _quality, _depositAmount, _goalDuration, _mode);
        emit TokensStaked(msg.sender, _depositAmount);
    }

    // Function to verify and reward/penalize sleep goals
    function verifySleepGoal(
        uint256 _actualBedtime,
        uint256 _actualWakeTime,
        uint256 _actualDuration,
        uint256 _actualQuality
    ) external {
        SleepGoal storage goal = userGoals[msg.sender];
        require(goal.depositAmount > 0, "No active goal");

        bool durationAchieved = _actualDuration >= goal.duration;
        bool qualityAchieved = _actualQuality >= goal.quality;

        if (durationAchieved && qualityAchieved) {
            // Goal achieved - unstake tokens and send reward
            stakingContract.unstake();
            uint256 reward = goal.depositAmount * 2;
            require(
                sleepToken.transfer(msg.sender, reward),
                "Reward transfer failed"
            );
            goal.achieved = true;
            emit GoalAchieved(msg.sender, reward);
        } else {
            // Goal failed - keep deposit as penalty
            emit GoalFailed(msg.sender, goal.depositAmount);
        }

        // Reset user goal
        delete userGoals[msg.sender];
    }

    function getUserGoal(address _user) external view returns (
        uint256 bedtime,
        uint256 wakeTime,
        uint256 duration,
        uint256 quality,
        uint256 depositAmount,
        bool achieved,
        uint256 goalDuration, // Include goalDuration in return values
        string memory mode, // Include mode in return values
        uint256 createdAt
    ) {
        SleepGoal memory goal = userGoals[_user];
        return (
            goal.bedtime,
            goal.wakeTime,
            goal.duration,
            goal.quality,
            goal.depositAmount,
            goal.achieved,
            goal.goalDuration,
            goal.mode,
            goal.createdAt
        );
    }
}
