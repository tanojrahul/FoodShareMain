package com.klef.sdp.backendproject.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "impact_metrics")
public class ImpactMetrics {
    @Id
    @Column(length = 36)
    private String metric_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column
    private Double food_saved_kg;

    @Column
    private Integer meals_served;

    @Column
    private Double carbon_offset_kg;

    @Column(nullable = false)
    private LocalDateTime updated_at;

    // Getters and Setters
    public String getMetric_id() {
        return metric_id;
    }

    public void setMetric_id(String metric_id) {
        this.metric_id = metric_id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Double getFood_saved_kg() {
        return food_saved_kg;
    }

    public void setFood_saved_kg(Double food_saved_kg) {
        this.food_saved_kg = food_saved_kg;
    }

    public Integer getMeals_served() {
        return meals_served;
    }

    public void setMeals_served(Integer meals_served) {
        this.meals_served = meals_served;
    }

    public Double getCarbon_offset_kg() {
        return carbon_offset_kg;
    }

    public void setCarbon_offset_kg(Double carbon_offset_kg) {
        this.carbon_offset_kg = carbon_offset_kg;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }
}