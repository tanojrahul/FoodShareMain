package com.klef.sdp.backendproject.service;

import com.klef.sdp.backendproject.dto.*;
import com.klef.sdp.backendproject.model.Donations;
import com.klef.sdp.backendproject.model.Reward;
import com.klef.sdp.backendproject.model.Users;
import com.klef.sdp.backendproject.repository.DonationsRepository;
import com.klef.sdp.backendproject.repository.RewardRepository;
import com.klef.sdp.backendproject.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RewardServiceImpl implements RewardService {
    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private DonationsRepository donationsRepository;

    private RewardResponseDTO mapToRewardResponseDTO(Reward reward) {
        RewardResponseDTO dto = new RewardResponseDTO();
        dto.setRewardId(reward.getReward_id());
        dto.setUserId(reward.getUser().getUser_id());
        dto.setPoints(reward.getPoints());
        dto.setReason(reward.getReason());
        dto.setAwardedAt(reward.getAwarded_at());
        return dto;
    }

    @Override
    public RewardResponseDTO assignRewardPoints(AssignRewardRequestDTO request) {
        if (request.getUserId() == null || request.getUserId().isEmpty()) {
            throw new IllegalArgumentException("userId is required");
        }
        if (request.getPoints() <= 0) {
            throw new IllegalArgumentException("Points must be positive");
        }
        if (request.getReason() == null || request.getReason().isEmpty()) {
            throw new IllegalArgumentException("Reason is required");
        }

        Optional<Users> userOptional = usersRepository.findById(request.getUserId());
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User not found with ID: " + request.getUserId());
        }
        Users user = userOptional.get();

        Reward reward = new Reward();
        reward.setReward_id(UUID.randomUUID().toString());
        reward.setUser(user);
        reward.setPoints(request.getPoints());
        reward.setReason(request.getReason());
        reward.setAwarded_at(LocalDateTime.now());

        Reward savedReward = rewardRepository.save(reward);
        return mapToRewardResponseDTO(savedReward);
    }

    @Override
    public List<RewardResponseDTO> getUserRewards(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("userId is required");
        }
        List<Reward> rewards = rewardRepository.findByUserUserId(userId);
        return rewards.stream().map(this::mapToRewardResponseDTO).collect(Collectors.toList());
    }

    @Override
    public ImpactMetricsResponseDTO getImpactMetrics(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("userId is required");
        }
        Optional<Users> userOptional = usersRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        List<Donations> donations = donationsRepository.findByUserUserId(userId);
        double foodSavedKg = donations.stream()
                .filter(d -> d.getStatus() == Donations.Status.delivered)
                .mapToDouble(Donations::getQuantity_kg)
                .sum();

        long mealsServed = (long) (foodSavedKg * 2);
        double carbonOffsetKg = foodSavedKg * 0.5;

        ImpactMetricsResponseDTO dto = new ImpactMetricsResponseDTO();
        dto.setUserId(userId);
        dto.setFoodSavedKg(foodSavedKg);
        dto.setMealsServed(mealsServed);
        dto.setCarbonOffsetKg(carbonOffsetKg);
        return dto;
    }

@Override
    public List<LeaderboardResponseDTO> getLeaderboard() {
        List<Object[]> topUsers = rewardRepository.findTopUsersByPoints();
        return topUsers.stream()
                .limit(10)
                .map(result -> {
                    LeaderboardResponseDTO dto = new LeaderboardResponseDTO();
                    dto.setUserId((String) result[0]);
                    dto.setUsername((String) result[1]);
                    dto.setTotalPoints(((Number) result[2]).longValue());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}