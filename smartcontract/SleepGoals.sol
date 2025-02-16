// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SleepGoals {
    // Sleep Token Interface
    IERC20 public sleepToken;

    // User goal structure
    struct SleepGoal {
        uint256 bedtime; // Unix timestamp
        uint256 wakeTime; // Unix timestamp
        uint256 duration; // In hours
        uint256 quality; // Percentage
        uint256 depositAmount;
        bool achieved;
    }

    // Mapping of user addresses to their goals
    mapping(address => SleepGoal) public userGoals;

    // Events
    event GoalSet(address indexed user, uint256 bedtime, uint256 wakeTime, uint256 duration, uint256 quality, uint256 depositAmount);
    event GoalAchieved(address indexed user, uint256 reward);
    event GoalFailed(address indexed user, uint256 penalty);

    // Constructor to set the sleep token address
    constructor(address _sleepTokenAddress) {
        sleepToken = IERC20(_sleepTokenAddress);
    }

    // Function to set sleep goals with token deposit
    function setSleepGoal(
        uint256 _bedtime,
        uint256 _wakeTime,
        uint256 _duration,
        uint256 _quality,
        uint256 _depositAmount
    ) external {
        require(_depositAmount > 0, "Deposit must be greater than 0");
        require(_duration >= 4 && _duration <= 12, "Duration must be between 4-12 hours");
        require(_quality >= 0 && _quality <= 100, "Quality must be between 0-100%");

        // Transfer tokens from user to contract
        require(
            sleepToken.transferFrom(msg.sender, address(this), _depositAmount),
            "Token transfer failed"
        );

        // Set user goal
        userGoals[msg.sender] = SleepGoal({
            bedtime: _bedtime,
            wakeTime: _wakeTime,
            duration: _duration,
            quality: _quality,
            depositAmount: _depositAmount,
            achieved: false
        });

        emit GoalSet(msg.sender, _bedtime, _wakeTime, _duration, _quality, _depositAmount);
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
            // Goal achieved - return deposit plus bonus
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

    // Function to get user's current goal
    function getUserGoal(address _user) external view returns (
        uint256 bedtime,
        uint256 wakeTime,
        uint256 duration,
        uint256 quality,
        uint256 depositAmount,
        bool achieved
    ) {
        SleepGoal memory goal = userGoals[_user];
        return (
            goal.bedtime,
            goal.wakeTime,
            goal.duration,
            goal.quality,
            goal.depositAmount,
            goal.achieved
        );
    }
}