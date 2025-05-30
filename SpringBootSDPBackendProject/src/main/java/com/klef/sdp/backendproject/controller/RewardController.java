
package com.klef.sdp.backendproject.controller;

import com.klef.sdp.backendproject.dto.*;
import com.klef.sdp.backendproject.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class RewardController {
    @Autowired
    private RewardService rewardService;

    @PostMapping("/rewards")
    public ResponseEntity<?> assignRewardPoints(@RequestBody AssignRewardRequestDTO request) {
        try {
            RewardResponseDTO response = rewardService.assignRewardPoints(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Assign Reward Points: " + e.getMessage());
        }
    }

    @GetMapping("/rewards/user/{userid}")
    public ResponseEntity<?> getUserRewards(@PathVariable String userId) {
        try {
            List<RewardResponseDTO> rewards = rewardService.getUserRewards(userId);
            return ResponseEntity.ok(Map.of("content", rewards));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Get User Rewards: " + e.getMessage());
        }
    }

    @GetMapping("/impact-metrics/{userId}")
    public ResponseEntity<?> getImpactMetrics(@PathVariable String userId) {
        try {
            ImpactMetricsResponseDTO response = rewardService.getImpactMetrics(userId);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Get Impact Metrics: " + e.getMessage());
        }
    }

    @GetMapping("/rewards/leaderboard")
    public ResponseEntity<?> getLeaderboard() {
        try {
            List<LeaderboardResponseDTO> leaderboard = rewardService.getLeaderboard();
            return ResponseEntity.ok(Map.of("content", leaderboard));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Get Leaderboard: " + e.getMessage());
        }
    }
}
