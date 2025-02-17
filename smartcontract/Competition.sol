// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Competition is Ownable(address(msg.sender))  {
    struct Competitor {
        address participant;
        uint256 score;
        uint256 rank;
        bool hasJoined;
    }

    struct CompetitionDetails {
        uint256 id;
        string name;
        uint256 startDate;
        uint256 endDate;
        uint256 targetScore;
        uint256 prizePool;
        address[] participants;
        bool isActive;
    }

    IERC20 public rewardToken; // ERC20 token for rewards
    uint256 public competitionCounter;
    mapping(uint256 => CompetitionDetails) public competitions;
    mapping(uint256 => mapping(address => Competitor)) public competitors;

    event CompetitionCreated(uint256 indexed competitionId, string name, uint256 prizePool);
    event JoinedCompetition(uint256 indexed competitionId, address participant);
    event RewardDistributed(uint256 indexed competitionId, address winner, uint256 amount);

    constructor(address _rewardToken) {
        rewardToken = IERC20(_rewardToken);
    }

    // Create a new competition
    function createCompetition(
        string memory _name,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _targetScore,
        uint256 _prizePool
    ) external onlyOwner {
        require(_startDate > block.timestamp, "Start date must be in the future");
        require(_endDate > _startDate, "End date must be after start date");
        require(_prizePool > 0, "Prize pool must be greater than 0");

        competitionCounter++;
        competitions[competitionCounter] = CompetitionDetails({
            id: competitionCounter,
            name: _name,
            startDate: _startDate,
            endDate: _endDate,
            targetScore: _targetScore,
            prizePool: _prizePool,
            participants: new address[](0),
            isActive: true
        });

        emit CompetitionCreated(competitionCounter, _name, _prizePool);
    }

    // Join a competition
    function joinCompetition(uint256 _competitionId) external {
        CompetitionDetails storage competition = competitions[_competitionId];
        require(competition.isActive, "Competition is not active");
        require(block.timestamp >= competition.startDate, "Competition has not started");
        require(block.timestamp <= competition.endDate, "Competition has ended");
        require(!competitors[_competitionId][msg.sender].hasJoined, "Already joined");

        competitors[_competitionId][msg.sender] = Competitor({
            participant: msg.sender,
            score: 0,
            rank: 0,
            hasJoined: true
        });

        competition.participants.push(msg.sender);
        emit JoinedCompetition(_competitionId, msg.sender);
    }

    // Update a participant's score (only callable by owner or backend)
    function updateScore(uint256 _competitionId, address _participant, uint256 _score) external onlyOwner {
        CompetitionDetails storage competition = competitions[_competitionId];
        require(competition.isActive, "Competition is not active");
        require(block.timestamp <= competition.endDate, "Competition has ended");
        require(competitors[_competitionId][_participant].hasJoined, "Participant has not joined");

        competitors[_competitionId][_participant].score = _score;
    }

    // Distribute rewards after competition ends
    function distributeRewards(uint256 _competitionId) external onlyOwner {
        CompetitionDetails storage competition = competitions[_competitionId];
        require(block.timestamp > competition.endDate, "Competition has not ended");
        require(competition.isActive, "Rewards already distributed");

        competition.isActive = false;

        address[] memory participants = competition.participants;
        uint256 totalPrize = competition.prizePool;

        // Distribute rewards (example: top 3 winners)
        if (participants.length >= 1) {
            rewardToken.transfer(participants[0], (totalPrize * 50) / 100); // 50% to 1st place
        }
        if (participants.length >= 2) {
            rewardToken.transfer(participants[1], (totalPrize * 30) / 100); // 30% to 2nd place
        }
        if (participants.length >= 3) {
            rewardToken.transfer(participants[2], (totalPrize * 20) / 100); // 20% to 3rd place
        }

        emit RewardDistributed(_competitionId, participants[0], (totalPrize * 50) / 100);
    }

    // Withdraw remaining tokens (only owner)
    function withdrawTokens(uint256 _amount) external onlyOwner {
        rewardToken.transfer(owner(), _amount);
    }
}