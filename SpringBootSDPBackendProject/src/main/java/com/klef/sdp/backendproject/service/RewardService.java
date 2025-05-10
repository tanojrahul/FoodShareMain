
package com.klef.sdp.backendproject.service;

import com.klef.sdp.backendproject.dto.*;

import java.util.List;

public interface RewardService {
    RewardResponseDTO assignRewardPoints(AssignRewardRequestDTO request);
    List<RewardResponseDTO> getUserRewards(String userId);
    ImpactMetricsResponseDTO getImpactMetrics(String userId);
    List<LeaderboardResponseDTO> getLeaderboard();
}
