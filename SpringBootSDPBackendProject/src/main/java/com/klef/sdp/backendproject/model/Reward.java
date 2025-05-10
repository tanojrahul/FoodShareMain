
package com.klef.sdp.backendproject.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rewards")
public class Reward {
    @Id
    @Column(name = "reward_id", length = 36)
    private String reward_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "points", nullable = false)
    private int points;

    @Column(name = "reason", nullable = false)
    private String reason;

    @Column(name = "awarded_at", nullable = false)
    private LocalDateTime awarded_at;

    // Getters and Setters
    public String getReward_id() {
        return reward_id;
    }

    public void setReward_id(String reward_id) {
        this.reward_id = reward_id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getAwarded_at() {
        return awarded_at;
    }

    public void setAwarded_at(LocalDateTime awarded_at) {
        this.awarded_at = awarded_at;
    }
}
